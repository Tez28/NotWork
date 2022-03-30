async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // expecting username and password input
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if user's data is found, user is successfully logged in and prompted to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      let result = await response.json()
      alert(result.message);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);