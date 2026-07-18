import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    ''
  ).trim(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    'https://fail2fix.co.uk',
    'https://www.fail2fix.co.uk',
    'http://localhost:3000',
    'https://failfix-animation.vercel.app',
    'https://fail2fix.vercel.app',
    'https://fail2fix-customer.vercel.app',
    'https://fail2fixcms.vercel.app',
  ],
  collections: [Users, Media, Blogs],
  editor: lexicalEditor(),
  secret: (process.env.PAYLOAD_SECRET || '').trim(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: (process.env.DATABASE_URL || '').trim(),
      max: 10,
    },
    prodMigrations: migrations,
  }),
  // Omit sharp on Vercel — native binary often fails in serverless and crashes /admin.
  plugins: [],
})
