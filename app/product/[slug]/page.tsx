import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./product-detail-client";

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product;
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: currentId } },
    include: { category: true },
    take: 4,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
