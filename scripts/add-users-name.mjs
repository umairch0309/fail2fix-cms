import pg from 'pg'

const c = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

await c.connect()
await c.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS name character varying')
console.log('added users.name')

const cols = await c.query(
  "SELECT column_name FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position",
)
console.log(
  'columns:',
  cols.rows.map((r) => r.column_name).join(', '),
)

await c.end()
