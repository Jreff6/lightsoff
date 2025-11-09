import { MeiliSearch } from 'meilisearch'

if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_MASTER_KEY) {
  throw new Error('Meilisearch environment variables are not set')
}

export const meilisearchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_MASTER_KEY,
})

// Index names
export const INDEXES = {
  ITEMS: 'items',
  BRANDS: 'brands',
  COLLECTIONS: 'collections',
} as const

// Initialize indexes
export async function initializeMeilisearch() {
  try {
    // Create items index
    await meilisearchClient.createIndex(INDEXES.ITEMS, {
      primaryKey: 'id',
    })

    // Configure filterable attributes
    await meilisearchClient.index(INDEXES.ITEMS).updateFilterableAttributes([
      'brandName',
      'collectionId',
      'category',
      'colors',
      'materials',
      'year',
      'season',
      'retailPrice',
    ])

    // Configure sortable attributes
    await meilisearchClient.index(INDEXES.ITEMS).updateSortableAttributes([
      'createdAt',
      'retailPrice',
      'viewCount',
    ])

    // Configure searchable attributes
    await meilisearchClient.index(INDEXES.ITEMS).updateSearchableAttributes([
      'name',
      'description',
      'brandName',
      'collectionName',
    ])

    console.log('✅ Meilisearch indexes initialized')
  } catch (error: any) {
    if (error.code === 'index_already_exists') {
      console.log('ℹ️ Meilisearch indexes already exist')
    } else {
      console.error('❌ Error initializing Meilisearch:', error)
      throw error
    }
  }
}

// Helper to sync item to Meilisearch
export async function syncItemToMeilisearch(item: any) {
  const searchableItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    colors: item.colors,
    materials: item.materials,
    retailPrice: item.retailPrice,
    collectionId: item.collectionId,
    collectionName: item.collection?.name || '',
    brandName: item.collection?.brand?.name || '',
    year: item.collection?.year || null,
    season: item.collection?.season || null,
    viewCount: item.viewCount,
    createdAt: item.createdAt.toISOString(),
  }

  await meilisearchClient.index(INDEXES.ITEMS).addDocuments([searchableItem])
}

// Helper to delete item from Meilisearch
export async function deleteItemFromMeilisearch(itemId: string) {
  await meilisearchClient.index(INDEXES.ITEMS).deleteDocument(itemId)
}

