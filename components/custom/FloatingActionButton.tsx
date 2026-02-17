"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clinicInfo from '@/data/clinic-info.json';

export const FloatingActionButtons: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Emergency Call Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-[#FDB913] animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full bg-[#FDB913] animate-pulse-ring" style={{ animationDelay: '1s' }} />

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              asChild
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDB913] to-[#e5a40f] hover:from-[#e5a40f] hover:to-[#FDB913] shadow-2xl border-4 border-white relative group"
            >
              <a href={`tel:${clinicInfo.contact.ambulance}`}>
                <Phone className="w-6 h-6 text-white" />
                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Call Ambulance!
                </span>
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Button
            asChild
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-2xl border-4 border-white relative group"
          >
            <a
              href={`https://wa.me/${clinicInfo.contact.reception.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Chat on WhatsApp
              </span>
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring" }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-[#FF6B7A] hover:bg-[#e55566] shadow-xl border-2 border-white"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
