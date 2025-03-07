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
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const payload = ticket.getPayload()
    const email = payload.email

    await connectDB()
    const user = await User.findOneAndUpdate(
      { email },
      { googleTokens: tokens },
      { upsert: true, new: true }
    )

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    const response = new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    })
    
    response.headers.append(
      'Set-Cookie', 
      `session=${token}; Path=/; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure; SameSite=Strict' : ''} Max-Age=7200`
    )

    return response

  } catch (error) {
    console.error('Google Auth Error:', error)
    return Response.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, req.nextUrl.origin))
  }
}
