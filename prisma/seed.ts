import { PrismaClient } from '@prisma/client'
import { ROOT_EMAIL, ROOT_PASSWORD, SECRET_TOKEN } from '../src/libs/env.js'
import { hashPassword } from '../src/libs/hash-password.js'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding...`)

  await prisma.user.create({
    data: {
      name: 'Guest',
      image: 'https://avatars.githubusercontent.com/u/33?v=4',
      email: ROOT_EMAIL,
      password: hashPassword(ROOT_PASSWORD, SECRET_TOKEN)
    }
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
