// seed.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seedProducts() {
  try {
    console.log('Starting to seed products...')
    
    // First clear existing products
    // await prisma.product.deleteMany({})
    
    const dummyProductsData = [
      {
        name: "Arabica",
        description: "Smooth, mild, and slightly sweet with hints of chocolate and nuts.",
        price: 18.97,
        inventory: 100,
        images: ["/images/bean_image.png"],
        category: "ARABICA",
        location: "Chikmaglur, India",
        isFeatured: true
      },
      {
        name: "Robusta",
        description: "Strong, bold, and earthy with a rich crema.",
        price: 12.97,
        inventory: 150,
        images: ["/images/bean_image.png"],
        category: "ROBUSTA",
        location: "Coorg, India",
        isFeatured: true
      },
      {
        name: "Nilgiri",
        description: "Bright, floral, and citrusy with a smooth finish.",
        price: 15.97,
        inventory: 75,
        images: ["/images/bean_image.png"],
        category: "SPECIALTY",
        location: "Nilgiri Hills, India",
        isFeatured: true
      },
      {
        name: "Liberica",
        description: "Unique smoky aroma with woody and floral notes.",
        price: 20.97,
        inventory: 50,
        images: ["/images/bean_image.png"],
        category: "SPECIALTY",
        location: "Mount Kitanglad, Philippines",
        isFeatured: false
      },
      {
        name: "Excelsa",
        description: "Tart, fruity characteristics with dark roast tones.",
        price: 16.47,
        inventory: 85,
        images: ["/images/bean_image.png"],
        category: "SPECIALTY",
        location: "Lam Dong, Vietnam",
        isFeatured: false
      }
    ]

    // Create all products
    const products = await Promise.all(
      dummyProductsData.map(product => 
        prisma.product.create({
          data: product
        })
      )
    )

    console.log(`Seeded ${products.length} products successfully`)
    return products
    
  } catch (error) {
    console.error('Error seeding products:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedProducts()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })