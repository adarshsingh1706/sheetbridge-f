import { google } from 'googleapis';
import User from '@/models/User';
export const getAuthClient = async (userId) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // Get stored tokens from DB
  const user = await User.findById(userId);
  oauth2Client.setCredentials(user.googleTokens);
  
  return oauth2Client;
};

export const getSheetData = async (spreadsheetId, range, userId) => {
  const auth = await getAuthClient(userId);
  const sheets = google.sheets({ version: 'v4', auth });
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
};
