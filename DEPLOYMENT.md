# Deployment Guide: Ida Södervall Studio on Synology NAS (Docker + Cloudflare Tunnel)

This guide provides instructions to deploy the Ida Södervall Studio web application on a Synology NAS (or any Docker host) using **Docker Compose**, **PocketBase**, and **Cloudflare Tunnels**.

---

## 🏗️ Architecture Overview

The deployment consists of 3 Docker containers running on an isolated bridge network (`art-shop-network`):

1. **`pocketbase` (Backend & CMS):**
   - Lightweight SQLite database and Admin UI for Ida to manage artwork, upload hi-res photos, set stock, and track orders.
   - Persistent data stored in `./pb_data` on host machine.
2. **`frontend` (Next.js Application):**
   - Multi-stage standalone Next.js server handling the public store, portfolio, cart, and Swish checkout logic.
3. **`cloudflared` (Cloudflare Tunnel):**
   - Securely exposes the webshop to the public internet without needing a public IP, opening router ports, or setting up dynamic DNS.

---

## 🚀 Setup Instructions

### Step 1: Clone Project & Prepare Environment

On your Synology NAS (via SSH or Container Manager / Container folder):

1. Clone or place the repository files on your NAS:
   ```bash
   cd /volume1/docker/ida-sodervall-studio
   ```

2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and insert your Cloudflare Tunnel Token and domain:
   ```env
   TUNNEL_TOKEN=eyJhSWQiOiI...your_cloudflare_tunnel_token_here...
   SITE_URL=https://idasodervall.se
   ```

---

### Step 2: Configure Cloudflare Zero Trust Tunnel

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Zero Trust** -> **Networks** -> **Tunnels**.
2. Create a new tunnel named `ida-sodervall-studio`.
3. Copy the generated `TUNNEL_TOKEN` into your `.env` file.
4. Set up Public Hostname routes in Cloudflare:
   - **Main Webshop:** `idasodervall.se` -> HTTP -> `http://frontend:3000`
   - **PocketBase CMS (Admin):** `admin.idasodervall.se` (or path route) -> HTTP -> `http://pocketbase:8090`

---

### Step 3: Build & Start Container Stack

Run the following command in the project directory:

```bash
docker compose up -d --build
```

To view logs and verify all services are running:
```bash
docker compose logs -f
```

---

### Step 4: Initial PocketBase Admin Creation

1. Open PocketBase Admin UI internally or via your Cloudflare route:
   - **Local LAN URL (if port exposed):** `http://<NAS-IP>:8090/_/`
   - **Tunnel Route:** `https://admin.idasodervall.se/_/`
2. Create Ida's superadmin account credentials.
3. Collections (`products` and `orders`) can be managed directly in PocketBase.

---

### 💾 Backup & Data Safety

- All database contents and high-resolution uploaded artwork images are preserved inside `./pb_data`.
- Include `./pb_data` in your Synology Hyper Backup schedule to guarantee automatic cloud/offsite backups.

---

### 🔄 Useful Commands

- **Stop stack:** `docker compose down`
- **Rebuild and restart:** `docker compose up -d --build`
- **Check container status:** `docker compose ps`
