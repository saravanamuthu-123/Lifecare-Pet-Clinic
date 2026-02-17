"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { DoctorCard } from '@/components/custom';
import { FloatingElements } from '@/components/custom/FloatingElements';
import { Users, Award, Heart } from 'lucide-react';
import team from '@/data/team.json';
import clinicInfo from '@/data/clinic-info.json';

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] overflow-hidden">
        <FloatingElements count={15} className="absolute inset-0 opacity-5">
          {() => (
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#FF6B7A">
              <circle cx="12" cy="8" r="2" />
              <circle cx="8" cy="12" r="1.5" />
              <circle cx="16" cy="12" r="1.5" />
              <ellipse cx="12" cy="16" rx="3" ry="4" />
            </svg>
          )}
        </FloatingElements>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-6 px-6 py-2">Our Team</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Our Expert Veterinarians
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Our team of highly qualified and experienced veterinarians is dedicated to providing the best possible care for your beloved pets.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
              {[
                { icon: Users, label: 'Expert Vets', value: `${team.length}+` },
                { icon: Heart, label: 'Specializations', value: `${new Set(team.map(d => d.specialization)).size}+` },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  <stat.icon className="w-10 h-10 text-[#FF6B7A] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#FF6B7A] mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Expert Care</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Pet's Health in Expert Hands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each member of our team brings unique expertise and a shared passion for animal care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((doctor, index) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Our Team Special
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Advanced Training',
                description: 'All our veterinarians have advanced degrees and specialized certifications in their fields.',
                icon: '🎓',
              },
              {
                title: 'Compassionate Care',
                description: 'We treat every pet as if they were our own, with love, patience, and understanding.',
                icon: '❤️',
              },
              {
                title: 'Continuous Learning',
                description: 'Our team stays updated with the latest veterinary medicine advances through regular training.',
                icon: '📚',
              },
              {
                title: 'Collaborative Approach',
                description: 'We work together to provide comprehensive care, consulting on complex cases for best outcomes.',
                icon: '🤝',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Specializations</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team covers a wide range of veterinary specializations to meet all your pet's healthcare needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {Array.from(new Set(team.map(doc => doc.specialization))).map((specialization, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl text-center hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-semibold text-gray-900">{specialization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B7A] to-[#e55566] relative overflow-hidden">
        <FloatingElements count={20}>
          {() => <Heart className="w-16 h-16 text-white" />}
        </FloatingElements>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white text-[#FF6B7A] mb-4 px-4 py-2 text-sm font-bold">
              Ready to Meet Us?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Schedule a Consultation with Our Experts
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Our team is ready to provide your pet with the exceptional care they deserve. Book an appointment today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#FF6B7A] px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Appointment
              </motion.a>
              <motion.a
                href={`tel:${clinicInfo.contact.reception}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Reception
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
