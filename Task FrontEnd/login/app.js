let form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = form.email.value;
    let password = form.password.value;
    let url = 'http://localhost:8080/signIn';
    const log = btoa(email+':'+password);

    const userData = {
        username: email,
        password: password
    };
    console.log(log);
    // Define the fetch options for the POST request
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic '+log
    },
  }
  ).then(Response=> {
    if(Response.status == 401){
      throw new Error("Login Failed");
    }
    let token = Response.headers.get('Authorization');
    console.log(token);
    localStorage.setItem('jwtToken', token);
    window.location.href = "../website/home.html";
  }
)
});