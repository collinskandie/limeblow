// Check if the session token exists in localStorage
if (localStorage.getItem("token")) {
  // Session token exists, you can proceed with authenticated actions
  const sessionToken = localStorage.getItem("token");
  // console.log("Session token:", sessionToken);
  const authLink = document.getElementById("authLink");
  authLink.textContent = "Logout"; // Change the text to "Logout"
  authLink.href = "/logout"; // Update the href to the logout URL

  // Perform actions for authenticated users here
} else {
  // Session token doesn't exist, user is not authenticated
  console.log("User is not authenticated");
}
