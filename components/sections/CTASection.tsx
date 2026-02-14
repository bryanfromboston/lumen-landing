'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ExternalLink, MessageCircle, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-container bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Transform Your Connectivity?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join thousands of organizations worldwide who trust Lumen for their network infrastructure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Button
              fullWidth
              size="lg"
              className="bg-white text-primary-600 hover:bg-blue-50 flex items-center justify-center gap-2 h-full"
            >
              <ExternalLink className="w-5 h-5" />
              <div className="text-left">
                <div className="font-bold">Access Portal</div>
                <div className="text-sm font-normal opacity-75">Sign in to get started</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              fullWidth
              size="lg"
              className="bg-accent-500 hover:bg-accent-600 text-white flex items-center justify-center gap-2 h-full"
            >
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <div className="font-bold">Request Demo</div>
                <div className="text-sm font-normal opacity-90">See it in action</div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              fullWidth
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 flex items-center justify-center gap-2 h-full"
            >
              <MessageCircle className="w-5 h-5" />
              <div className="text-left">
                <div className="font-bold">Live Chat</div>
                <div className="text-sm font-normal opacity-90">Talk to our team</div>
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-blue-100"
        >
          Questions? Call us at <a href="tel:1-800-555-0123" className="font-semibold underline">1-800-555-0123</a>
        </motion.p>
      </motion.div>
    </section>
  );
}
