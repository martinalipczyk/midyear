document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
  
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      const username = formData.get('username');
      const password = formData.get('password');
  
      // Perform login validation by sending a request to the server
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert("wrong"); // Replace this with redirect or further actions
      })
      .catch(error => {
        console.error('Error during login:', error);
        alert('Invalid credentials. Please try again.');
      });
    });
  });
  