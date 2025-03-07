import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true }, 
    { status: 200 }
  );
  
  // Clear session cookie
  response.cookies.delete('session');
  
  return response;
}
