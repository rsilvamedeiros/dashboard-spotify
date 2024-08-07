import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
