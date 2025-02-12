import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  try {
    const products = await prisma.product.findMany(); // Fetch all products

    fs.writeFileSync('products.json', JSON.stringify(products, null, 2)); // Save as JSON file
    console.log('Data exported successfully!');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();
