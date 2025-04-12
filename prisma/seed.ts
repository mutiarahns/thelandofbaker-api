import { PrismaClient } from "@prisma/client";
import { dataProducts } from "./data/products";
import { createNewSlug } from "../src/utils/slugify";

const prisma = new PrismaClient();

async function main() {
  for (const product of dataProducts) {
    const newProductResult = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        ...product,
        slug: createNewSlug(product.name),
      },
      update: product,
    });

    console.info(`🆕 Product: ${newProductResult.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
