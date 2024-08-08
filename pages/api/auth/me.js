// pages/api/auth/me.js

/* Criando uma rota simples para recuperar o token do cookie, para que o frontend possa fazer requisições ao Spotify: */

import { parse } from "cookie";

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.access_token || null;

  res.status(200).json({ accessToken });
}
