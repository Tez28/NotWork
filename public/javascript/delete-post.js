async function deletePostFormHandler(event) {
  event.preventDefault();

  // searches the 'posts' array for requested id and pulls it for deletion
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // GETs 'post' by specified id and deletes it
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  // if everything goes well, user is returned to updated dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deletePostFormHandler);