import { google } from 'googleapis';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const code = new URL(req.url).searchParams.get('code');
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const { data } = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses',
    });

    const email = data.emailAddresses[0].value;
    
    // Store tokens in DB
    await connectDB();
    await User.findOneAndUpdate(
      { email },
      { googleTokens: tokens },
      { upsert: true, new: true }
    );

    return Response.redirect(new URL('/dashboard', req.nextUrl.origin));
  } catch (error) {
    return Response.redirect(new URL('/login?error=auth_failed', req.nextUrl.origin));
  }
}
