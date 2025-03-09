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
        name: "Colombian Supremo",
        description: "Rich and full-bodied with a hint of citrus.",
        price: 19.99,
        inventory: 120,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Colombia",
        isFeatured: true
      },
      {
        name: "Ethiopian Yirgacheffe",
        description: "Floral and fruity with bright acidity.",
        price: 22.50,
        inventory: 100,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Ethiopia",
        isFeatured: true
      },
      {
        name: "Guatemalan Antigua",
        description: "Balanced with a pleasant spice and chocolate undertone.",
        price: 18.75,
        inventory: 80,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Guatemala",
        isFeatured: true
      },
      {
        name: "Costa Rican Tarrazu",
        description: "Bright, clean with a rich aroma and pleasant acidity.",
        price: 20.00,
        inventory: 90,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Costa Rica",
        isFeatured: true
      },
      {
        name: "Sumatra Mandheling",
        description: "Heavy-bodied with a smooth, earthy flavor and low acidity.",
        price: 23.50,
        inventory: 70,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Indonesia",
        isFeatured: false
      },
      {
        name: "Brazilian Santos",
        description: "Nutty and mild with a balanced sweetness.",
        price: 17.25,
        inventory: 110,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Brazil",
        isFeatured: false
      },
      {
        name: "Kenyan AA",
        description: "Vibrant acidity with berry and wine-like flavors.",
        price: 24.00,
        inventory: 60,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Kenya",
        isFeatured: true
      },
      {
        name: "Jamaican Blue Mountain",
        description: "Exceptionally smooth with a subtle sweetness and low bitterness.",
        price: 29.99,
        inventory: 40,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Jamaica",
        isFeatured: true
      },
      {
        name: "Sumatran Gayo",
        description: "Deep, earthy and complex with spicy undertones.",
        price: 22.75,
        inventory: 65,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Indonesia",
        isFeatured: false
      },
      {
        name: "Nicaraguan Segovia",
        description: "Well-balanced with a cocoa note and mild acidity.",
        price: 19.50,
        inventory: 85,
        images: ["/images/bean_image.png"],
        category: "COFFEE_BEANS",
        location: "Nicaragua",
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