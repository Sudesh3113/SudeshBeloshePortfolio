import panoramaImg from '../../assets/panorama.png'

const CURRENT_YEAR = new Date().getFullYear()

export function PanoramaFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-footer-bg pt-10 sm:pt-14 pb-8"
      aria-label="Signature footer"
      style={{ color: 'var(--color-footer-text)' }}
    >
      {/* Edge-to-Edge SUDESH Watermark */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[18vw] leading-none font-black tracking-tighter uppercase whitespace-nowrap text-[#121212]/[0.04]"
        >
          SUDESH
        </span>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Minimalist Editorial Narrative Tag */}
        <div className="max-w-container w-full mx-auto px-5 md:px-10 lg:px-16 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#5A5A5A]">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#121212] font-semibold">
              COMMUNITY • ENGAGEMENTS • THE AUDIENCE
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#737373] tracking-normal">
            FIGURE 04 — COLLECTIVE HUMAN PROTOCOL
          </span>
        </div>

        {/* Panoramic Editorial Crowd Illustration */}
        <div className="w-full relative overflow-hidden flex justify-center items-end h-[340px] sm:h-[440px] md:h-[520px] lg:h-[600px]">
          {/* Scrolling track: 4 copies (2 sets) for seamless infinite loop */}
          <div
            className="flex h-full animate-panorama select-none pointer-events-none"
            style={{ width: 'max-content', willChange: 'transform' }}
          >
            <img
              src={panoramaImg}
              alt="Editorial architectural and crowd panorama illustration"
              className="h-full w-auto shrink-0 object-contain filter grayscale contrast-125"
              draggable={false}
            />
            <img
              src={panoramaImg}
              alt=""
              aria-hidden="true"
              className="h-full w-auto shrink-0 object-contain filter grayscale contrast-125"
              draggable={false}
            />
            <img
              src={panoramaImg}
              alt=""
              aria-hidden="true"
              className="h-full w-auto shrink-0 object-contain filter grayscale contrast-125"
              draggable={false}
            />
            <img
              src={panoramaImg}
              alt=""
              aria-hidden="true"
              className="h-full w-auto shrink-0 object-contain filter grayscale contrast-125"
              draggable={false}
            />
          </div>
        </div>

        {/* Subtle Bottom Micro-Bar / Geographic Coordinates */}
        <div className="max-w-container w-full mx-auto px-5 md:px-10 lg:px-16 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E0DED7] text-[#525252]">
          <div className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase font-medium text-center sm:text-left">
            DESIGNED &amp; ARCHITECTED BY SUDESH • PUNE, IN • 18.5204° N, 73.8567° E
          </div>
          <div className="font-mono text-[11px] text-[#737373] tracking-tight">
            © {CURRENT_YEAR} Sudesh Beloshe · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
