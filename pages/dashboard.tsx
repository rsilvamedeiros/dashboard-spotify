import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import PlaylistCard from '../components/PlaylistCard';
import ArtistCard from '../components/ArtistCard';
import { Grid, Typography } from '@mui/material';

export default function Dashboard() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (session) {
      axios
        .get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => setPlaylists(response.data.items));

      axios
        .get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((response) => setTopArtists(response.data.items));
    }
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Your Playlists
      </Typography>
      <Grid container spacing={2}>
        {playlists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Your Top Artists
      </Typography>
      <Grid container spacing={2}>
        {topArtists.map((artist) => (
          <Grid item xs={12} sm={6} md={4} key={artist.id}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
