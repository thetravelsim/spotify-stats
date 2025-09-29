import React, { useState, useEffect } from 'react';
import MusicDataService from '../services/MusicDataService';

const ArtistImage = ({ artistName, spotifyId, localPhoto, alt, className }) => {
  const [imageUrl, setImageUrl] = useState(localPhoto || '/default-artist.png');

  useEffect(() => {
    const fetchArtistImage = async () => {
      let fetchedImageUrl = null;

      // 1. Try to get image from Viberate API (via MusicDataService.getArtistProfile)
      if (artistName) {
        try {
          const artistProfile = await MusicDataService.getArtistProfile(artistName);
          if (artistProfile && artistProfile.photo) {
            fetchedImageUrl = artistProfile.photo;
          }
        } catch (error) {
          console.error(`Error fetching Viberate image for ${artistName}:`, error);
        }
      }

      // 2. If no image from Viberate, try Spotify API
      if (!fetchedImageUrl && spotifyId) {
        try {
          const spotifyImageUrl = await MusicDataService.getArtistImageFromSpotify(spotifyId);
          if (spotifyImageUrl) {
            fetchedImageUrl = spotifyImageUrl;
          }
        } catch (error) {
          console.error(`Error fetching Spotify image for ${spotifyId}:`, error);
        }
      }

      // 3. Fallback to localPhoto or default if no image found
      setImageUrl(fetchedImageUrl || localPhoto || '/default-artist.png');
    };

    fetchArtistImage();
  }, [artistName, spotifyId, localPhoto]);

  return <img src={imageUrl} alt={alt} className={className} />;
};

export default ArtistImage;

