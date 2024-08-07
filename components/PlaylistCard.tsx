import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function PlaylistCard({ playlist }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={playlist.images[0]?.url || '/spotify-logo.png'}
        alt={playlist.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {playlist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {playlist.tracks.total} tracks
        </Typography>
      </CardContent>
    </Card>
  );
}
