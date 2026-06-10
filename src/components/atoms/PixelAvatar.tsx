export function PixelAvatar() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-32 w-32"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Hood up (back layer) */}
      <rect x="8" y="2" width="16" height="4" rx="1" fill="#b4a0e0" />

      {/* Hoodie body */}
      <rect x="6" y="10" width="20" height="20" rx="2" fill="#cba6f7" />
      <rect x="10" y="26" width="12" height="2" fill="#b4a0e0" />
      {/* Hoodie zipper line */}
      <rect x="15" y="18" width="2" height="12" fill="#b4a0e0" />

      {/* Head */}
      <rect x="10" y="4" width="12" height="12" rx="2" fill="#f5c2e7" />

      {/* Hair */}
      <rect x="10" y="3" width="12" height="4" rx="1" fill="#45475a" />
      <rect x="9" y="4" width="2" height="3" fill="#45475a" />
      <rect x="21" y="4" width="2" height="3" fill="#45475a" />
      <rect x="10" y="2" width="4" height="2" fill="#45475a" />
      <rect x="18" y="2" width="4" height="2" fill="#45475a" />

      {/* Eyes */}
      <rect x="12" y="8" width="3" height="3" rx="0.5" fill="#1e1e2e" />
      <rect x="17" y="8" width="3" height="3" rx="0.5" fill="#1e1e2e" />

      {/* Eye shine */}
      <rect x="12" y="8" width="1" height="1" fill="#cdd6f4" />
      <rect x="17" y="8" width="1" height="1" fill="#cdd6f4" />

      {/* Smile */}
      <rect x="13" y="12" width="6" height="1" fill="#1e1e2e" />
      <rect x="14" y="13" width="4" height="1" fill="#1e1e2e" />

      {/* Headset band */}
      <rect x="3" y="5" width="26" height="3" rx="1.5" fill="#585b70" />

      {/* Headset ear cups */}
      <rect x="2" y="7" width="4" height="10" rx="1" fill="#585b70" />
      <rect x="26" y="7" width="4" height="10" rx="1" fill="#585b70" />

      {/* Headset mic arm */}
      <rect x="3" y="14" width="3" height="2" rx="0.5" fill="#585b70" />
      <rect x="5" y="15" width="2" height="3" rx="0.5" fill="#585b70" />
    </svg>
  )
}
