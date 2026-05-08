import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Categories
  const bracelet = await prisma.category.upsert({
    where: { slug: "bracelet" },
    update: {},
    create: { name: "Bracelet", slug: "bracelet", image: "/images/categories/bracelets.jpg" },
  });
  const rings = await prisma.category.upsert({
    where: { slug: "rings" },
    update: {},
    create: { name: "Rings", slug: "rings", image: "/images/categories/rings.jpg" },
  });
  const earRings = await prisma.category.upsert({
    where: { slug: "ear-rings" },
    update: {},
    create: { name: "Ear Rings", slug: "ear-rings", image: "/images/categories/earrings.jpg" },
  });

  // Products
  await prisma.product.upsert({
    where: { slug: "gold-diamond-ring" },
    update: {},
    create: {
      name: "Gold Diamond Ring",
      slug: "gold-diamond-ring",
      price: 12500,
      stock: 10,
      images: JSON.stringify(["/images/products/ring-1.jpg"]),
      featured: true,
      categoryId: rings.id,
    },
  });
  await prisma.product.upsert({
    where: { slug: "arc-bangle" },
    update: {},
    create: {
      name: "Arc Bangle",
      slug: "arc-bangle",
      price: 7500,
      stock: 10,
      images: JSON.stringify(["/images/products/bangle-1.jpg"]),
      featured: true,
      categoryId: bracelet.id,
    },
  });
  await prisma.product.upsert({
    where: { slug: "crystal-drop-earrings" },
    update: {},
    create: {
      name: "Crystal Drop Earrings",
      slug: "crystal-drop-earrings",
      price: 4200,
      stock: 10,
      images: JSON.stringify(["/images/products/earrings-1.jpg"]),
      featured: true,
      categoryId: earRings.id,
    },
  });
  await prisma.product.upsert({
    where: { slug: "pearl-pendant" },
    update: {},
    create: {
      name: "Pearl Pendant",
      slug: "pearl-pendant",
      price: 5800,
      stock: 10,
      images: JSON.stringify(["/images/products/pendant-1.jpg"]),
      featured: true,
      categoryId: rings.id,
    },
  });

  // SiteConfig
  await prisma.siteConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "LAAE Jewelry",
      bkashNumber: "01XXXXXXXXX",
      deliveryCharge: 100,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
