// PhoneFrame — 390×844 px iPhone-shaped container, centered on #FAFAFA page.
// position:relative so absolute-positioned overlays (modals) anchor to it.

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAFA',
        padding: '16px 0',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 390,
          height: 844,
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: 48,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px #D0D0D0, 0 24px 64px rgba(0,0,0,0.10)',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  )
}
