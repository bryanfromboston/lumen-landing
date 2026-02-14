'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { ShieldCheck, Lock } from 'lucide-react';
import { SECURITY_FEATURES } from '@/lib/constants';

const iconMap = {
  'shield-check': ShieldCheck,
  'lock': Lock,
};

export default function SecuritySection() {
  return (
    <section className="section-container bg-gray-900 text-white">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Enterprise-Grade Security
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Protect your network with industry-leading threat detection and mitigation
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {SECURITY_FEATURES.map((feature, index) => {
          const Icon = iconMap[feature.icon];

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card variant="security" className="bg-gray-800 border border-gray-700">
                <div className="flex-shrink-0">
                  <div className="inline-flex p-4 bg-primary-900/30 rounded-2xl">
                    <Icon className="w-8 h-8 text-primary-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    {feature.included && (
                      <span className="inline-block px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full">
                        Included
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400">
          Powered by <span className="font-semibold text-white">Black Lotus Labs</span> threat intelligence
        </p>
      </motion.div>
    </section>
  );
}
