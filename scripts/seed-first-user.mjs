/**
 * Seed the first Payload admin user into Neon when the table is empty.
 * Usage: node --env-file=.env scripts/seed-first-user.mjs
 */
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const email = process.env.SEED_EMAIL || 'admin@fail2fix.co.uk'
const password = process.env.SEED_PASSWORD
if (!password) {
  console.error('Set SEED_PASSWORD (and optionally SEED_EMAIL / SEED_NAME)')
  process.exit(1)
}
const name = process.env.SEED_NAME || 'Fail2Fix Admin'

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  limit: 1,
  overrideAccess: true,
})

if (existing.totalDocs > 0) {
  console.log('Users already exist:', existing.docs.map((u) => u.email))
  process.exit(0)
}

const user = await payload.create({
  collection: 'users',
  data: { email, password, name },
  overrideAccess: true,
})

console.log('Created first user:', user.email, user.id)
process.exit(0)
