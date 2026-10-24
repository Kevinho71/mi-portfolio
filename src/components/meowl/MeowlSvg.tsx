// Meowl (gato-búho) como componente inline.
// Se monta sin <style>: las animaciones viven en meowl.css.
// ids internos (#meowl-float, .eye, .mouth-open…) se controlan desde Meowl.tsx.

export default function MeowlSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 480"
      width="100%"
      height="100%"
      role="img"
      aria-hidden="true"
      {...props}
    >
      <title>Meowl, el gato búho</title>

      <defs>
        <linearGradient id="whiteFur" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDFBF7" />
          <stop offset="70%" stopColor="#F7F3EB" />
          <stop offset="100%" stopColor="#E5DEC9" />
        </linearGradient>

        <radialGradient id="bellyShadow" cx="50%" cy="45%" r="55%" fx="50%" fy="35%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#FDFBF7" />
          <stop offset="100%" stopColor="#DFD7C4" />
        </radialGradient>

        <linearGradient id="tabbyBrown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9A7147" />
          <stop offset="50%" stopColor="#7E5732" />
          <stop offset="100%" stopColor="#593B1E" />
        </linearGradient>

        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A6D40" />
          <stop offset="100%" stopColor="#4E3319" />
        </linearGradient>

        <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C7B9A5" />
          <stop offset="18%" stopColor="#6B533B" />
          <stop offset="50%" stopColor="#3E2D1C" />
          <stop offset="82%" stopColor="#6B533B" />
          <stop offset="100%" stopColor="#C7B9A5" />
        </linearGradient>

        <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3A3A46" />
          <stop offset="50%" stopColor="#24242C" />
          <stop offset="100%" stopColor="#14141A" />
        </linearGradient>

        <radialGradient id="eyeGrad" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#2E2018" />
          <stop offset="100%" stopColor="#0D0907" />
        </radialGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1A130C" floodOpacity="0.22" />
        </filter>
      </defs>

      <g id="meowl-float">
        {/* COLA */}
        <g id="meowl-tail">
          <path d="M 180 325 C 166 350, 162 392, 176 414 Q 203 432, 230 414 C 244 392, 240 350, 226 325 Z" fill="url(#tailGrad)" />
          <path d="M 195 332 Q 192 375, 192 418 M 205 332 L 205 424 M 215 332 Q 218 375, 217 418" stroke="#2A1D11" strokeWidth="2" strokeOpacity="0.45" strokeLinecap="round" fill="none" />
          <path d="M 180 325 C 166 350, 162 392, 176 414" stroke="#EAE3D5" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M 226 325 C 240 350, 244 392, 230 414" stroke="#EAE3D5" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>

        {/* ALAS */}
        <g id="wing-left" filter="url(#softShadow)">
          <path d="M 114 165 C 86 178, 66 232, 80 298 C 84 310, 96 304, 104 290 C 113 270, 119 222, 119 175 Z" fill="url(#wingGrad)" />
          <path d="M 100 200 Q 88 235, 92 276" stroke="#3D2610" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />
          <path d="M 90 232 Q 82 262, 86 292" stroke="#EAE0C8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M 108 215 Q 104 250, 98 288" stroke="#3D2610" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        </g>

        <g id="wing-right" filter="url(#softShadow)">
          <path d="M 286 165 C 314 178, 334 232, 320 298 C 316 310, 304 304, 296 290 C 287 270, 281 222, 281 175 Z" fill="url(#wingGrad)" />
          <path d="M 300 200 Q 312 235, 308 276" stroke="#3D2610" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />
          <path d="M 310 232 Q 318 262, 314 292" stroke="#F4EFE6" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M 292 215 Q 296 250, 302 288" stroke="#3D2610" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* CUERPO + CABEZA */}
        <g id="meowl-body-group" filter="url(#softShadow)">
          <path
            id="base-tabby-silhouette"
            d="M 140 82 Q 200 76, 260 82 L 278 79 Q 282 88, 272 99 C 288 122, 294 155, 298 195 C 305 255, 278 308, 232 332 Q 200 342, 168 332 C 122 308, 95 255, 102 195 C 106 155, 112 122, 128 99 Q 118 88, 122 79 Z"
            fill="url(#tabbyBrown)"
          />

          <path d="M 126 84 Q 134 88, 138 97" stroke="#4A3016" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 274 84 Q 266 88, 262 97" stroke="#4A3016" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 130 88 Q 134 91, 136 95" stroke="#E7C9B4" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M 270 88 Q 266 91, 264 95" stroke="#E7C9B4" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

          <path
            id="white-chest-and-face"
            d="M 200 112 C 208 112, 214 138, 226 146 C 242 154, 264 152, 272 165 C 282 182, 278 215, 274 248 C 268 292, 245 325, 200 334 C 155 325, 132 292, 126 248 C 122 215, 118 182, 128 165 C 136 152, 158 154, 174 146 C 186 138, 192 112, 200 112 Z"
            fill="url(#bellyShadow)"
          />

          <path d="M 125 190 Q 119 205, 124 220 Q 118 240, 126 260" stroke="#FDFBF7" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 275 190 Q 281 205, 276 220 Q 282 240, 274 260" stroke="#FDFBF7" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 140 295 Q 170 315, 225 305" stroke="#E2DAC6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

          <g id="chest-fluff" stroke="#E5DEC9" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
            <path d="M 186 214 q 4 6, 8 0 q 4 6, 8 0 q 4 6, 8 0" />
            <path d="M 178 238 q 4 6, 8 0 q 4 6, 8 0 q 4 6, 8 0 q 4 6, 8 0" />
            <path d="M 186 262 q 4 6, 8 0 q 4 6, 8 0 q 4 6, 8 0" />
          </g>

          <g id="tabby-stripes" opacity="0.85">
            <path d="M 186 92 Q 188 104, 185 114" stroke="#3A220D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 200 88 L 200 106" stroke="#3A220D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 214 92 Q 212 104, 215 114" stroke="#3A220D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 164 98 Q 170 105, 167 112" stroke="#472C14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 236 98 Q 230 105, 233 112" stroke="#472C14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 145 135 Q 130 140, 120 150" stroke="#3A220D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 148 145 Q 132 152, 124 162" stroke="#4E3117" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 255 135 Q 270 140, 280 150" stroke="#3A220D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 252 145 Q 268 152, 276 162" stroke="#4E3117" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>

          {/* ROSTRO */}
          <g id="meowl-face">
            <g id="eye-left" className="eye">
              <ellipse cx="164" cy="135" rx="17" ry="10.5" fill="url(#eyeGrad)" />
              <ellipse cx="164" cy="135" rx="17" ry="10.5" fill="none" stroke="#2A1B10" strokeWidth="2" />
              <path d="M 147 134 Q 164 125, 181 134" stroke="#2A1B10" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="170" cy="131" r="4.5" fill="#FFFFFF" />
              <circle cx="158" cy="139" r="2" fill="#FFFFFF" opacity="0.9" />
            </g>

            <g id="eye-right" className="eye">
              <ellipse cx="236" cy="135" rx="17" ry="10.5" fill="url(#eyeGrad)" />
              <ellipse cx="236" cy="135" rx="17" ry="10.5" fill="none" stroke="#2A1B10" strokeWidth="2" />
              <path d="M 219 134 Q 236 125, 253 134" stroke="#2A1B10" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="242" cy="131" r="4.5" fill="#FFFFFF" />
              <circle cx="230" cy="139" r="2" fill="#FFFFFF" opacity="0.9" />
            </g>

            <ellipse id="blush-left" cx="143" cy="155" rx="11" ry="6.5" fill="#F2A7A0" opacity="0.5" />
            <ellipse id="blush-right" cx="257" cy="155" rx="11" ry="6.5" fill="#F2A7A0" opacity="0.5" />

            <g id="muzzle">
              <ellipse cx="200" cy="165" rx="20" ry="5.5" fill="#E5DEC9" opacity="0.7" />
              <path d="M 193 146 Q 200 143, 207 146 Q 205 153, 200 155 Q 195 153, 193 146 Z" fill="#E8A9A0" />
              <ellipse cx="197.5" cy="147.2" rx="2" ry="1.1" fill="#FFFFFF" opacity="0.65" />
              <line x1="200" y1="155" x2="200" y2="158.5" stroke="#7A5B4B" strokeWidth="2" strokeLinecap="round" />
              <path
                id="mouth-closed"
                className="mouth-closed"
                d="M 188 158 Q 194 164, 200 158 Q 206 164, 212 158"
                stroke="#6E5041"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="mouth-open" className="mouth-open" opacity="0">
                <path d="M 191 158.5 Q 200 161, 209 158.5 Q 209 172, 200 172 Q 191 172, 191 158.5 Z" fill="#4A2424" stroke="#6E5041" strokeWidth="1.6" strokeLinejoin="round" />
                <ellipse cx="200" cy="168.5" rx="5" ry="3" fill="#E8837F" />
              </g>
            </g>
          </g>
        </g>

        {/* SOMBRERO */}
        <g id="hat" filter="url(#softShadow)">
          <g id="hat-shape" transform="translate(200 82) scale(0.55) translate(-200 -82)">
            <path d="M 156 80 L 160 30 Q 160 20, 172 20 L 228 20 Q 240 20, 240 30 L 244 80 Z" fill="url(#hatGrad)" />
            <path d="M 168 74 L 170 34" stroke="#5A5A68" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
            <path d="M 157.5 68 L 242.5 68 L 243.5 80 L 156.5 80 Z" fill="#8A2434" />
            <path d="M 157.5 68 L 242.5 68" stroke="#A63447" strokeWidth="1.5" />
            <ellipse cx="200" cy="81" rx="64" ry="9" fill="url(#hatGrad)" />
            <path d="M 140 80 Q 200 90, 260 80" stroke="#4A4A58" strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>
        </g>
      </g>

      {/* RAMA */}
      <g id="tree-branch" filter="url(#softShadow)">
        <path d="M 30 336 Q 115 326, 200 334 Q 285 340, 370 332 L 370 346 Q 285 354, 200 347 Q 115 340, 30 350 Z" fill="#5C432B" />
        <path d="M 30 337 Q 115 327, 200 335 Q 285 341, 370 333" stroke="#9C8468" strokeWidth="3" fill="none" />
        <path d="M 30 348 Q 115 338, 200 345 Q 285 352, 370 344" stroke="#2E1F12" strokeWidth="3.5" fill="none" />
        <path d="M 145 342 Q 95 365, 55 360" stroke="#4A3520" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* PATITAS */}
      <g id="cat-paws" filter="url(#softShadow)">
        <g id="paw-left">
          <ellipse cx="182" cy="332" rx="15" ry="12" fill="#F7F3EB" />
          <ellipse cx="173" cy="337" rx="4.5" ry="6.5" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <ellipse cx="182" cy="339" rx="4.8" ry="7" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <ellipse cx="191" cy="337" rx="4.5" ry="6.5" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <path d="M 177 334 L 177 342 M 186 334 L 186 342" stroke="#B5A890" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g id="paw-right">
          <ellipse cx="216" cy="332" rx="15" ry="12" fill="#F7F3EB" />
          <ellipse cx="207" cy="337" rx="4.5" ry="6.5" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <ellipse cx="216" cy="339" rx="4.8" ry="7" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <ellipse cx="225" cy="337" rx="4.5" ry="6.5" fill="#FDFBF7" stroke="#D1C7B2" strokeWidth="1.2" />
          <path d="M 211 334 L 211 342 M 220 334 L 220 342" stroke="#B5A890" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
