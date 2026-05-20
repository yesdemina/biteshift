// HatchedPlaceholder — white box with diagonal gray lines + centered label.
// Used wherever media / camera previews / 3D models would appear.

interface HatchedPlaceholderProps {
  label: string
  height?: number | string
  width?: number | string
  circle?: boolean          // renders as a circle instead of a rounded rect
  style?: React.CSSProperties
}

export default function HatchedPlaceholder({
  label,
  height = 200,
  width = '100%',
  circle = false,
  style,
}: HatchedPlaceholderProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : 12,
        background:
          'repeating-linear-gradient(-45deg, #FFFFFF 0px, #FFFFFF 8px, #EBEBEB 8px, #EBEBEB 9px)',
        border: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: '#AAAAAA',
          textAlign: 'center',
          padding: '0 20px',
          lineHeight: 1.4,
          fontStyle: 'italic',
        }}
      >
        {label}
      </span>
    </div>
  )
}
