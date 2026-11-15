import {
  siDatadog,
  siDocker,
  siExpress,
  siFastapi,
  siGraphql,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siCouchbase,
  siDjango,
  siFirebase,
  siFlask,
  siJavascript,
  siReactquery,
  siStripe,
  type SimpleIcon,
} from 'simple-icons';

// Named imports only, so the bundle carries these 18 paths and not the whole set.
const ICONS: Record<string, SimpleIcon> = Object.fromEntries(
  [
    siDatadog,
    siDocker,
    siExpress,
    siFastapi,
    siGraphql,
    siMongodb,
    siMysql,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siPython,
    siReact,
    siRedis,
    siSupabase,
    siTailwindcss,
    siTerraform,
    siTypescript,
    siCouchbase,
    siDjango,
    siFirebase,
    siFlask,
    siJavascript,
    siReactquery,
    siStripe,
  ].map(icon => [icon.slug, icon])
);

// Brands whose colour is black need to follow the text colour to stay visible in dark mode.
const INK_BRANDS = new Set(['nextdotjs', 'express']);

// Every icon path is emitted once per page here and referenced with <use>.
export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: 'absolute', overflow: 'hidden' }}
    >
      <defs>
        {Object.values(ICONS).map(icon => (
          <symbol key={icon.slug} id={`si-${icon.slug}`} viewBox="0 0 24 24">
            <path d={icon.path} />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

export function TechIcon({
  slug,
  size = 18,
}: {
  slug: string | null;
  size?: number;
}) {
  const icon = slug ? ICONS[slug] : undefined;
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        translate="no"
        className="font-code text-[10px] leading-none font-bold text-[#FF9900]"
      >
        AWS
      </span>
    );
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      fill={INK_BRANDS.has(icon.slug) ? 'currentColor' : `#${icon.hex}`}
      className="shrink-0"
    >
      <use href={`#si-${icon.slug}`} />
    </svg>
  );
}
