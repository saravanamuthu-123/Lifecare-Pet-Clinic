"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PawButton } from '@/components/custom';
import { FloatingElements } from '@/components/custom/FloatingElements';
import {
  Heart,
  Award,
  Users,
  Target,
  CheckCircle2,
  Building2,
  Microscope,
  Ambulance,
  Home,
  Syringe,
  Stethoscope,
  Sparkles,
  Activity
} from 'lucide-react';
import clinicInfo from '@/data/clinic-info.json';

export default function AboutPage() {
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
            <Badge className="bg-[#FF6B7A] text-white mb-6 px-6 py-2">About Us</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {clinicInfo.name}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {clinicInfo.tagline}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {clinicInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                content: clinicInfo.mission,
                color: 'from-[#FF6B7A] to-[#e55566]',
              },
              {
                icon: Heart,
                title: 'Our Vision',
                content: clinicInfo.vision,
                color: 'from-[#FDB913] to-[#e5a40f]',
              },
              {
                icon: Award,
                title: 'Our Values',
                content: 'Compassion, Excellence, Integrity, Innovation, and Community engagement guide everything we do.',
                color: 'from-[#7B4397] to-[#663380]',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full glass border-none hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values List */}
      <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Core Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We Stand For
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {clinicInfo.values.map((value, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 mb-6 glass p-6 rounded-2xl"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CheckCircle2 className="w-6 h-6 text-[#7B4397] flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#FF6B7A] text-white mb-4">Our Facilities</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              State-of-the-Art Infrastructure
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our clinic is equipped with modern facilities to provide comprehensive care for your pets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, name: '24/7 ICU Availability', color: 'text-[#FDB913]' },
              { icon: Sparkles, name: 'Isolation Ward', color: 'text-[#FF6B7A]' },
              { icon: Microscope, name: 'In-house Laboratory', color: 'text-[#7B4397]' },
              { icon: Stethoscope, name: 'Imaging Facilities', color: 'text-[#FDB913]' },
              { icon: Activity, name: 'Modern Surgery Suites', color: 'text-[#FF6B7A]' },
              { icon: Syringe, name: 'In-house Pharmacy', color: 'text-[#7B4397]' },
              { icon: Home, name: 'Comfortable Boarding', color: 'text-[#FDB913]' },
              { icon: Ambulance, name: 'Ambulance Service', color: 'text-[#FF6B7A]' },
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="glass border-none hover:shadow-2xl transition-all duration-300 group h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <facility.icon className={`w-12 h-12 ${facility.color} mx-auto`} />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B7A] to-[#e55566] relative overflow-hidden">
        <FloatingElements count={20}>
          {() => <Heart className="w-16 h-16 text-white" />}
        </FloatingElements>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white text-[#FF6B7A] mb-4 px-6 py-2 font-bold">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Making a Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Expert Veterinarians', value: `${clinicInfo.stats.vets}+`, icon: Users },
              { label: 'Years of Excellence', value: `${clinicInfo.stats.yearsOfExperience}+`, icon: Award },
              { label: 'Successful Treatments', value: `${clinicInfo.stats.successfulTreatments.toLocaleString()}+`, icon: Heart },
              { label: 'Happy Pet Parents', value: `${clinicInfo.stats.happyClients.toLocaleString()}+`, icon: CheckCircle2 },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              >
                <motion.div
                  className="mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <stat.icon className="w-12 h-12 text-white/80 mx-auto" />
                </motion.div>
                <motion.p
                  className="text-5xl md:text-6xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-white/90 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Give Your Pet the Best Care?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Schedule an appointment with our expert veterinarians today and experience the difference compassionate care makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PawButton variant="primary" size="lg" href="/contact#appointment-form">
                Book Appointment
              </PawButton>
              <PawButton variant="outline" size="lg" href="/team">
                Meet Our Team
              </PawButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
