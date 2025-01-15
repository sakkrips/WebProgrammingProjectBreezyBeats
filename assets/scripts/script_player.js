const openWeatherApiKey = "68f43e86bcd3445cf7d841540723b121";
const clientId = "851e5e26d6c5470793ccaaaec5839c05";
const clientSecret = "c5d15cd1ba7f478e8140e3f34a38b73e";

document.addEventListener("DOMContentLoaded", () => {
  const selectedMood = sessionStorage.getItem("selectedMood"); // Retrieve the mood
  if (selectedMood) {
    console.log("Mood:", selectedMood); // Log the mood in the console
    setMood(selectedMood); // Use the mood to set up the player
  } else {
    console.log("No mood selected.");
  }
  fetchWeather(); // Ensure weather data is fetched on page load
});

async function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`
          );
          const data = await response.json();

          const weatherCondition = data.weather[0].main;
          document.getElementById("weather-condition").textContent =
            weatherCondition;
          document.getElementById("temperature").textContent = data.main.temp;
          document.getElementById("location").textContent = data.name;

          const mood = sessionStorage.getItem("selectedMood") || "calm";
          setMood(mood);
          console.log(`Weather: ${weatherCondition}, Mood: ${mood}`);
          setBackgroundVideo(weatherCondition);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

// Function to update the selected mood
function updateMood(selectedMood) {
  sessionStorage.setItem("selectedMood", selectedMood);
  setMood(selectedMood);
}

// Async function to set mood with album art
async function setMood(mood) {
  const token = await getSpotifyToken();
  const weatherCondition =
    document.getElementById("weather-condition").textContent;
  let playlistId = null;
  if (mood && weatherCondition) {
    playlistId = getPlaylistId(mood, weatherCondition);

    let playlistId = null;
    if (mood && weatherCondition) {
        playlistId = getPlaylistId(mood, weatherCondition);
        
        if (playlistId) {
            const coverArt = await fetchPlaylistCoverArt(playlistId, token);
            displayCoverArt(coverArt);
            displaySpotifyPlayer(playlistId);
        } else {
            document.getElementById('music-recommendation').textContent = "No playlist available for this combination.";
        }
    } else {
        console.log("Weather or mood data is missing.");
    }
  }
}

// Function to map mood and weatherCondition to playlist ID
function getPlaylistId(mood, weatherCondition) {
  const playlistMapping = {
    calm: {
      Clear: "37i9dQZF1DX2UXfvEIZvDK",
      Rain: "1wc5GFONKFEpJLodgyM8a0",
      Clouds: "18WMgoaQ11jS4Cq0CEBvvk",
      Snow: "5D7svtY9K7VXoNCbH83LBl",
    },
    happy: {
      Clear: "7GhawGpb43Ctkq3PRP1fOL",
      Rain: "0jF83TW4Zv7ZyBZ50jBcOS",
      Clouds: "3IpkBDRIIToMBuL3BxL7Tu",
      Snow: "0o6obtchqqS04OWEG5g0SP",
    },
    angry: {
      Clear: "37i9dQZF1EIgNZCaOGb0Mi",
      Rain: "4A1nJnRyiDCdh3iMf8gzZf",
      Clouds: "6gqbl1e15W0JfxtyWPJnVu",
      Snow: "2RCAeT4ovN3O1yDeAWZl1b",
    },
    melancholy: {
      Clear: "4ZbcfdnWOjn8FQk4mvsyb0",
      Rain: "1aLrekwC72iuF5d5nePJkv",
      Clouds: "2GXv4UaSiTAQPi6ohv3JaJ",
      Snow: "7IbQ24sEbyE7E5cjbkXQB5",
    },
  };

    return playlistMapping[mood]?.[weatherCondition] || null;
}

// Function to fetch album cover art for the first track in the playlist
async function fetchPlaylistCoverArt(playlistId, token) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.items[0]?.track?.album?.images[0]?.url; // URL of the first track's album art
    } catch (error) {
        console.error('Error fetching playlist cover art:', error);
    }
}

// Function to display album cover art in HTML
function displayCoverArt(coverArtUrl) {
    if (coverArtUrl) {
        document.getElementById('album-cover').innerHTML = `<img src="${coverArtUrl}" alt="Album Cover"">`;
    } else {
        document.getElementById('album-cover').textContent = "No album cover available.";
    }
}

// Function to display the Spotify player for the playlist
function displaySpotifyPlayer(playlistId) {
    document.getElementById('music-recommendation').innerHTML = `
        <iframe src="https://open.spotify.com/embed/playlist/${playlistId}?view=0" 
                width="1000" height="80" frameborder="0" allowtransparency="false" allow="encrypted-media"></iframe>
    `;
}


// Async function to get Spotify token
async function getSpotifyToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify token:', error);
    }
}

// Function to update the background video
function setBackgroundVideo(weatherCondition) {
  const videoElement = document.getElementById("background-clip");

  const videoSrc = {
    Clear:
      "https://videos.pexels.com/video-files/29271025/12626141_2560_1440_25fps.mp4",
    Rain: "https://videos.pexels.com/video-files/6065020/6065020-hd_1920_1080_24fps.mp4",
    Clouds:
      "https://videos.pexels.com/video-files/6185565/6185565-uhd_2560_1440_25fps.mp4",
    Snow: "https://videos.pexels.com/video-files/14034808/14034808-hd_1080_1920_24fps.mp4",
  }[weatherCondition];

  if (videoElement.src !== videoSrc) {
    videoElement.src = videoSrc;
    videoElement.load();
  }
  console.log(`Video updated to: ${videoSrc}`);
}
