import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = globalThis.prisma ?? prismaClientSingleton()
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma