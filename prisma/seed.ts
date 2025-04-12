import { PrismaClient } from "../src/generated/prisma";
import { createNewSlug } from "../src/utils/slugify";
import { dataProducts } from "./data/products";
import { dataCategories } from "./data/categories";

const prisma = new PrismaClient();

async function main() {
  // Upsert categories first
  for (const dataCategory of dataCategories) {
    const newCategoryResult = await prisma.category.upsert({
      where: { slug: dataCategory.slug },
      create: {
        ...dataCategory,
        slug: createNewSlug(dataCategory.name),
      },
      update: {
        ...dataCategory,
      },
    });

    console.info(`🏷️ Category: ${newCategoryResult.name}`);
  }

  // Upsert products
  for (const dataProduct of dataProducts) {
    const { categorySlug, ...product } = dataProduct;

    const newProductResult = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        ...product,
        category: { connect: { slug: categorySlug } },
        slug: createNewSlug(product.name),
      },
      update: {
        ...product,
        category: { connect: { slug: categorySlug } },
      },
    });

    console.info(`🍞 Product: ${newProductResult.name}`);
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
