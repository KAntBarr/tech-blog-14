document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.getElementById('createPostButton');
  const createPostModal = new bootstrap.Modal(document.getElementById('createPostModal'));
  const createPostButtonModal = document.getElementById('createPostButtonModal');
  const deleteButtons = document.querySelectorAll('.deletePostButton');

  const createPostButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    console.log('createPostForm hit');

    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    const createdOn = Date.now();
    const user_id = document.getElementById('postInfoStore').dataset.userid;

    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          createdOn,
          user_id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      createPostModal.hide();

      if (response.ok) {
        // console.log('post was created');
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/`);
      } else {
        console.error('Failed to create post', response.status, response.statusText);
        alert('Failed to create post');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle unexpected errors
    }
  };

  const deletePostHandler = async (postid) => {

    try {
      const response = await fetch(`/api/posts/${postid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload the page or update the UI as needed
        document.location.replace(`/`);
        console.log(`Post ${postid} deleted`);
      } else {
        console.error(`Failed to delete post ${postid}`, response.status, response.statusText);
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (deleteButtons) {
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const postid = button.dataset.postid;
        // console.log('attempting to delete', postid);
        if (postid) {
          // Confirm deletion if needed
          const confirmDeletion = confirm('Are you sure you want to delete this post?');
          if (confirmDeletion) {
            await deletePostHandler(postid);
          }
        }
      });
    });
  }

  if (createPostButton) {
    createPostButton.addEventListener('click', () => {
      createPostModal.show();
    });
  }

  if (createPostButtonModal) {
    createPostButtonModal.addEventListener('click', createPostButtonModalHandler);
  }

  document.getElementById('postContent').addEventListener('input', function () {
    const maxChars = 1000; // Set your desired characters limit
    const charCount = this.value.length;

    if (charCount > maxChars) {
      // Slice the text to the maximum allowed characterss
      this.value = this.value.slice(0, maxChars);
    }
  });

  document.getElementById('postTitle').addEventListener('input', function () {
    const maxChars = 40; // Set your desired characters limit
    const charCount = this.value.length;

    if (charCount > maxChars) {
      // Slice the text to the maximum allowed characterss
      this.value = this.value.slice(0, maxChars);
    }
  });

});