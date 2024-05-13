import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

dotenv.config({ path: '.env.test' })

const prisma = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const sutDataBaseURL = generateDatabaseURL(schema)
    console.log(sutDataBaseURL)
    process.env.DATABASE_URL = sutDataBaseURL
    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
      },
    }
  },
}
