// commonFooter.js

// Function to load and insert the footer
function loadFooter() {
    // Specify the ID of the div where the footer will be inserted
    const footerContainer = document.getElementById("footer-container");

    // Use the Fetch API to load the footer content from "footer.html"
    fetch("/path/to/footer.html")
        .then(response => response.text())
        .then(footerContent => {
            // Insert the footer content into the specified div
            footerContainer.innerHTML = footerContent;
        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });
}

// Call the function to load and insert the footer when the page loads
window.addEventListener("load", loadFooter);
