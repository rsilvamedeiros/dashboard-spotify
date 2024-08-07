import { Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function ArtistCard({ artist }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={artist.images[0]?.url || '/spotify-logo.png'}
        alt={artist.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Followers: {artist.followers.total}
        </Typography>
      </CardContent>
    </Card>
  );
}
