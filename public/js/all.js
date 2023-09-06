function logout() {
  localStorage.removeItem("sessionToken");
  window.location.href = "/login";
}

if (localStorage.getItem("token")) {
  // Session token exists, user is authenticated
  const authLink = document.getElementById("authLink");
  authLink.textContent = "Logout"; // Change the text to "Logout"
  authLink.href = "javascript:void(0);"; // Set href to JavaScript void to prevent navigation
 console.log(localStorage.getItem("token"));
  // Show the "Logout" button and add a click event listener to it
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.style.display = "block";
  logoutButton.addEventListener("click", logout);
} else {
  // Session token doesn't exist, user is not authenticated
  console.log("User is not authenticated");
  // No need to change the link, it remains as "Login"
}
