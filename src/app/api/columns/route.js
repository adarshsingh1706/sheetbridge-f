import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();
  const { userId, columns } = await req.json();
  
  await User.findByIdAndUpdate(userId, {
    $set: { customColumns: columns }
  });

  return Response.json({ success: true });
}

export async function GET(req) {
  const userId = new URL(req.url).searchParams.get('userId');
  
  const user = await User.findById(userId);
  return Response.json(user.customColumns || []);
}
