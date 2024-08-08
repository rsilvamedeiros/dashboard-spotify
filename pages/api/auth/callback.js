// pages/api/auth/callback/spotify.js

import axios from "axios";
import querystring from "querystring";
import { serialize } from "cookie";

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

    // Armazenar o token em um cookie
    res.setHeader(
      "Set-Cookie",
      serialize("access_token", accessToken, { path: "/", httpOnly: true })
    );
    res.setHeader(
      "Set-Cookie",
      serialize("refresh_token", refreshToken, { path: "/", httpOnly: true })
    );

    // Redirecionar para a página principal ou painel
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
}
