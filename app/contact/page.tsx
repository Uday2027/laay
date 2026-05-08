"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4">Contact Us</h1>
          <div className="divider-gold mx-auto" />
          <p className="text-gray-400 font-light mt-6 max-w-md mx-auto">
            We would love to hear from you. Reach out for inquiries, custom orders, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-8 bg-gray-50">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-1">Visit Us</h3>
                <p className="text-gray-400 font-light text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-8 bg-gray-50">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-1">Call Us</h3>
                <p className="text-gray-400 font-light text-sm">+880 1XXXXXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-8 bg-gray-50">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-1">Email Us</h3>
                <p className="text-gray-400 font-light text-sm">hello@laae.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-8 bg-gray-50">
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-1">Hours</h3>
                <p className="text-gray-400 font-light text-sm">Sat — Thu: 10AM — 8PM</p>
                <p className="text-gray-400 font-light text-sm">Friday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-10">
            <h2 className="text-2xl font-serif font-medium text-charcoal mb-2">Send a Message</h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 bg-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 bg-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-5 py-4 bg-white border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
