const token = "503bf5006708dc769617c571f07206858ef8c018";
const button = document.querySelector("#shorten");
const input = document.querySelector("#input-field");
const longUrl = document.querySelector("#input-url");
const shortUrl = document.querySelector("#new-url");
const resultDiv = document.querySelector("#output-div");
const errorDiv = document.querySelector("#error-div");
const errorMessage = document.querySelector("#error-text");
const redirectButton = document.querySelector("#redirect-btn");

/* button action */
button.addEventListener("click", (event) => {
  event.preventDefault();
  if (input.value) {
    shorten(input.value);
  } else {
    showError();
    hideResult();
  }
});

/* Redirect button action */
redirectButton.addEventListener("click", () => {
  const url = shortUrl.innerHTML;
  if (url) {
    window.open(url, "_blank");
  } else {
    // Handle error if short URL is not available
    console.error("Short URL is not available.");
  }
});

/* function to handle errors */
const handleError = (response) => {
  console.log(response);
  if (!response.ok) {
    errorMessage.textContent = "Please enter a valid URL.";
    showError();
    hideResult();
  } else {
    hideError();
    return response;
  }
};

/* function to get shortened url with input "url" with fetch and deal with error */
const shorten = (input) => {
  fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ long_url: input, domain: "bit.ly" }),
  })
    .then((response) => response.json())
    .then((json) => {
      shortUrl.innerHTML = json.link;
      showResult();
    })
    .catch((error) => {
      console.log(error);
    });
};

/* display/hide results and errors */
const showResult = () => {
  shortUrl.style.display = "flex";
};

const hideResult = () => {
  shortUrl.style.display = "none";
};

const showError = () => {
  errorDiv.style.display = "block";
};

const hideError = () => {
  errorDiv.style.display = "none";
};
