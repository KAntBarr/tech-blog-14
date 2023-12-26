document.addEventListener('DOMContentLoaded', () => {
  const updateUserButton = document.getElementById('updateUserButton');
  const updatePasswordButton = document.getElementById('updatePasswordButton');
  const updatePasswordModal = new bootstrap.Modal(document.getElementById('updatePasswordModal'));
  const updatePasswordButtonModal = document.getElementById('updatePasswordButtonModal');
  const deleteButton = document.getElementById('deleteUserButton');

  const deleteUserHandler = async (userid) => {

    try {
      const response = await fetch(`/api/users/${userid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`User ${userid} deleted`);
        // Reload the page or update the UI as needed
        document.location.replace(`/`);
      } else {
        throw new Error((await response.json()).error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user\n' + error);
    }
  };

  const updatePasswordButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    console.log('updatePasswordForm hit');

    const password = document.getElementById('newPassword').value.trim();
    const userid = document.getElementById('deleteUserButton').dataset.userid;

    try {
      const response = await fetch(`/api/users/${userid}/password`, {
        method: 'PUT',
        body: JSON.stringify({
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        updatePasswordModal.hide();
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/profile`);
      } else {
        throw new Error((await response.json()).error);
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating password:', String(error).replace(new RegExp('Error: ', 'g'), ''));
      alert('Error updating password\n' + String(error).replace(new RegExp('Error: ', 'g'), ''));
      // Handle unexpected errors
    }
  };

  const updateUserButtonHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from reaching parent elements

    console.log('updateUserForm hit');

    const username = document.getElementById('username').value.trim().length < 1 ?
      document.getElementById('username').dataset.username
      :
      document.getElementById('username').value.trim();

    const email = document.getElementById('eMail').value.trim().length < 1 ?
      document.getElementById('eMail').dataset.email
      :
      document.getElementById('eMail').value.trim();

    const userid = document.getElementById('deleteUserButton').dataset.userid;

    try {
      const response = await fetch(`/api/users/${userid}`, {
        method: 'PUT',
        body: JSON.stringify({
          username,
          email
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // console.log('user was updated');
        // Handle success, e.g., show a success message or redirect to another page
        document.location.replace(`/profile`);
      } else {
        throw new Error((await response.json()).error);
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating user:', String(error).replace(new RegExp('Error: ', 'g'), ''));
      alert('Error updating user\n' + String(error).replace(new RegExp('Error: ', 'g'), ''));
      // Handle unexpected errors
    }
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const userid = deleteButton.dataset.userid;
      // console.log('attempting to delete', taskId);
      if (userid) {
        // Confirm deletion if needed
        const confirmDeletion = confirm('Are you sure you want to delete your profile?');
        if (confirmDeletion) {
          await deleteUserHandler(userid);
        }
      }
    });
  }

  if (updatePasswordButton) {
    updatePasswordButton.addEventListener('click', () => {
      updatePasswordModal.show();
    })
  }

  if (updatePasswordButtonModal) {
    updatePasswordButtonModal.addEventListener('click', updatePasswordButtonModalHandler);
  }

  if (updateUserButton) {
    updateUserButton.addEventListener('click', updateUserButtonHandler);
  }

});