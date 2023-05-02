import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const username = process.env['ROOT_USERNAME']
const password = process.env['ROOT_PASSWORD']

async function main() {
  console.log(`Start seeding...`)

  if (!username) {
    throw new Error('process.env.ROOT_USERNAME is not defined')
  }

  if (!password) {
    throw new Error('process.env.ROOT_PASSWORD` is not defined')
  }

  await prisma.user.create({ data: { username, password } })
  console.log(`Seeding finished.`)
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
