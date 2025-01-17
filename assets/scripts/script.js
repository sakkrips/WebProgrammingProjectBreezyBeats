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
  const infoPopup = document.getElementById("infoPopup");
  const openInfoPopup = document.querySelector(".info-icon a");
  const closeInfoPopup = document.getElementById("closeInfoPopup");

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
  // Function to show the custom alert
  function showCustomAlert(message, callback) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    const closeAlertButton = document.getElementById("closeAlert");

    // Set the alert message
    alertMessage.textContent = message;

    // Show the alert
    customAlert.style.display = "block";

    // Ensure the button only closes once (remove previous listeners)
    closeAlertButton.onclick = () => {
      customAlert.style.display = "none"; // Hide the alert
      if (callback) callback(); // Execute the callback if provided
    };
  }

  // Handle the Sign-In form submission
  const signInForm = document.getElementById("sign-in");

  // Dummy user data for validation
  const testLogin = {
    email: "aggelos@example.com",
    password: "123456",
  };

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get user input
    const username = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value;

    // Validate the credentials
    if (username === testLogin.email && password === testLogin.password) {
      // Show a success alert
      showCustomAlert("Login successful!", () => {
        // Redirect to another page after closing the alert
        window.location.href = "mood.html";
      });
    } else {
      // Show a failure alert
      showCustomAlert("Invalid email or password. Please try again.");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  function setupVolumeToggle(volumeIconId, audioElementId) {
    const volumeIcon = document.getElementById(volumeIconId);
    const audioElement = document.getElementById(audioElementId);

    console.log("Volume Icon:", volumeIcon);
    console.log("Audio Element:", audioElement);

    if (!volumeIcon || !audioElement) {
      console.error("Required elements are missing.");
      return;
    }

    let isMuted = false;

    volumeIcon.addEventListener("click", () => {
      isMuted = !isMuted;
      audioElement.muted = isMuted;

      if (isMuted) {
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.add("fa-volume-xmark");
      } else {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.add("fa-volume-high");
      }
    });
  }

  setupVolumeToggle("volume-icon", "audio-element");
});

document
  .getElementById("sign-up-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username-up").value;
    const email = document.getElementById("email-up").value;
    const password = document.getElementById("password-up").value;

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully!");
        console.log("Registered user:", data);
      } else {
        const error = await response.text();
        alert(`Registration failed: ${error}`);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("Login form not found in the DOM!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Collect user input
    const username = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Validate input
    if (!username || !password) {
      alert("Both fields are required!");
      return;
    }

    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful login
        alert("Login successful!");
        window.location.href = "mood.html"; // Redirect to the dashboard or home page
      } else {
        // Login failed
        const error = await response.text();
        alert(`Login failed: ${error}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred while logging in. Please try again later.");
    }
  });
});

// Cookies

document.addEventListener("DOMContentLoaded", () => {
  // Check if user has already made a choice
  if (!getCookie("cookiesAccepted") && !getCookie("cookiesDeclined")) {
    document.getElementById("cookieConsent").style.display = "block";
  }

  // Handle Accept Button
  document.getElementById("acceptCookies").addEventListener("click", () => {
    setCookie("cookiesAccepted", "true", 365); // Save consent for 1 year
    document.getElementById("cookieConsent").style.display = "none";
  });

  // Handle Decline Button
  document.getElementById("declineCookies").addEventListener("click", () => {
    setCookie("cookiesDeclined", "true", 365); // Save decline choice for 1 year
    document.getElementById("cookieConsent").style.display = "none";
    alert("You have declined cookies. Certain features may be disabled.");
  });
});

// Utility functions for cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Aggelos: Front End + Cookies js + PopUp js
// Grigoris: Mood js file + A part of the script js
// Loukas: Database + Player
// Sifis: A part of the script js
