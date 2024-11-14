const openWeatherApiKey = '68f43e86bcd3445cf7d841540723b121';
const clientId = '851e5e26d6c5470793ccaaaec5839c05';
const clientSecret = 'c5d15cd1ba7f478e8140e3f34a38b73e';

async function fetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`);
                const data = await response.json();

                const weatherCondition = data.weather[0].main;
                // document.getElementById('weather-condition').textContent = weatherCondition;
                // document.getElementById('temperature').textContent = data.main.temp;
                // document.getElementById('location').textContent = data.name;

                // const mood = getMoodBasedOnWeather(weatherCondition);
                // setMood(mood);
                console.log(weatherCondition + data.main.temp + data.name);
                setBackgroundVideo(weatherCondition);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }, (error) => {
            console.error("Error getting location: ", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// async function setMood(mood) {
//     const token = await getSpotifyToken();
//     const weatherCondition = document.getElementById('weather-condition').textContent;

//     let playlistId = null;
//     if (mood && weatherCondition) {
//         if (mood === 'calm') {
//             playlistId = {
//                 Clear: '69pkbBraIGFlJOi21CEN80',
//                 Rain: '69pkbBraIGFlJOi21CEN80',
//                 Clouds: '4uKswQrI9K0wjO9zKj5Zmx',
//                 Snow: '0QhHK9Z1rwfA8mQB9atFgG'
//             }[weatherCondition];
//         } else if (mood === 'happy') {
//             playlistId = {
//                 Clear: '337i9dQZF1DWW5Jdaphc81Z',
//                 Rain: '5Oks9gIOQ6XKg9QOhMZgj2',
//                 Clouds: '2BpLcpGa1Qc4jBd4Mjw0db',
//                 Snow: '3wVdPrZNaqcDIdCPXavJgS'
//             }[weatherCondition];
//         } else if (mood === 'energetic') {
//             playlistId = {
//                 Clear: '0jbaEzUwLTOlIOp42B5pXV',
//                 Rain: '37i9dQZF1DX2pSTOxoPbx9',
//                 Clouds: '6gqbl1e15W0JfxtyWPJnVu',
//                 Snow: '37i9dQZF1DX0LctmTPNQ3v'
//             }[weatherCondition];
//         } else if (mood === 'melancholic') {
//             playlistId = {
//                 Clear: '0qKWsDcph1R6DBhBrTocQO',
//                 Rain: '6SdhABFA2ngvblTHHf7vV0',
//                 Clouds: '1eM5AviheXztswq4jn2Rc0',
//                 Snow: '37i9dQZF1DX88mTcSM3nFc'
//             }[weatherCondition];
//         }

//         if (playlistId) {
//             document.getElementById('music-recommendation').innerHTML = `
//                 <iframe src="https://open.spotify.com/embed/playlist/${playlistId}" 
//                         width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
//             `;
//         } else {
//             document.getElementById('music-recommendation').textContent = "No playlist available for this combination.";
//         }
//     } else {
//         console.log("Weather or mood data is missing.");
//     }
// }

// async function getSpotifyToken() {
//     try {
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credentials'
//         });
//         const data = await response.json();
//         return data.access_token;
//     } catch (error) {
//         console.error('Error getting Spotify token:', error);
//     }
// }


function setBackgroundVideo(weatherCondition) {
    const videoElement = document.getElementById('background-clip');
    const videoSrc = {
        Clear: 'videos/sunny.mp4',
        Rain: 'videos/rainy.mp4',
        Clouds: 'videos/cloudy.mp4',
        Snow: 'videos/snowy.mp4'
    }[weatherCondition];

    // Update the source
    videoElement.querySelector('source').src = videoSrc;
    
    // Reload the video to apply the new source
    videoElement.load();

    // For debugging, log the video source being applied
    console.log(`Video updated to: ${videoSrc}`);
}


const text = "A music suggesting app, based on the weather!";
let index = 0;

function type() {
  const subtitleElement = document.querySelector(".subtitle");
  
  if (index < text.length) {
    // Create a span for each character to apply fade-in effect
    const span = document.createElement("span");
    span.textContent = text.charAt(index);
    span.style.opacity = "0"; // Start with zero opacity
    subtitleElement.appendChild(span);

    // Animate the opacity to create a fade-in effect
    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transition = "opacity 0.3s";
    }, 50);

    index++;

    // Add a random typing delay to make it look more natural
    const speed = Math.random() * (150 - 50) + 50;
    setTimeout(type, speed);
  } else {
    // Remove the cursor after typing finishes
    subtitleElement.classList.remove("subtitle-cursor");
  }
}

// Add the class for the cursor
document.querySelector(".subtitle").classList.add("subtitle-cursor");

// Start the typing effect
type();


fetchWeather();
