document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.getElementById('createPostButton');
  const createPostModal = new bootstrap.Modal(document.getElementById('createPostModal'));
  const createPostButtonModal = document.getElementById('createPostButtonModal');
  const deleteButtons = document.querySelectorAll('.deletePostButton');

  const createPostButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    console.log('createPostForm hit');

    const post_title = document.getElementById('postTitle').value.trim();
    const post_content = document.getElementById('postContent').value.trim();
    const created_on = Date.now();
    const user_id = document.getElementById('postInfoStore').dataset.userid;

    try {
      if (post_title.length < 3 || post_content < 10) {
        throw new Error(`${post_title < 3 ? 'Title' : 'Content'} is not long enough.`)
      }
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          post_title,
          post_content,
          created_on,
          user_id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        createPostModal.hide();
        // console.log('post was created');
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/dashboard`);
      } else {
        throw new Error(response.statusText);
        // console.error('Failed to create post', response.status, response.statusText);
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post\n' + error);
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
        // console.log(`Post ${postid} deleted`);
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