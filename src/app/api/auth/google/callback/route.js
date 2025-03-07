import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET(req) {
  const code = new URL(req.url).searchParams.get('code')
  
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    
    // Get user email from ID token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const payload = ticket.getPayload()
    const email = payload.email

    // Database operations
    await connectDB()
    const user = await User.findOneAndUpdate(
      { email },
      { googleTokens: tokens },
      { upsert: true, new: true }
    )

    // Create session token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    // Set cookie
    const response = NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2,
      path: '/',
    })

    return response
    
  } catch (error) {
    console.error('Google Auth Error:', error)
    return Response.redirect(new URL('/login?error=auth_failed', req.nextUrl.origin))
  }
}
