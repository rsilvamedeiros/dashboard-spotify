require("dotenv").config();
const axios = require("axios");
const querystring = require("querystring");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const getAccessToken = async () => {
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const response = await axios.post(
    tokenUrl,
    querystring.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    }
  );

  return response.data.access_token;
};

const testSpotifyConnection = async () => {
  try {
    const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken);

    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    console.log("User Data:", response.data);
  } catch (error) {
    console.error(
      "Error connecting to Spotify API:",
      error.response.data || error.message
    );
  }
};

testSpotifyConnection();
