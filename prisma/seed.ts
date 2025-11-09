import { PrismaClient, UserRole, BrandStatus, Season, CollectionStatus, ItemCategory } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Supprimer les données existantes
  await prisma.favorite.deleteMany()
  await prisma.itemImage.deleteMany()
  await prisma.item.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleaned existing data')

  // Créer un utilisateur admin
  const adminUser = await prisma.user.create({
    data: {
      clerkId: 'clerk_admin_test_12345',
      email: 'admin@fashionarchive.com',
      username: 'admin',
      role: UserRole.ADMIN,
    },
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Créer des utilisateurs marques de test
  const brandUser1 = await prisma.user.create({
    data: {
      clerkId: 'clerk_brand_test_001',
      email: 'contact@maison-margaux.com',
      username: 'maisonmargaux',
      role: UserRole.BRAND,
      brand: {
        create: {
          name: 'Maison Margaux',
          slug: 'maison-margaux',
          description: 'French independent fashion house focused on sustainable luxury.',
          country: 'FR',
          foundedYear: 2018,
          website: 'https://maison-margaux.com',
          instagram: '@maisonmargaux',
          status: BrandStatus.ACTIVE,
          verifiedAt: new Date(),
        },
      },
    },
    include: { brand: true },
  })

  console.log('✅ Brand 1 created:', brandUser1.brand?.name)

  const brandUser2 = await prisma.user.create({
    data: {
      clerkId: 'clerk_brand_test_002',
      email: 'hello@studiotheo.com',
      username: 'studiotheo',
      role: UserRole.BRAND,
      brand: {
        create: {
          name: 'Studio Theo',
          slug: 'studio-theo',
          description: 'Minimalist menswear from Copenhagen.',
          country: 'DK',
          foundedYear: 2020,
          website: 'https://studiotheo.com',
          instagram: '@studiotheo',
          status: BrandStatus.ACTIVE,
          verifiedAt: new Date(),
        },
      },
    },
    include: { brand: true },
  })

  console.log('✅ Brand 2 created:', brandUser2.brand?.name)

  // Créer des collections
  const collection1 = await prisma.collection.create({
    data: {
      brandId: brandUser1.brand!.id,
      name: 'Ethereal Dreams',
      slug: 'ethereal-dreams-ss24',
      year: 2024,
      season: Season.SPRING_SUMMER,
      description: 'A collection inspired by morning mist and soft textures.',
      status: CollectionStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  })

  console.log('✅ Collection 1 created:', collection1.name)

  const collection2 = await prisma.collection.create({
    data: {
      brandId: brandUser2.brand!.id,
      name: 'Nordic Essence',
      slug: 'nordic-essence-fw24',
      year: 2024,
      season: Season.FALL_WINTER,
      description: 'Clean lines and functional design for modern living.',
      status: CollectionStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  })

  console.log('✅ Collection 2 created:', collection2.name)

  // Créer des items
  const items = await prisma.item.createMany({
    data: [
      {
        collectionId: collection1.id,
        name: 'Linen Oversized Shirt',
        description: 'Relaxed-fit shirt in natural linen with mother-of-pearl buttons',
        category: ItemCategory.TOP,
        materials: ['Linen', 'Cotton'],
        colors: ['Beige', 'White'],
        sizes: ['S', 'M', 'L', 'XL'],
        retailPrice: 180,
        currency: 'EUR',
        position: 0,
      },
      {
        collectionId: collection1.id,
        name: 'Wide Leg Trousers',
        description: 'High-waisted wide leg trousers in organic cotton',
        category: ItemCategory.BOTTOM,
        materials: ['Organic Cotton'],
        colors: ['Navy', 'Black'],
        sizes: ['XS', 'S', 'M', 'L'],
        retailPrice: 220,
        currency: 'EUR',
        position: 1,
      },
      {
        collectionId: collection1.id,
        name: 'Silk Slip Dress',
        description: 'Bias-cut slip dress in pure mulberry silk',
        category: ItemCategory.DRESS,
        materials: ['Silk'],
        colors: ['Cream', 'Sage'],
        sizes: ['XS', 'S', 'M', 'L'],
        retailPrice: 350,
        currency: 'EUR',
        position: 2,
      },
      {
        collectionId: collection2.id,
        name: 'Wool Overcoat',
        description: 'Double-breasted overcoat in Italian wool',
        category: ItemCategory.OUTERWEAR,
        materials: ['Wool', 'Cashmere'],
        colors: ['Charcoal', 'Camel'],
        sizes: ['S', 'M', 'L', 'XL'],
        retailPrice: 650,
        currency: 'EUR',
        position: 0,
      },
      {
        collectionId: collection2.id,
        name: 'Merino Turtleneck',
        description: 'Fine gauge merino wool turtleneck',
        category: ItemCategory.TOP,
        materials: ['Merino Wool'],
        colors: ['Black', 'Navy', 'Grey'],
        sizes: ['S', 'M', 'L', 'XL'],
        retailPrice: 120,
        currency: 'EUR',
        position: 1,
      },
    ],
  })

  console.log('✅ Created', items.count, 'items')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

