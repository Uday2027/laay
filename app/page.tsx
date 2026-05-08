export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 8;

async function getProducts(page: number) {
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        skip: (page - 1) * PRODUCTS_PER_PAGE,
        take: PRODUCTS_PER_PAGE,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);
    return { products, total };
  } catch {
    return { products: [], total: 0 };
  }
}

async function getCategories() {
  try {
    return prisma.category.findMany({ take: 4 });
  } catch {
    return [];
  }
}

const fallbackProducts = [
  {
    id: "1",
    name: "Crescent Drop Earrings",
    price: 4200,
    tag: "Bestseller",
    slug: "crescent-drop-earrings",
    category: { name: "Earrings" },
    images: "[]",
    svg: (
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        <ellipse cx="30" cy="20" rx="16" ry="16" stroke="#9A7B5C" strokeWidth="0.5"/>
        <line x1="30" y1="36" x2="30" y2="80" stroke="#9A7B5C" strokeWidth="0.5"/>
        <ellipse cx="30" cy="62" rx="10" ry="14" stroke="#C4A97D" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    id: "2",
    name: "Arc Bangle",
    price: 7500,
    tag: "Gold",
    slug: "arc-bangle",
    category: { name: "Bracelets" },
    images: "[]",
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" stroke="#9A7B5C" strokeWidth="0.5"/>
        <circle cx="30" cy="30" r="14" stroke="#C4A97D" strokeWidth="0.5"/>
        <circle cx="30" cy="30" r="5" fill="#C4A97D" fillOpacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "3",
    name: "Pearl Pendant",
    price: 5800,
    tag: "New",
    slug: "pearl-pendant",
    category: { name: "Necklaces" },
    images: "[]",
    svg: (
      <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
        <path d="M25 5 L40 20 L25 55 L10 20 Z" stroke="#9A7B5C" strokeWidth="0.5" fill="none"/>
        <path d="M25 5 L40 20 L25 35 L10 20 Z" stroke="#C4A97D" strokeWidth="0.5" fill="none"/>
      </svg>
    ),
  },
  {
    id: "4",
    name: "Serpent Necklace",
    price: 9200,
    tag: "Limited",
    slug: "serpent-necklace",
    category: { name: "Necklaces" },
    images: "[]",
    svg: (
      <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
        <path d="M5 20 Q20 5 35 20 Q50 35 65 20" stroke="#9A7B5C" strokeWidth="0.5" fill="none"/>
        <circle cx="35" cy="20" r="6" stroke="#C4A97D" strokeWidth="0.5"/>
      </svg>
    ),
  },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolved = await Promise.resolve(searchParams ?? {});
  const page = Math.max(1, Number(resolved.page) || 1);

  const { products: dbProducts, total } = await getProducts(page);
  const categories = await getCategories();

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const products = dbProducts.length > 0
    ? dbProducts.map((p, i) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        slug: p.slug,
        images: p.images,
        tag: ["Bestseller", "Gold", "New", "Limited", "Exclusive", "Classic", "Trending", "Rare"][i % 8],
        svg: fallbackProducts[i % 4].svg,
      }))
    : fallbackProducts;

  const getPageLink = (p: number) => {
    if (p === 1) return "/";
    return `/?page=${p}`;
  };

  return (
    <div>
      {/* HERO */}
      <section className="min-h-screen bg-cream flex items-center pt-[72px] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full border border-linen opacity-60 pointer-events-none" />
        <div className="absolute -bottom-[100px] left-[10%] w-[300px] h-[300px] rounded-full border border-linen opacity-40 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-gold mb-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                New Collection — 2026
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-[72px] font-light italic text-umber leading-[1.05] mb-7 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                Worn with<br />intention.
              </h1>
              <p className="text-xs tracking-[0.06em] text-walnut leading-[2] max-w-[360px] mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                Each LAAE piece is an artefact of quiet confidence — designed for women who let the details speak.
              </p>
              <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "0.55s" }}>
                <Link href="/products" className="btn-primary">
                  Explore Collection
                </Link>
                <Link href="/about" className="btn-outline">
                  Our Story
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-full max-w-[460px] aspect-[16/9] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#cfc1b6" }}>
                <div className="absolute inset-4 border border-sandstone opacity-40 pointer-events-none" />
                <Image
                  src="/logo.png"
                  alt="LAAE"
                  width={400}
                  height={225}
                  className="w-[75%] object-contain"
                  priority
                />
              </div>
              <p className="text-[8px] tracking-[0.45em] uppercase text-gold mt-3.5 text-center">
                Fine Jewellery · Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-umber py-3.5 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {[...Array(2)].map((_, setIdx) => (
            <span key={setIdx}>
              <span className="text-[9px] tracking-[0.35em] uppercase text-sandstone mx-8">Handcrafted with care</span>
              <span className="text-gold mx-2">◆</span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-sandstone mx-8">Timeless elegance</span>
              <span className="text-gold mx-2">◆</span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-sandstone mx-8">Fine jewellery</span>
              <span className="text-gold mx-2">◆</span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-sandstone mx-8">LAAE Collection 2026</span>
              <span className="text-gold mx-2">◆</span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-sandstone mx-8">Worn with intention</span>
              <span className="text-gold mx-2">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="py-24 px-6 lg:px-12 max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[9px] tracking-[0.4em] uppercase text-gold mb-2.5">Browse By</p>
            <h2 className="font-serif text-4xl lg:text-[42px] font-light italic text-umber">
              Our Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative aspect-[4/3] bg-linen overflow-hidden transition-transform duration-400 hover:-translate-y-1"
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-pearl/40 to-linen flex items-center justify-center">
                    <span className="font-serif text-3xl italic text-umber/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-umber/70 via-umber/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">
                    Collection {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-xl text-cream">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section className="py-24 px-6 lg:px-12 max-w-[1200px] mx-auto border-t border-linen">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-gold mb-2.5">Curated Selection</p>
            <h2 className="font-serif text-4xl lg:text-[42px] font-light italic text-umber">
              The Signature Edit
            </h2>
          </div>
          <span className="hidden sm:inline text-[9px] tracking-[0.3em] uppercase text-sandstone">
            {total} pieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
          {products.map((product) => {
            const images = product.images ? JSON.parse(typeof product.images === "string" ? product.images : "[]") : [];
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block bg-linen cursor-pointer transition-transform duration-400 ease-out hover:-translate-y-1 relative overflow-hidden"
              >
                {images[0] ? (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-pearl flex items-center justify-center aspect-[3/4]">
                    <div className="opacity-25">
                      {product.svg}
                    </div>
                  </div>
                )}
                <div className="p-4 lg:p-5 bg-ivory">
                  <p className="font-serif text-base text-umber mb-1">{product.name}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-[0.1em] text-gold">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-sandstone">
                      {product.tag}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <Link
              href={getPageLink(page - 1)}
              className={`w-9 h-9 flex items-center justify-center border border-linen text-sandstone transition-colors duration-300 ${page <= 1 ? "pointer-events-none opacity-40" : "hover:border-gold hover:text-gold"}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={getPageLink(p)}
                className={`w-9 h-9 flex items-center justify-center text-[10px] tracking-wider transition-colors duration-300 ${
                  p === page
                    ? "bg-umber text-cream border border-umber"
                    : "border border-linen text-sandstone hover:border-gold hover:text-gold"
                }`}
              >
                {p}
              </Link>
            ))}

            <Link
              href={getPageLink(page + 1)}
              className={`w-9 h-9 flex items-center justify-center border border-linen text-sandstone transition-colors duration-300 ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:border-gold hover:text-gold"}`}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* BRAND STORY */}
      <section className="bg-umber py-24 px-6 lg:px-12 flex items-center justify-center">
        <div className="max-w-[680px] text-center">
          <Image
            src="/logo.png"
            alt="LAAE"
            width={160}
            height={60}
            className="h-12 w-auto object-contain mx-auto mb-9"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(0.3) brightness(0.85)" }}
          />
          <p className="text-[8px] tracking-[0.5em] uppercase text-gold mb-6">
            Our Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic text-cream leading-[1.4] mb-8">
            &ldquo;Jewellery is the most transformative thing you can wear.&rdquo;
          </h2>
          <div className="w-10 h-px bg-gold mx-auto mb-7" />
          <p className="text-[11px] tracking-[0.08em] text-sandstone leading-[2.2]">
            At LAAE, we believe jewelry is more than adornment — it is a testament to life&apos;s most meaningful
            moments. Each piece is meticulously handcrafted by skilled artisans using only the finest materials,
            ensuring timeless beauty that transcends generations. From the initial sketch to the final polish,
            every step of our process is guided by an unwavering commitment to excellence.
          </p>
          <div className="mt-10">
            <Link href="/about" className="inline-flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-sandstone hover:text-cream transition-colors duration-300 border-b border-gold/50 pb-1">
              Read Our Story
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
