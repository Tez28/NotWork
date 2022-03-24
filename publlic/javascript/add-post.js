async function addPostFormHandler(event) {
  event.preventDefault();

  // access the title and content fields and retreives user's input
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('input[name="post-text"]').value;

  // calls the 'posts' route and POSTs those values
  const response = await fetch('api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if everything goes as planned, the post is added, and user is returned to updated dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPostFormHandler);