let form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = form.email.value;
    let password = form.password.value;
    let url = 'http://localhost:8080/signin';
    const userData = {
        username: email,
        password: password,
        role: "USER"
    };

    // Define the fetch options for the POST request
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(userData), // Convert the user data to JSON format
  };

  signup(requestOptions, url);


});

async function signup(requestOptions, signupUrl){
    try {
        // Perform the POST request using async/await
        const response = await fetch(signupUrl, requestOptions);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json(); // Parse the response JSON
    
        // Handle the successful response here
        console.log('Signup successful:', data);
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      }
}

