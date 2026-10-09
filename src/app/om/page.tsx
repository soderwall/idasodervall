import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Feather, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* Header Banner */}
      <section className="bg-[#F5F2ED] py-20 px-6 border-b border-[#EAE5DE] text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C857B] font-medium">
            Ateljén & Hantverket
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A18]">
            Om Ida Södervall & Digitala Ateljén
          </h1>
          <p className="text-sm sm:text-base text-[#635E57] font-light max-w-xl mx-auto leading-relaxed">
            Ett skapande rotat i det skånska ljuset, stillheten och mötet mellan det intuitiva måleriet och det exklusiva konsttrycket.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Image Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[4/5] bg-[#EAE5DE] overflow-hidden rounded-xs shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
              alt="Ida Södervall i sin ateljé i Åkarp"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Story Text */}
        <div className="lg:col-span-6 space-y-6 text-[#3D3A36]">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
            <MapPin className="w-4 h-4" />
            <span>Åkarp, Skåne</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A18] leading-tight">
            "Varje streck bär en historia om närvaro och lugn."
          </h2>

          <div className="space-y-4 text-sm font-light leading-relaxed text-[#524E4A]">
            <p>
              Mina originalmålningar växer fram i ateljén i Åkarp. Arbetsprocessen kännetecknas av fria rörelser, råa pigment, akryl och mjuk grafit som kombineras för att skapa djup och taktilitet.
            </p>
            <p>
              När ett verk är färdigt och torkat skapas i vissa fall en extremt begränsad upplaga konstprints. Jag använder mig uteslutande av en av Sveriges främsta Fine Art-skrivare med <strong>Hahnemühle 310g bomullspapper</strong> och åldringsbeständigt pigmentbläck.
            </p>
            <p>
              Det innebär att dina prints behåller sin lyster och sina nyanser i generationer utan att blekna.
            </p>
          </div>

          {/* Key Promises Box */}
          <div className="bg-[#F5F2ED] border border-[#EAE5DE] p-6 space-y-4 rounded-sm">
            <h3 className="font-serif text-base text-[#1C1A18]">
              Idas Löfte Till Varje Köpare
            </h3>
            <ul className="space-y-3 text-xs text-[#524E4A] font-light">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Begränsad Upplaga (Limited Edition):</strong> Mina prints säljs endast i ett bestämt, lågt antal exemplar. När en upplaga är slut trycks inga fler.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Feather className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Handsignerat i Ateljén:</strong> Varje print granskas, stämplas och signeras personligen av mig med min blyertspenna före leverans.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Personligt Skickat från Åkarp:</strong> Varje beställning paketeras för hand med silkespapper och skyddande emballage direkt från min ateljé.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 py-3 px-6 bg-[#1C1A18] hover:bg-[#33302C] text-[#FBF9F5] text-xs font-medium uppercase tracking-widest transition-colors rounded-xs"
            >
              <span>Se mina aktuella konstverk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Quote Banner */}
      <section className="bg-[#1C1A18] text-[#E8E4DF] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto" />
          <p className="font-serif text-xl sm:text-2xl text-white italic font-normal">
            "Ett hem ska inte bara fyllas med saker, utan med känslor och konst som ger rummet en själ."
          </p>
          <span className="text-xs uppercase tracking-widest text-[#A39E98] block">
            — Ida Södervall
          </span>
        </div>
      </section>
    </div>
  );
}
