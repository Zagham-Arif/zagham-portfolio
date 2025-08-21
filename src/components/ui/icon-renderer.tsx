'use client';

import { useTheme } from 'next-themes';
import { IconType } from 'react-icons';
import * as Fi from 'react-icons/fi';
import * as Si from 'react-icons/si';

interface IconRendererProps {
  iconName: string;
  className?: string;
  size?: number;
}

const brandColors: Record<string, string> = {
  SiReact: '#61DAFB',
  SiNextdotjs: '#000000',
  SiTypescript: '#3178C6',
  SiJavascript: '#F7DF1E',
  SiPython: '#3776AB',
  SiPhp: '#777BB4',
  SiNodedotjs: '#339933',
  SiExpress: '#000000',
  SiFastapi: '#009688',
  SiDjango: '#092E20',
  SiSupabase: '#3ECF8E',
  SiStrapi: '#4945FF',
  SiMui: '#007FFF',
  SiAntdesign: '#0170FE',
  SiMongodb: '#47A248',
  SiPostgresql: '#4169E1',
  SiMysql: '#4479A1',
  SiRedis: '#DC382D',
  SiCouchbase: '#EA2328',
  SiFirebase: '#FFCA28',
  SiAmazons3: '#569A31',
  SiCloudinary: '#3448C5',
  SiAmazonaws: '#FF9900',
  SiAmazondynamodb: '#4053D6',
  SiDocker: '#2496ED',
  SiTerraform: '#7B42BC',
  SiDigitalocean: '#0080FF',
  SiHeroku: '#430098',
  SiNetlify: '#00C7B7',
  SiVercel: '#000000',
  SiDatadog: '#632CA6',
  SiKubernetes: '#326CE5',
  SiGit: '#F05032',
  SiGithub: '#181717',
  SiGitlab: '#FC6D26',
  SiBitbucket: '#0052CC',
  SiJira: '#0052CC',
  SiClickup: '#7B68EE',
  SiTrello: '#0079BF',
  SiNotion: '#000000',
  SiSlack: '#4A154B',
  SiVisualstudiocode: '#007ACC',
  SiPycharm: '#000000',
  SiPostman: '#FF6C37',
  SiFigma: '#F24E1E',
  SiTailwindcss: '#06B6D4',
  SiBootstrap: '#7952B3',
  SiHtml5: '#E34F26',
  SiCss3: '#1572B6',
  SiSass: '#CC6699',
  SiWebpack: '#8DD6F9',
  SiVite: '#646CFF',
  SiEslint: '#4B32C3',
  SiPrettier: '#F7B93E',
  SiJest: '#C21325',
  SiCypress: '#17202C',
  SiDiscord: '#5865F2',
  SiLinkedin: '#0A66C2',
  SiGmail: '#EA4335',
  SiCloudflare: '#F38020',
  SiFiverr: '#1DBF73',
  SiUpwork: '#14A800',
  FiMail: '#EA4335',
};

// Icons that are too dark to see in dark mode
const darkModeSensitiveIcons = new Set([
  'SiNextdotjs',
  'SiExpress',
  'SiDjango',
  'SiVercel',
  'SiSwagger',
  'SiGithub',
  'SiOkta',
  'SiNotion',
  'SiPycharm',
]);

export function IconRenderer({
  iconName,
  className = '',
  size = 24,
}: IconRendererProps) {
  const { theme } = useTheme();

  // Look up across supported packs
  const packs: Record<string, Record<string, IconType>> = { Si, Fi };
  const IconComponent =
    (packs.Si as Record<string, IconType>)[iconName] ||
    (packs.Fi as Record<string, IconType>)[iconName];

  if (!IconComponent) {
    // sensible fallback
    return (
      <Si.SiReact
        style={{ color: brandColors.SiReact }}
        size={size}
        className={className}
      />
    );
  }

  let color = brandColors[iconName];

  if (theme === 'dark' && darkModeSensitiveIcons.has(iconName)) {
    color = '#FFFFFF';
  }

  return <IconComponent style={{ color }} size={size} className={className} />;
}
