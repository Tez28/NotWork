async function editPostFormHandler(event) {
  event.preventDefault();

  // searches the posts array for requested id and pulls it for edit (update)
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // here is where the title and/or content is edited (updated)
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // PUT route is called for editing (updating)
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if everything goes well, user is returned to updated dashboard with updated post
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editPostFormHandler);