document.addEventListener('DOMContentLoaded', () => {
  const createCommentButton = document.getElementById('addCommentButton');
  const createCommentModal = new bootstrap.Modal(document.getElementById('createCommentModal'));
  const createCommentButtonModal = document.getElementById('createCommentButtonModal');
  const updatePostButton = document.getElementById('updatePostButton');
  // const updatePostModal = new bootstrap.Modal(document.getElementById('updatePostModal'));
  const updatePostButtonModal = document.getElementById('updatePostButtonModal');
  const deleteButtons = document.querySelectorAll('.deleteCommentButton .deletePostButton');


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
        console.log(`Comment ${commentId} deleted`);
        // Reload the page or update the UI as needed
        document.location.replace(`/api/posts/${postid}`);
      } else {
        console.error(`Failed to delete comment ${commentId}`, response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  const updatePostButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    console.log('updatePostForm hit');

    const make = document.getElementById('postMake').value.trim() || null;
    const model = document.getElementById('postModel').value.trim() || null;
    const year = document.getElementById('postYear').value.trim() || null;
    const mileage = document.getElementById('postMileage').value.trim() || null;
    const postid = document.getElementById('postInfoStore').dataset.postid;

    try {
      const response = await fetch(`/api/posts/${postid}`, {
        method: 'PUT',
        body: JSON.stringify({
          make,
          model,
          year,
          mileage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      updatePostModal.hide();

      if (response.ok) {
        console.log('post was updated');
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/api/posts/${postid}`);
      } else {
        console.error('Failed to update post:', response.status, response.statusText);
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle unexpected errors
    }
  };


  if (deleteButtons) {
    deleteButtons.forEach((button) => {
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
