import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@laae.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@laae.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create default site config
  await prisma.siteConfig.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      siteTitle: "LAAE Jewelry",
      bkashNumber: "01XXXXXXXXX",
      deliveryCharge: 100,
    },
  });

  // Create sample categories
  const categories = [
    { name: "Rings", slug: "rings", description: "Elegant rings for every occasion" },
    { name: "Necklaces", slug: "necklaces", description: "Stunning necklaces to elevate your look" },
    { name: "Earrings", slug: "earrings", description: "Beautiful earrings for every style" },
    { name: "Bracelets", slug: "bracelets", description: "Delicate bracelets to adorn your wrist" },
    { name: "Anklets", slug: "anklets", description: "Charming anklets for a touch of elegance" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create sample products
  const ringsCategory = await prisma.category.findUnique({ where: { slug: "rings" } });
  const necklacesCategory = await prisma.category.findUnique({ where: { slug: "necklaces" } });
  const earringsCategory = await prisma.category.findUnique({ where: { slug: "earrings" } });

  if (ringsCategory) {
    await prisma.product.upsert({
      where: { slug: "gold-diamond-ring" },
      update: {},
      create: {
        name: "Gold Diamond Ring",
        slug: "gold-diamond-ring",
        description: "A stunning 18k gold ring featuring a brilliant cut diamond.",
        price: 15000,
        stock: 10,
        images: JSON.stringify(["/uploads/ring1.jpg"]),
        featured: true,
        categoryId: ringsCategory.id,
      },
    });
    await prisma.product.upsert({
      where: { slug: "rose-gold-band" },
      update: {},
      create: {
        name: "Rose Gold Band",
        slug: "rose-gold-band",
        description: "Elegant rose gold band with intricate detailing.",
        price: 8500,
        stock: 15,
        images: JSON.stringify(["/uploads/ring2.jpg"]),
        featured: false,
        categoryId: ringsCategory.id,
      },
    });
  }

  if (necklacesCategory) {
    await prisma.product.upsert({
      where: { slug: "pearl-pendant-necklace" },
      update: {},
      create: {
        name: "Pearl Pendant Necklace",
        slug: "pearl-pendant-necklace",
        description: "A timeless pearl pendant on a delicate gold chain.",
        price: 12000,
        stock: 8,
        images: JSON.stringify(["/uploads/necklace1.jpg"]),
        featured: true,
        categoryId: necklacesCategory.id,
      },
    });
  }

  if (earringsCategory) {
    await prisma.product.upsert({
      where: { slug: "crystal-drop-earrings" },
      update: {},
      create: {
        name: "Crystal Drop Earrings",
        slug: "crystal-drop-earrings",
        description: "Sparkling crystal drop earrings perfect for special occasions.",
        price: 6500,
        stock: 20,
        images: JSON.stringify(["/uploads/earring1.jpg"]),
        featured: false,
        categoryId: earringsCategory.id,
      },
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
