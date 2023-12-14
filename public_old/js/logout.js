const logoutHandler = async (event) => {

  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
      console.log('logged out, going to home');
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
};

document
  .querySelector('#sign-out-button')
  ?.addEventListener('click', logoutHandler);
