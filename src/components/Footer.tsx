import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#1C1A18] text-[#E8E4DF] pt-16 pb-12 border-t border-[#2A2725]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl tracking-tight text-white">IDA SÖDERVALL</h3>
          <p className="text-xs text-[#A39E98] leading-relaxed font-light">
            Svensk samtida konstnär med ateljé i Åkarp. Unika originalmålningar i akryl, olja och blandteknik samt exklusiva handsignerade konstprints i begränsad upplaga.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Navigering</h4>
          <ul className="space-y-2 text-xs text-[#C2BCB3] font-light">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Alla konstverk
              </Link>
            </li>
            <li>
              <Link href="/original" className="hover:text-white transition-colors">
                Originalmålningar
              </Link>
            </li>
            <li>
              <Link href="/prints" className="hover:text-white transition-colors">
                Limited Edition Prints
              </Link>
            </li>
            <li>
              <Link href="/om" className="hover:text-white transition-colors">
                Om Ida & Ateljén
              </Link>
            </li>
          </ul>
        </div>

        {/* Quality Guarantee */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Kvalitet & Äkthet</h4>
          <p className="text-xs text-[#A39E98] leading-relaxed font-light">
            Varje konstprint trycks på åldringsbeständigt 310g Hahnemühle Fine Art-papper, signeras för hand och stämplas med studiostämpel före personlig packning i Åkarp.
          </p>
        </div>

        {/* Contact & Studio */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Ateljén i Åkarp</h4>
          <div className="text-xs text-[#A39E98] leading-relaxed font-light space-y-1">
            <p>Ida Södervall Studio</p>
            <p>Åkarp, Skåne, Sverige</p>
            <p className="pt-2 text-white">kontakt@idasodervall.se</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#2A2725] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#7A756F]">
        <p>© 2025 Ida Södervall Studio. Alla rättigheter förbehållna.</p>
        <p className="mt-2 md:mt-0 font-light tracking-wider">
          Direktutskick & Kassa med Swish-betalning
        </p>
      </div>
    </footer>
  );
}
