import VibrateAPIProvider from "./src/services/providers/VibrateAPIProvider.js";

const provider = new VibrateAPIProvider();

async function testViberateAPI() {
  try {
    // Test health status
    console.log("\n--- Testing Viberate API Health Status ---");
    const healthStatus = await provider.getHealthStatus();
    console.log("Health Status:", healthStatus);

    if (healthStatus.status === "healthy" || healthStatus.status === "UNDER_LIMIT") {
      console.log("Viberate API is healthy. Proceeding with artist search and profile.");

      // Test for Drake (well-known artist)
      console.log("\n--- Testing getArtistProfile for Drake ---");
      try {
        const drakeProfile = await provider.getArtistProfile("Drake");
        console.log("Drake Profile:", JSON.stringify(drakeProfile, null, 2));
        if (drakeProfile.monthlyListeners && drakeProfile.spotifyId) {
          console.log(`Drake\'s Monthly Listeners: ${drakeProfile.monthlyListeners}`);
          console.log(`Drake\'s Spotify ID: ${drakeProfile.spotifyId}`);
        } else {
          console.warn("Drake\'s monthly listeners or Spotify ID not found.");
        }
      } catch (error) {
        console.error("Error fetching Drake\'s profile:", error.message);
      }

      // Test for Mozzik (Albanian artist)
      console.log("\n--- Testing getArtistProfile for Mozzik ---");
      try {
        const mozzikProfile = await provider.getArtistProfile("Mozzik");
        console.log("Mozzik Profile:", JSON.stringify(mozzikProfile, null, 2));
        if (mozzikProfile.monthlyListeners && mozzikProfile.spotifyId) {
          console.log(`Mozzik\'s Monthly Listeners: ${mozzikProfile.monthlyListeners}`);
          console.log(`Mozzik\'s Spotify ID: ${mozzikProfile.spotifyId}`);
        } else {
          console.warn("Mozzik\'s monthly listeners or Spotify ID not found.");
        }
      } catch (error) {
        console.error("Error fetching Mozzik\'s profile:", error.message);
      }

      // Test for Gjiko (Albanian artist)
      console.log("\n--- Testing getArtistProfile for Gjiko ---");
      try {
        const gjikoProfile = await provider.getArtistProfile("Gjiko");
        console.log("Gjiko Profile:", JSON.stringify(gjikoProfile, null, 2));
        if (gjikoProfile.monthlyListeners && gjikoProfile.spotifyId) {
          console.log(`Gjiko\'s Monthly Listeners: ${gjikoProfile.monthlyListeners}`);
          console.log(`Gjiko\'s Spotify ID: ${gjikoProfile.spotifyId}`);
        } else {
          console.warn("Gjiko\'s monthly listeners or Spotify ID not found.");
        }
      } catch (error) {
        console.error("Error fetching Gjiko\'s profile:", error.message);
      }

      // Test for Butrint Imeri (Albanian artist)
      console.log("\n--- Testing getArtistProfile for Butrint Imeri ---");
      try {
        const butrintImeriProfile = await provider.getArtistProfile("Butrint Imeri");
        console.log("Butrint Imeri Profile:", JSON.stringify(butrintImeriProfile, null, 2));
        if (butrintImeriProfile.monthlyListeners && butrintImeriProfile.spotifyId) {
          console.log(`Butrint Imeri\'s Monthly Listeners: ${butrintImeriProfile.monthlyListeners}`);
          console.log(`Butrint Imeri\'s Spotify ID: ${butrintImeriProfile.spotifyId}`);
        } else {
          console.warn("Butrint Imeri\'s monthly listeners or Spotify ID not found.");
        }
      } catch (error) {
        console.error("Error fetching Butrint Imeri\'s profile:", error.message);
      }

    } else {
      console.error("Viberate API is not healthy. Aborting further tests.");
    }
  } catch (error) {
    console.error("An unexpected error occurred during API testing:", error);
  }
}

testViberateAPI();

