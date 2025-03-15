import axios from 'axios';
import connectDB from '@/lib/db';
import User from '@/models/User';

export default async function handler(req, res) {
  await connectDB();
  
  const { code } = req.query;
  const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];

  try {
    const { data: tokens } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
      grant_type: 'authorization_code',
    });

    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const domain = profile.email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      return res.redirect('/signup?error=invalid_domain');
    }

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        googleId: profile.id
      });
    }

    // res.redirect('/dashboard');
  } catch (error) {
    res.redirect(`/signup?error=${error.message}`);
  }
}