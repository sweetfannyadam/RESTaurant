export const initNewsletter = () => {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.querySelector("input[type=email]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email || !validateEmail(email)) {
      Swal.fire({
        title: "Invalid email",
        text: "Please enter a valid email address.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

    form.reset();
    Swal.fire({
      title: "Thank you for subscribing to our newsletter!",
      text: "We will keep you updated with the latest news and offers.",
      icon: "success",
      showConfirmButton: false,
      timer: 2500,
    });
  });
};

// Simple email validation function
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
