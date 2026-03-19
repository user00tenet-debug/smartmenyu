require("dotenv/config")
const { PrismaClient } = require("@prisma/client")
const { PrismaPg } = require("@prisma/adapter-pg")
const { Pool } = require("pg")

// Connect to Supabase PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    // Seed KFC
    const kfc = await prisma.restaurant.upsert({
        where: { slug: "kfc" },
        update: {},
        create: {
            name: "KFC",
            slug: "kfc"
        }
    })
    console.log("Created restaurant:", kfc)

    // Seed Chicken Bhiryani (Paradise)
    const chickenBhiryani = await prisma.restaurant.upsert({
        where: { slug: "chicken-bhiryani" },
        update: {},
        create: {
            name: "Chicken Bhiryani",
            slug: "chicken-bhiryani"
        }
    })
    console.log("Created restaurant:", chickenBhiryani)

    // Seed Paradise
    const paradise = await prisma.restaurant.upsert({
        where: { slug: "paradise" },
        update: {},
        create: {
            name: "Paradise",
            slug: "paradise"
        }
    })
    console.log("Created restaurant:", paradise)


}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
