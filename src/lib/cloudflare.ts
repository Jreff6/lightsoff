import { S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

// Cloudflare R2 Client (S3-compatible)
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

// Generate presigned URL for image upload
export async function generateUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 })
  return url
}

// Cloudflare Images API
export async function uploadToCloudflareImages(file: File | Buffer, filename: string) {
  const formData = new FormData()
  
  if (file instanceof File) {
    formData.append('file', file)
  } else {
    formData.append('file', new Blob([file]), filename)
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(`Cloudflare Images upload failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}

