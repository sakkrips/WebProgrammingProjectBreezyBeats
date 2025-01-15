const openWeatherApiKey = "68f43e86bcd3445cf7d841540723b121";
const clientId = "851e5e26d6c5470793ccaaaec5839c05";
const clientSecret = "c5d15cd1ba7f478e8140e3f34a38b73e";



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
            document.getElementById('weather-condition').textContent = weatherCondition;
            document.getElementById('temperature').textContent = data.main.temp;
            document.getElementById('location').textContent = data.name;
  //*******************dWE NEED TO AKE THIS LINK TO THE MOOD PAGE
            const mood = "calm"; 
            setMood(mood);
            console.log(weatherCondition + data.main.temp + data.name);
            setBackgroundVideo(weatherCondition);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

// async function to set mood with album art
async function setMood(mood) {
    console.log("Mood:", mood);
    const token = await getSpotifyToken();
    const weatherCondition = document.getElementById('weather-condition').textContent;

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

// Function to map mood and weatherCondition to playlist ID
function getPlaylistId(mood, weatherCondition) {
    const playlistMapping = {
        calm: {
            Clear: '69pkbBraIGFlJOi21CEN80',
            Rain: '69pkbBraIGFlJOi21CEN80',
            Clouds: '4uKswQrI9K0wjO9zKj5Zmx',
            Snow: '0QhHK9Z1rwfA8mQB9atFgG'
        },
        happy: {
            Clear: '337i9dQZF1DWW5Jdaphc81Z',
            Rain: '5Oks9gIOQ6XKg9QOhMZgj2',
            Clouds: '2BpLcpGa1Qc4jBd4Mjw0db',
            Snow: '3wVdPrZNaqcDIdCPXavJgS'
        },
        energetic: {
            Clear: '0jbaEzUwLTOlIOp42B5pXV',
            Rain: '37i9dQZF1DX2pSTOxoPbx9',
            Clouds: '6gqbl1e15W0JfxtyWPJnVu',
            Snow: '37i9dQZF1DX0LctmTPNQ3v'
        },
        melancholic: {
            Clear: '0qKWsDcph1R6DBhBrTocQO',
            Rain: '6SdhABFA2ngvblTHHf7vV0',
            Clouds: '1eM5AviheXztswq4jn2Rc0',
            Snow: '37i9dQZF1DX88mTcSM3nFc'
        }
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
function setBackgroundVideo(weatherCondition) {
    const videoElement = document.getElementById("background-clip");
  
    const videoSrc = {
      Clear: "https://videos.pexels.com/video-files/29271025/12626141_2560_1440_25fps.mp4",
      Rain: "https://videos.pexels.com/video-files/6065020/6065020-hd_1920_1080_24fps.mp4",
      Clouds: "https://videos.pexels.com/video-files/6185565/6185565-uhd_2560_1440_25fps.mp4",
      Snow: "https://videos.pexels.com/video-files/14034808/14034808-hd_1080_1920_24fps.mp4",
    }[weatherCondition];
  
    // Check if the src is different to avoid unnecessary reloads
    if (videoElement.src !== videoSrc) {
      videoElement.src = videoSrc;
  
      // Reload the video to apply the new source
      videoElement.load();
    }
  
    // Log the video source for debugging
    console.log(`Video updated to: ${videoSrc}`);
  }
fetchWeather();





// Select the necessary elements
const profileButton = document.querySelector('.user-status a:nth-child(2)'); // Assuming the second link is the profile button
const popup = document.getElementById('profile-popup');
const closePopupButton = document.getElementById('close-popup');

// Function to show the popup
profileButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent any default link behavior
  popup.classList.remove('hidden'); // Remove the 'hidden' class to show the popup
});

// Function to close the popup
closePopupButton.addEventListener('click', () => {
  popup.classList.add('hidden'); // Add the 'hidden' class to hide the popup
});

// Optional: Close the popup when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.add('hidden');
  }
});

  