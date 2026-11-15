import { getTranslations } from 'next-intl/server';
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Zagham Arif, senior full-stack engineer';

// Social preview per locale: name, role and the translated headline.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const [first, ...rest] = t('hero.headline').split('. ');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#0b1220',
        color: '#eef1f7',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: '#3b5bfd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          ZA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Zagham Arif</div>
          <div style={{ fontSize: 22, color: '#a3adc0' }}>{t('nav.role')}</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -2,
        }}
      >
        <span>{first}.</span>
        <span style={{ color: '#6f8bff' }}>{rest.join('. ')}</span>
      </div>
      <div style={{ fontSize: 24, color: '#a3adc0' }}>
        Node.js · TypeScript · AWS · Redis · PostgreSQL · MongoDB
      </div>
    </div>,
    size
  );
}
