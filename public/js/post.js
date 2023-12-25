document.addEventListener('DOMContentLoaded', () => {
  const createCommentButton = document.getElementById('addCommentButton');
  const createCommentModal = new bootstrap.Modal(document.getElementById('createCommentModal'));
  const createCommentButtonModal = document.getElementById('createCommentButtonModal');
  const updatePostButton = document.getElementById('updatePostButton');
  const updatePostModal = new bootstrap.Modal(document.getElementById('updatePostModal'));
  const updatePostButtonModal = document.getElementById('updatePostButtonModal');
  const deletePostButton = document.querySelectorAll('.deletePostButton');
  const deleteCommentButtons = document.querySelectorAll('.deleteCommentButton');


  const createCommentButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    // console.log('createCommentForm hit');

    const commentContent = document.getElementById('commentContent').value.trim();
    const createdOn = Date.now();
    const postid = document.getElementById('postInfoStore').dataset.postid;
    const username = document.getElementById('createCommentModalLabel').dataset.username;

    try {
      if (commentContent.length < 1) {
        throw new Error(`Comment can't be empty.`)
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          content: commentContent,
          created_on: createdOn,
          username: username,
          post_id: postid,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        createCommentModal.hide();
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/api/posts/${postid}`);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment\n' + error);
      // Handle unexpected errors
    }
  };


  const deleteCommentHandler = async (commentId) => {

    const postid = document.getElementById('postInfoStore').dataset.postid;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // console.log(`Comment ${commentId} deleted`);
        // Reload the page or update the UI as needed
        document.location.replace(`/api/posts/${postid}`);
      } else {
        // console.error(`Failed to delete comment ${commentId}`, response.status, response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment\n' + error);
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
      } else {
        // console.error(`Failed to delete post ${postid}`, response.status, response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post\n' + error);
    }
  };


  const updatePostButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    const post_title = document.getElementById('postTitle').value.trim();
    const post_content = document.getElementById('postContent').value.trim();
    const user_id = document.getElementById('postInfoStore').dataset.userid;
    const postid = document.getElementById('postInfoStore').dataset.postid;

    try {
      const response = await fetch(`/api/posts/${postid}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_title,
          post_content,
          user_id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        updatePostModal.hide();
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/api/posts/${postid}`);
      } else {
        throw new Error(response.statusText);
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post\n' + error);
      // Handle unexpected errors
    }
  };


  if (deleteCommentButtons) {
    deleteCommentButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const commentId = button.dataset.commentid;
        // console.log('attempting to delete', commentId);
        if (commentId) {
          // Confirm deletion if needed
          const confirmDeletion = confirm('Are you sure you want to delete this comment?');
          if (confirmDeletion) {
            await deleteCommentHandler(commentId);
          }
        }
      });
    });
  }

  if (deletePostButton) {
    deletePostButton.forEach((button) => {
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

  if (createCommentButton) {
    createCommentButton.addEventListener('click', () => {
      createCommentModal.show();
    });
  }

  if (createCommentButtonModal) {
    createCommentButtonModal.addEventListener('click', createCommentButtonModalHandler);
  }

  if (updatePostButton) {
    updatePostButton.addEventListener('click', () => {
      updatePostModal.show();
    })
  }

  if (updatePostButtonModal) {
    updatePostButtonModal.addEventListener('click', updatePostButtonModalHandler);
  }

});
