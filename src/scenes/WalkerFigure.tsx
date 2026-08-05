/**
 * Backlit silhouette walker — the guest exploring the gallery.
 * A translucent gold-rimmed figure fits the mystical corridor better than a
 * literal photographic cutout, and its limbs are pure CSS so the gait stays
 * perfectly smooth at any scale along the walking path.
 */
const GAIT_PERIOD_S = 1; // seconds per full left+right step cycle — natural, unhurried pace

export function WalkerFigure({ walking, facing = 1 }: { walking: boolean; facing?: 1 | -1 }) {
  return (
    <svg
      viewBox="0 0 40 100"
      width={40}
      height={100}
      className="pointer-events-none block overflow-visible"
      style={{ transform: `scaleX(${facing})` }}
      aria-hidden
    >
      <defs>
        <linearGradient id="walker-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1b52" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#0a0620" stopOpacity="0.98" />
        </linearGradient>
        <filter id="walker-rim" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#walker-rim)" className={walking ? "walker-bob" : "walker-idle"}>
        {/* legs, pivoting from the hip */}
        <g transform="translate(20,58)">
          <rect
            x={-3.4}
            y={0}
            width={3.4}
            height={26}
            rx={1.6}
            fill="url(#walker-fill)"
            stroke="#e8c168"
            strokeOpacity={0.55}
            strokeWidth={0.4}
            className={walking ? "walker-leg-a" : ""}
            style={{ transformOrigin: "1.7px 0px" }}
          />
          <rect
            x={0}
            y={0}
            width={3.4}
            height={26}
            rx={1.6}
            fill="url(#walker-fill)"
            stroke="#e8c168"
            strokeOpacity={0.55}
            strokeWidth={0.4}
            className={walking ? "walker-leg-b" : ""}
            style={{ transformOrigin: "1.7px 0px" }}
          />
        </g>

        {/* torso */}
        <path
          d="M13 30 Q20 24 27 30 L26 60 Q20 64 14 60 Z"
          fill="url(#walker-fill)"
          stroke="#e8c168"
          strokeOpacity={0.6}
          strokeWidth={0.5}
        />

        {/* arms, pivoting from the shoulder */}
        <g transform="translate(14,33)">
          <rect
            x={-2.6}
            y={0}
            width={2.6}
            height={20}
            rx={1.3}
            fill="url(#walker-fill)"
            stroke="#e8c168"
            strokeOpacity={0.45}
            strokeWidth={0.35}
            className={walking ? "walker-arm-a" : ""}
            style={{ transformOrigin: "1.3px 0px" }}
          />
        </g>
        <g transform="translate(26,33)">
          <rect
            x={0}
            y={0}
            width={2.6}
            height={20}
            rx={1.3}
            fill="url(#walker-fill)"
            stroke="#e8c168"
            strokeOpacity={0.45}
            strokeWidth={0.35}
            className={walking ? "walker-arm-b" : ""}
            style={{ transformOrigin: "1.3px 0px" }}
          />
        </g>

        {/* head */}
        <circle cx={20} cy={20} r={7.5} fill="url(#walker-fill)" stroke="#e8c168" strokeOpacity={0.65} strokeWidth={0.5} />
      </g>

      <style>{`
        .walker-leg-a { animation: limb-swing ${GAIT_PERIOD_S}s ease-in-out infinite; }
        .walker-leg-b { animation: limb-swing ${GAIT_PERIOD_S}s ease-in-out infinite; animation-delay: ${GAIT_PERIOD_S / 2}s; }
        .walker-arm-a { animation: limb-swing ${GAIT_PERIOD_S}s ease-in-out infinite; animation-delay: ${GAIT_PERIOD_S / 2}s; }
        .walker-arm-b { animation: limb-swing ${GAIT_PERIOD_S}s ease-in-out infinite; }
        .walker-bob { animation: walk-bob ${GAIT_PERIOD_S / 2}s ease-in-out infinite; }
        .walker-idle { animation: float-y 2.6s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}

export { GAIT_PERIOD_S };
