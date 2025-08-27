import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from 'ui/card';
import { IconRenderer } from 'ui/icon-renderer';

interface Skill {
  name: string;
  icon: string;
}

interface SkillsMarqueeProps {
  skills: Skill[];
}

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Duplicate skills for seamless infinite scroll
  const marqueeSkills = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-x-hidden py-4">
      <motion.div
        className="flex w-max gap-6 will-change-transform"
        style={{
          animation: 'marquee 44s linear infinite',
        }}
        onMouseEnter={() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'paused';
          }
        }}
        onMouseLeave={() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = 'running';
          }
        }}
        ref={marqueeRef}
      >
        {marqueeSkills.map((skill, idx) => (
          <Card
            key={skill.name + idx}
            className="group mx-1 min-w-[110px] max-w-xs flex-shrink-0 cursor-pointer rounded-xl border border-primary/10 bg-background/80 px-3 py-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg sm:min-w-[140px] sm:max-w-sm sm:px-5 sm:py-5"
          >
            <CardContent className="flex flex-col items-center p-0">
              <div className="mb-2 flex justify-center transition-transform group-hover:scale-110">
                <IconRenderer iconName={skill.icon} size={28} />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-medium sm:text-sm sm:font-semibold">
                {skill.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
