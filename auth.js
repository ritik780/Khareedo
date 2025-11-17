// Cognito Config
const cognitoDomain = "https://ap-south-1fvvlxxice.auth.ap-south-1.amazoncognito.com";
const clientId = "6qkh51q7pgpmo1jj3icemn3p6g";
const redirectUri = "https://khareedo-mg1r.vercel.app/index.html";
const logoutRedirectUri = "https://khareedo-mg1r.vercel.app/index.html";

// Login URL (Hosted UI)
const loginUrl =
  `${cognitoDomain}/oauth2/authorize?client_id=${clientId}` +
  `&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;

// Logout URL
const logoutUrl =
  `${cognitoDomain}/logout?client_id=${clientId}` +
  `&logout_uri=${logoutRedirectUri}`;

// Button Events
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginBtn) loginBtn.onclick = () => window.location.href = loginUrl;
  if (logoutBtn) logoutBtn.onclick = () => {
    localStorage.clear();
    window.location.href = logoutUrl;
  };

  handleRedirect();
  updateUI();
});
// Handle Redirect 
async function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (!code) return;
  const tokenUrl = `${cognitoDomain}/oauth2/token`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  const data = await res.json();

  if (data.id_token) {
    localStorage.setItem("id_token", data.id_token);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  }

  // const cleanUrl = window.location.origin + window.location.pathname;
  // window.history.replaceState({}, document.title, cleanUrl);

  updateUI();
}
// Update Navbar UI
function updateUI() {
  const idToken = localStorage.getItem("id_token");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userDisplay = document.getElementById("userDisplay");

  if (idToken) {
    // User is logged in
    loginBtn?.style.setProperty("display", "none", "important");
    logoutBtn?.style.setProperty("display", "inline-block", "important");
    if (userDisplay) userDisplay.textContent = "Logged In";
  } else {
    // User is logged out
    loginBtn?.style.setProperty("display", "inline-block", "important");
    logoutBtn?.style.setProperty("display", "none", "important");
    if (userDisplay) userDisplay.textContent = "";
  }
}
