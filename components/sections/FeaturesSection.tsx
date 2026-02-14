'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { Clock, Gauge, Shield, Map, DollarSign, X } from 'lucide-react';
import { FEATURES } from '@/lib/constants';

const iconMap = {
  'clock': Clock,
  'gauge': Gauge,
  'shield': Shield,
  'map': Map,
  'dollar-sign': DollarSign,
  'x': X,
};

export default function FeaturesSection() {
  return (
    <section className="section-container bg-gray-50">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Enterprise-Grade Connectivity, Simplified
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Everything you need for flexible, secure, and reliable internet connectivity
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const Icon = iconMap[feature.icon];

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card variant="feature" className="h-full hover:scale-105 transition-transform">
                <div className="inline-flex p-4 bg-primary-50 rounded-2xl mb-6">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional value prop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl p-8 md:p-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Powered by Lumen AS3356 Network
        </h3>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          The world's #1 peered network, delivering unmatched performance and global reach
        </p>
      </motion.div>
    </section>
  );
}
