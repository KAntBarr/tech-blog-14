const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  try {
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // console.log('logged in, going to home');
        document.location.replace('/');
      } else {
        throw new Error(response.statusText);
      }
    }
  } catch (error) {
    console.error('Failed to log in:', error);
    alert('Failed to log in\n' + error);
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    console.log('attempting to create user');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      alert('Failed to sign up\n' + error);
    }
  }
};

document
  .querySelector('.login-form')
  ?.addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  ?.addEventListener('submit', signupFormHandler);
