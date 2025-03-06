// Create src/app/api/test-db/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ status: 'Database Connected' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Connection Failed' },
      { status: 500 }
    )
  }
}
