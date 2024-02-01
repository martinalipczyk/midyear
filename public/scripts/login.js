// Example in login.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/login', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response:', data);
        if (data.success) {
            alert('Login successful');
            // Use the userId in subsequent requests or redirect to another page
            fetchData(data.userId);
        } else {
            alert('Login failed: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login');
    });
});
