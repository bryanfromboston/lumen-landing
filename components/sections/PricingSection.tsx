'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Check, Star } from 'lucide-react';
import { PRICING_TIERS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function PricingSection() {
  const [hoursPerMonth, setHoursPerMonth] = useState(720); // 30 days * 24 hours

  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        >
          Transparent, Consumption-Based Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          Pay only for the bandwidth you use. No hidden fees, no long-term contracts.
        </motion.p>

        {/* Pricing Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md mx-auto mb-12 p-6 bg-gray-50 rounded-xl"
        >
          <label className="block text-sm font-semibold mb-3 text-left">
            Estimate your monthly cost:
          </label>
          <input
            type="range"
            min="1"
            max="720"
            value={hoursPerMonth}
            onChange={(e) => setHoursPerMonth(Number(e.target.value))}
            className="w-full mb-3"
          />
          <div className="text-2xl font-bold text-primary-600">
            {hoursPerMonth} hours/month
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_TIERS.map((tier, index) => {
          const monthlyEstimate = tier.hourlyRate * hoursPerMonth;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-1 bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                variant="pricing"
                className={`h-full ${tier.popular ? 'ring-2 ring-accent-500 shadow-2xl scale-105' : ''}`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-4xl font-bold text-primary-600 mb-1">
                    {tier.bandwidth}
                  </div>
                  <div className="text-gray-600">
                    {formatCurrency(tier.hourlyRate)}/hour
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    ~{formatCurrency(monthlyEstimate)}/month
                  </div>
                </div>

                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  fullWidth
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center space-y-3 text-gray-600"
      >
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <Check className="w-5 h-5 text-success" />
          <span>No long-term contracts</span>
          <span className="text-gray-400">•</span>
          <Check className="w-5 h-5 text-success" />
          <span>No credit card required</span>
          <span className="text-gray-400">•</span>
          <Check className="w-5 h-5 text-success" />
          <span>No early termination fees</span>
        </p>
        <p className="text-sm">
          Volume discounts available for Enterprise customers
        </p>
      </motion.div>
    </section>
  );
}
