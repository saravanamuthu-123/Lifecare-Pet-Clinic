"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Activity, Syringe, Stethoscope, Heart, Bone, Smile, Sparkles, Eye, Brain, ShieldPlus, Bird, Scissors, Home, Apple, CheckCircle2, X } from 'lucide-react';

interface CreativeServiceCardProps {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  description: string;
  features: string[];
  category: string;
}

const iconMap: { [key: string]: any } = {
  activity: Activity,
  syringe: Syringe,
  stethoscope: Stethoscope,
  'heart-pulse': Heart,
  bone: Bone,
  smile: Smile,
  sparkles: Sparkles,
  eye: Eye,
  brain: Brain,
  'shield-plus': ShieldPlus,
  bird: Bird,
  scissors: Scissors,
  home: Home,
  apple: Apple,
  microscope: Activity,
};

const cardColors = [
  { bg: 'from-[#FFE5E8] to-white', border: 'border-[#FF6B7A]', icon: 'from-[#FF6B7A] to-[#e55566]', accent: '#FF6B7A' },
  { bg: 'from-[#FFF4D6] to-white', border: 'border-[#FDB913]', icon: 'from-[#FDB913] to-[#e5a40f]', accent: '#FDB913' },
  { bg: 'from-[#E9D5FF] to-white', border: 'border-[#7B4397]', icon: 'from-[#7B4397] to-[#663380]', accent: '#7B4397' },
];

export const CreativeServiceCard: React.FC<CreativeServiceCardProps> = ({
  id,
  name,
  icon,
  shortDescription,
  description,
  features,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [pawPrints, setPawPrints] = useState<{ id: number; x: number; y: number }[]>([]);
  const IconComponent = iconMap[icon] || Stethoscope;

  // Deterministic color selection based on id to avoid hydration mismatch
  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  const colorTheme = cardColors[hashString(id) % cardColors.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.random() > 0.7) {
      const newPaw = { id: Date.now(), x, y };
      setPawPrints((prev) => [...prev.slice(-3), newPaw]);

      setTimeout(() => {
        setPawPrints((prev) => prev.filter((paw) => paw.id !== newPaw.id));
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full touch-auto"
      style={{ perspective: '1000px', touchAction: 'auto' }}
      drag={false}
    >
      <motion.div
        className="relative w-full min-h-[450px] touch-auto"
        style={{ transformStyle: 'preserve-3d', touchAction: 'auto' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onHoverStart={() => !isFlipped && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={!isFlipped ? { y: -12, transition: { duration: 0.3 } } : {}}
        >
          <Card className={`h-full glass hover:shadow-2xl transition-all duration-300 border-2 ${colorTheme.border} bg-gradient-to-br ${colorTheme.bg} group relative overflow-hidden`}>
            {/* Decorative corner curl effect */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-white/30 rotate-45"
                animate={{ scale: isHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Paw print trail on hover */}
            <AnimatePresence>
              {pawPrints.map((paw) => (
                <motion.div
                  key={paw.id}
                  className="absolute pointer-events-none"
                  style={{ left: paw.x, top: paw.y }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0.5], rotate: [0, 15, 30] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={colorTheme.accent}>
                    <circle cx="12" cy="8" r="2" />
                    <circle cx="8" cy="12" r="1.5" />
                    <circle cx="16" cy="12" r="1.5" />
                    <ellipse cx="12" cy="16" rx="3" ry="4" />
                  </svg>
                </motion.div>
              ))}
            </AnimatePresence>

            <CardHeader className="relative pb-4">
              <motion.div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${colorTheme.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className="w-10 h-10 text-white relative z-10" />

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: isHovered ? ['-100%', '100%'] : '-100%',
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Small paw decoration in corner */}
                <motion.div
                  className="absolute -bottom-1 -right-1"
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.4">
                    <circle cx="12" cy="8" r="2" />
                    <circle cx="8" cy="12" r="1.5" />
                    <circle cx="16" cy="12" r="1.5" />
                    <ellipse cx="12" cy="16" rx="3" ry="4" />
                  </svg>
                </motion.div>
              </motion.div>

              <div className="text-xs font-semibold mb-2" style={{ color: colorTheme.accent }}>
                {category}
              </div>
              <CardTitle className="text-xl font-bold group-hover:scale-105 transition-transform duration-300 origin-left" style={{ color: isHovered ? colorTheme.accent : '#1a1a1a' }}>
                {name}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative">
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {shortDescription}
              </p>

              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  setIsFlipped(true);
                }}
                className="flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                style={{ color: colorTheme.accent }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">Learn More</span>
                <motion.div
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </motion.button>
            </CardContent>

            {/* Bottom paw prints decoration */}
            <div className="absolute bottom-2 left-2 flex gap-1 opacity-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: isHovered ? [0, -5, 0] : 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: isHovered ? Infinity : 0 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={colorTheme.accent}>
                    <circle cx="12" cy="8" r="2" />
                    <circle cx="8" cy="12" r="1.5" />
                    <circle cx="16" cy="12" r="1.5" />
                    <ellipse cx="12" cy="16" rx="3" ry="4" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <Card className={`w-full h-full glass border-2 ${colorTheme.border} bg-gradient-to-br ${colorTheme.bg} relative`}>
            <CardContent className="p-6 h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {/* Close button */}
              <button
                onClick={() => setIsFlipped(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 transition-colors z-10"
                style={{ color: colorTheme.accent }}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-semibold mb-2" style={{ color: colorTheme.accent }}>
                {category}
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: colorTheme.accent }}>
                {name}
              </h3>

              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                {description}
              </p>

              <h4 className="font-semibold text-gray-900 mb-3 text-sm">What's Included:</h4>
              <ul className="space-y-2 mb-6 flex-grow">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colorTheme.accent }} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="/contact"
                className="inline-block px-6 py-2 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all mt-auto"
                style={{ background: `linear-gradient(135deg, ${colorTheme.accent}, ${colorTheme.accent}dd)` }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book This Service
              </motion.a>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
