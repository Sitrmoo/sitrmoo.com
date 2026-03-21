import { ImageResponse } from 'next/og'

export default async function OGImage() {
  const avatarData = await fetch('https://sitrmoo.com/avatar.png')
    .then(res => res.arrayBuffer())

  return new ImageResponse(
    <div style={{
      background: 'linear-gradient(135deg, #e0e7ff, #fce7f3)',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    }}>
      <img
        src={`data:image/png;base64,${Buffer.from(avatarData).toString('base64')}`}
        width={120}
        height={120}
        style={{ borderRadius: '50%' }}
      />
      <div style={{ fontSize: 64, fontWeight: 'bold' }}>流月</div>
      <div style={{ fontSize: 32, opacity: 0.6 }}>静水映长天</div>
    </div>
  )
}