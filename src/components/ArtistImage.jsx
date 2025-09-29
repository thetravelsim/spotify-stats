import React, { useState, useEffect } from 'react';
import MusicDataService from '../services/MusicDataService';

const ArtistImage = ({ spotifyId, localPhoto, alt, className }) => {
  const [imageUrl, setImageUrl] = useState(localPhoto);

  useEffect(() => {
    const fetchSpotifyImage = async () => {
      if (spotifyId) {
        try {
          const spotifyImageUrl = await MusicDataService.getArtistImageFromSpotify(spotifyId);
          if (spotifyImageUrl) {
            setImageUrl(spotifyImageUrl);
          } else {
            setImageUrl(localPhoto || '/default-artist.png');
          }
        } catch (error) {
          console.error('Error fetching Spotify image:', error);
          setImageUrl(localPhoto || '/default-artist.png');
        }
      } else {
        setImageUrl(localPhoto || '/default-artist.png');
      }
    };

    fetchSpotifyImage();
  }, [spotifyId, localPhoto]);

  return <img src={imageUrl} alt={alt} className={className} />;
};

export default ArtistImage;

