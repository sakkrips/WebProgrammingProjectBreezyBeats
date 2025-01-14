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
          // document.getElementById('weather-condition').textContent = weatherCondition;
          // document.getElementById('temperature').textContent = data.main.temp;
          // document.getElementById('location').textContent = data.name;

          // const mood = getMoodBasedOnWeather(weatherCondition);
          // setMood(mood);
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
  const videoElement = document.getElementById("background-clip");

  const videoSrc = {
    Clear:
      "https://videos.pexels.com/video-files/29271025/12626141_2560_1440_25fps.mp4",
    Rain: "https://videos.pexels.com/video-files/6065020/6065020-hd_1920_1080_24fps.mp4",
    Clouds:
      "https://videos.pexels.com/video-files/6185565/6185565-uhd_2560_1440_25fps.mp4",
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

const text = "Listen to the music, the weather whispers!";
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

// Popup Login

document.getElementById("openPopup").addEventListener("click", function () {
  document.getElementById("popup").classList.add("show");
});

document.querySelector(".close-popup").addEventListener("click", function () {
  document.getElementById("popup").classList.remove("show");
});

/*========*/

// Popup Info

document.addEventListener("DOMContentLoaded", () => {
  const infoPopup = document.getElementById("popup-info-open");
  const openInfoPopup = document.querySelector(".info-icon a");
  const closeInfoPopup = document.getElementById("popup-info-open");

  // Open the Info Popup
  openInfoPopup.addEventListener("click", (e) => {
    e.preventDefault();
    infoPopup.classList.add("show");
  });

  // Close the Info Popup
  closeInfoPopup.addEventListener("click", () => {
    infoPopup.classList.remove("show");
  });
});

/*========*/

// Login / Signup button effects

const container = document.getElementById("container_main");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

/*========*/

// Login Phase

document.addEventListener("DOMContentLoaded", () => {
  const signIn = document.getElementById("sign-in");

  // Dummy user data for validation
  const testLogin = {
    email: "aggelos@example.com",
    password: "123456",
  };

  // Handle Sign In Form Submission
  signIn.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get input values
    const email = document.getElementById("email-in").value.trim();
    const password = document.getElementById("password-in").value;

    // Validate input
    if (email === testLogin.email && password === testLogin.password) {
      showCustomAlert("Login successful!", () => {
        setTimeout(() => {
          window.location.href = "mood.html"; // Redirect after a delay
        }, 2000); // Delay for 2 seconds (2000ms)
      });
    } else {
      showCustomAlert("Invalid email or password. Please try again.");
    }
  });
});

/*========*/

// Function to show the custom alert
function showCustomAlert(message, callback) {
  const customAlert = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");

  alertMessage.textContent = message; // Set the alert message
  customAlert.style.display = "block"; // Show the alert

  // Close button functionality
  document.getElementById("closeAlert").addEventListener("click", () => {
    customAlert.style.display = "none"; // Hide the alert
    if (callback) callback(); // Execute the callback if provided
  });
}
