async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if logout successful, return to login page
  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#logout')
  .addEventListener('click', logout);