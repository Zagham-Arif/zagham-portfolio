/**
 * Icons that already come with recognizable brand colors.
 * These will render "as-is" without applying text-foreground.
 */
export const brandColoredIcons: Record<string, true> = {
  SiReact: true,
  SiNextdotjs: true,
  SiTailwindcss: true,
  SiDocker: true,
  SiGithub: true,
  SiGitlab: true,
  SiBitbucket: true,
  SiAmazonaws: true,
  SiFirebase: true,
  SiDigitalocean: true,
  SiVercel: true,
  SiDatadog: true,
  SiSlack: true,
  SiFigma: true,
};

/**
 * Icons that should follow the site's dark/light theme.
 * These will get text-foreground automatically.
 */
export const monochromeIcons: Record<string, true> = {
  SiExpress: true,
  SiNodedotjs: true,
  SiTypescript: true,
  SiJavascript: true,
  SiMongodb: true,
  SiPostgresql: true,
  SiPrisma: true,
  SiZod: true,
  SiTypeorm: true,
  SiTerraform: true,
  SiRedis: true,
  SiSupabase: true,
  SiPython: true,
  SiDjango: true,
  SiFlask: true,
  SiFastapi: true,
  SiPytorch: true,
  SiNumpy: true,
  SiPandas: true,
};
