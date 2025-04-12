import { PrismaClient } from "../src/generated/prisma";
import { createNewSlug } from "../src/utils/slugify";
import { dataProducts } from "./data/products";

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
