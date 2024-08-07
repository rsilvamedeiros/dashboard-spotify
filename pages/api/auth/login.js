// pages/api/auth/login.js

export default function handler(req, res) {
  const scope =
    "user-read-email user-read-private user-library-read user-top-read playlist-read-private playlist-read-collaborative";
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${generateRandomString(16)}`;

  res.redirect(spotifyAuthUrl);
}

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
