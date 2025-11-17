// Cognito Config 
const cognitoDomain = "https://ap-south-1fvvlxxice.auth.ap-south-1.amazoncognito.com";
const clientId = "6qkh51q7pgpmo1jj3icemn3p6g";
const redirectUri = "https://khareedo-mg1r.vercel.app/index.html";
const logoutRedirectUri = "https://khareedo-mg1r.vercel.app/index.html";

// Login URL 
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

  loginBtn.onclick = () => window.location.href = loginUrl;

  logoutBtn.onclick = () => {
    localStorage.clear();
    window.location.href = logoutUrl;
  };

  handleRedirect();
  updateUI();
});

// Handle Redirect 
function handleRedirect() {
  const hash = window.location.hash;

  if (!hash.includes("id_token")) return;

  const params = new URLSearchParams(hash.substring(1)); // remove '#'

  const idToken = params.get("id_token");
  const accessToken = params.get("access_token");

  if (idToken) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("access_token", accessToken);

    window.location.hash = ""; // clean URL
  }

  updateUI();
}

// Protect Cart Icon Globally
function protectCartIcon() {
  const cartLink = document.getElementById("cartLink");
  if (!cartLink) return;

  cartLink.onclick = () => {
    const idToken = localStorage.getItem("id_token");

    if (!idToken) {
      alert("You must be logged in to view your cart.");
      window.location.href = loginUrl;
    } else {
      window.location.href = "cart.html";
    }
  };
}

// Protect Add-to-Cart Buttons
function protectAddToCartButtons() {
  const idToken = localStorage.getItem("id_token");
  const buttons = document.querySelectorAll(".addToCartBtn");

  buttons.forEach(btn => {
    btn.onclick = () => {
      if (!idToken) {
        alert("Please log in to add items to the cart.");
        window.location.href = loginUrl;
        return;
      }

      const id = btn.dataset.id;
      addToCartFromCard(id);
    };
  });
}

// FINAL updateUI()
function updateUI() {
  const idToken = localStorage.getItem("id_token");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userDisplay = document.getElementById("userDisplay");

  if (idToken) {
    console.log("User Logged In");

    loginBtn.style.setProperty("display", "none", "important");
    logoutBtn.style.setProperty("display", "inline-block", "important");
    userDisplay.textContent = "Logged In";

  } else {
    console.log("User Not Logged In");

    loginBtn.style.setProperty("display", "inline-block", "important");
    logoutBtn.style.setProperty("display", "none", "important");
    userDisplay.textContent = "";
  }
  protectCartIcon();
  protectAddToCartButtons();
}
