// ---------------------------
// Cognito Config
// ---------------------------
const cognitoDomain = "https://ap-south-1fvvlxxice.auth.ap-south-1.amazoncognito.com";
const clientId = "6qkh51q7pgpmo1jj3icemn3p6g";
const redirectUri = "https://khareedo-mg1r.vercel.app/index.html";
const logoutRedirectUri = "https://khareedo-mg1r.vercel.app/index.html";

// Login URL (Hosted UI)
const loginUrl =
  `${cognitoDomain}/login?client_id=${clientId}` +
  `&response_type=token&scope=openid+email+profile&redirect_uri=${redirectUri}`;

// Logout URL
const logoutUrl =
  `${cognitoDomain}/logout?client_id=${clientId}` +
  `&logout_uri=${logoutRedirectUri}`;
// Button Events
document.addEventListener("DOMContentLoaded", () => {
  console.log("Auth JS Loaded");

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Login click → Go to Hosted UI
  loginBtn.onclick = () => window.location.href = loginUrl;

  // Logout click → Clear session + Go to Cognito Logout
  logoutBtn.onclick = () => {
    localStorage.clear();
    window.location.href = logoutUrl;
  };

  handleRedirect();
  updateUI();
});

// Handle Redirect (Auth Code Flow)
function handleRedirect() {
  const hash = window.location.hash; // URL fragment with tokens

  if (!hash.includes("id_token")) return;

  const params = new URLSearchParams(hash.replace("#", ""));

  const idToken = params.get("id_token");
  const accessToken = params.get("access_token");

  if (idToken) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("access_token", accessToken);

    // Remove tokens from URL
    window.location.hash = "";
  }

  updateUI();
}


  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  const data = await res.json();
  console.log("Token Response:", data);

  // If token exchange fails, do nothing
  if (!data.id_token) {
    console.warn("Token not received");
    return;
  }

  // Save tokens
  localStorage.setItem("id_token", data.id_token);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  // Remove ?code from the URL
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);

  updateUI();
}

// ---------------------------
// Update Navbar UI (Hide Login / Show Logout)
// ---------------------------
function updateUI() {
  const idToken = localStorage.getItem("id_token");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userDisplay = document.getElementById("userDisplay");

  if (idToken) {
    console.log("User Logged In");

    // Hide LOGIN
    loginBtn.style.setProperty("display", "none", "important");

    // Show LOGOUT
    logoutBtn.style.setProperty("display", "inline-block", "important");

    userDisplay.textContent = "Logged In";

  } else {
    console.log("User Not Logged In");

    // Show LOGIN
    loginBtn.style.setProperty("display", "inline-block", "important");

    // Hide LOGOUT
    logoutBtn.style.setProperty("display", "none", "important");

    userDisplay.textContent = "";
  }
}
