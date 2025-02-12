import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to seed all dummy products : root of folder

// Function to add a single new product
export async function addNewProduct({
  name,
  description,
  price,
  inventory,
  images,
  category,
  location,
  isFeatured = false,
}) {
  try {
    // Input validation
    if (!name || !description || !price || !category || !location) {
      throw new Error("Missing required fields");
    }

    // Validate price and inventory
    if (price <= 0) throw new Error("Price must be greater than 0");
    if (inventory < 0) throw new Error("Inventory cannot be negative");

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        inventory,
        images: images || ["/images/bean_image.png"], // Default image if none provided
        category,
        location,
        isFeatured,
      },
    });

    console.log("New product added successfully:", product.name);
    return product;
  } catch (error) {
    console.error("Error adding new product:", error);
    throw error;
  }
}

// Example usage for adding a new product:
/*
await addNewProduct({
  name: "New Coffee Blend",
  description: "A wonderful new blend with unique characteristics",
  price: 24.99,
  inventory: 100,
  images: ["/images/new_blend.png"],
  category: "SPECIALTY",
  location: "Costa Rica",
  isFeatured: true
})
*/

// Example usage for seeding all products:
/*
// You can run this in a seed script
async function main() {
  await seedProducts()
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
*/
