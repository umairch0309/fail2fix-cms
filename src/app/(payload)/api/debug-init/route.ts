import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/** Temporary diagnostic — remove after CMS admin is stable. */
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const users = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })
    return NextResponse.json({
      ok: true,
      users: users.totalDocs,
      serverURL: payload.config.serverURL,
      hasSecret: Boolean(payload.secret),
    })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack?.split('\n').slice(0, 8) : undefined,
      },
      { status: 500 },
    )
  }
}
