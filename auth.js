// ---------------------------
// Cognito Config (MUMBAI REGION - PRODUCTION)
// ---------------------------
const cognitoDomain = "https://ap-south-1fvvlxxice.auth.ap-south-1.amazoncognito.com";
const clientId = "6qkh51q7pgpmo1jj3icemn3p6g";

// IMPORTANT: Cognito does NOT accept file paths like /index.html
// So always use the root domain
const redirectUri = "https://khareedo-mg1r.vercel.app/";
const logoutRedirectUri = "https://khareedo-mg1r.vercel.app/";

// Login URL (Hosted UI)
const loginUrl =
  `${cognitoDomain}/oauth2/authorize?client_id=${clientId}` +
  `&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;

// Logout URL
const logoutUrl =
  `${cognitoDomain}/logout?client_id=${clientId}` +
  `&logout_uri=${logoutRedirectUri}`;

// ---------------------------
// Button Events
// ---------------------------
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

// --------------------------------
// Handle Redirect (Auth Code Flow)
// --------------------------------
async function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (!code) return;

  // Exchange code for tokens
  const tokenUrl = `${cognitoDomain}/oauth2/token`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    code: code,
    redirect_uri: redirectUri
  });

  const res = await fetch(tokenUrl, {
    metho
