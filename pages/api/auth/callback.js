// pages/api/auth/callback/spotify.js

/*
Depois que o usuário fizer o login no Spotify, ele será redirecionado para o SPOTIFY_REDIRECT_URI, que você configurou como http://localhost:3000/api/auth/callback/spotify.
*/

import axios from "axios";
import querystring from "querystring";

export default async function handler(req, res) {
  const code = req.query.code || null;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  if (!code) {
    return res.status(400).json({ error: "Code not found" });
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      tokenUrl,
      querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Armazene os tokens no cookie, no banco de dados, ou diretamente no contexto da sessão, conforme necessário
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
