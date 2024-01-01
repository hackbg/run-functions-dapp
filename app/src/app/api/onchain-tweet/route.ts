import { NextRequest, NextResponse } from 'next/server'

import { getTweetOnchain, requestTweetOnchain } from '@/lib/request-onchain'
import { addToTweetHistory } from '@/lib/history'
import {
  fetchTweetMedia,
  getProfileImageUrl,
  getTweetAuthorName,
  getTweetHasMedia,
  getTweetId,
  getTweetMediaUrls,
  getTweetText,
} from '@/lib/fetch-tweet'

export async function POST(request: NextRequest) {
  const params = await request.json()
  if (!params || !params.username) return NextResponse.error()

  const { username } = params

  const { txHash, requestId } = await requestTweetOnchain(username)
  if (!txHash) return NextResponse.error()

  console.log({ txHash, requestId, username })

  try {
    await addToTweetHistory({
      txHash,
      requestId,
      username,
    })
  } catch (error) {
    console.log('Adding request to history failed.')
  }

  return NextResponse.json({ data: { txHash } })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const requestId = searchParams.get('requestId') || ''

  if (!requestId) return NextResponse.error()

  const [, text] = await getTweetOnchain(requestId)
  return NextResponse.json({ text })
}
