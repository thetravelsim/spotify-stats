import axios from 'axios';

class SpotifyAPIProvider {
  constructor() {
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiry = 0;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
          },
        }
      );
      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000 - 60000; // Refresh 1 minute before expiry
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      return null;
    }
  }

  async getArtistImage(spotifyId) {
    if (!spotifyId) return null;

    const accessToken = await this.getAccessToken();
    if (!accessToken) return null;

    try {
      const response = await axios.get(`https://api.spotify.com/v1/artists/${spotifyId}`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      );
      if (response.data.images && response.data.images.length > 0) {
        // Return the largest image available
        return response.data.images[0].url;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching Spotify artist image for ID ${spotifyId}:`, error);
      return null;
    }
  }
}

export default new SpotifyAPIProvider();

