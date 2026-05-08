import Image from "next/image";
import { Heart, Gem, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6 font-medium">Since 2025</p>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-charcoal mb-8 leading-tight">
            The Art of
            <br />
            <span className="italic">Fine Jewelry</span>
          </h1>
          <div className="divider-gold mx-auto" />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-white overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="LAAE Jewelry"
                  width={600}
                  height={750}
                  className="object-contain w-full h-full p-20"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-gold/20" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-gold/20" />
            </div>
            
            <div className="space-y-8">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">Our Story</p>
                <h2 className="text-4xl font-serif font-medium text-charcoal mb-6">
                  Passion in Every Detail
                </h2>
                <div className="w-12 h-px bg-gold mb-6" />
              </div>
              <p className="text-gray-400 leading-relaxed font-light">
                LAAE was born from a singular vision: to create jewelry that transcends trends and becomes 
                a cherished part of your story. Founded in Dhaka, Bangladesh, we bring together traditional 
                craftsmanship and contemporary design to create pieces that are both timeless and deeply personal.
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                Every piece in our collection is designed with intention, crafted with care, and finished 
                with the meticulous attention to detail that defines true luxury. We believe that the finest 
                jewelry should not only adorn but also inspire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">Our Values</p>
            <h2 className="text-4xl font-serif font-medium text-charcoal mb-4">What Defines Us</h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-8 group-hover:border-gold transition-colors">
                <Gem className="w-8 h-8 text-gold" strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-4">Premium Quality</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Only the finest materials and gemstones make it into our collections. 
                Every piece undergoes rigorous quality control.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-8 group-hover:border-gold transition-colors">
                <Heart className="w-8 h-8 text-gold" strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-4">Made with Love</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Each piece is handcrafted by skilled artisans who pour their heart 
                and soul into every detail.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-8 group-hover:border-gold transition-colors">
                <Award className="w-8 h-8 text-gold" strokeWidth={1} />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-4">Trusted Brand</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Thousands of happy customers across Bangladesh trust LAAE 
                for their most special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6 font-medium">Begin Your Journey</p>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-8">
            Discover Our Collection
          </h2>
          <p className="text-gray-400 font-light mb-10 max-w-lg mx-auto">
            Explore our curated selection of fine jewelry, each piece waiting to become part of your story.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gold text-charcoal px-10 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold-light transition-colors"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
