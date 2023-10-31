let form = document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name = form.fullname.value;
    let email = form.email.value;
    let password = form.password.value;
    let url = 'http://localhost:8080/AddUser';
    const userData = {
        name: name,
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
        swal({
          text: 'Please Enter 6 Digit OTP Here Check your mails',
          content: "input",
          button: {
            text: "Submit OTP!",
            closeModal: false,
          },
        })
        .then(name => {
          if (!name) throw null;
          return fetch(`http://localhost:8080/verify-account/${data.username}/${name}`);
        })
        .then(results => {
          if(results.status == 400){
            swal("Worng!", "Invalid OTP Enter", "error");
            let button = document.createElement('button')
            button.textContent = 'Regenerate OTP';
            fun(button,data);
            throw new Error("Invalid otp")
          }
          return results.json();
        })
        .then(json => {
          swal("Verified", `${json.name} Your Email is Verified`, "success")
          .then((value) => {
            // This code block will be executed when the user clicks "OK"
            location.replace("/login/login.html");
          });
        })
        // .catch(err => {
        //   if (err) {
        //     swal("Oh noes!", "The AJAX request failed!", "error");
        //   } else {
        //     swal.stopLoading();
        //     swal.close();
        //   }
        // });
        // location.replace("/login/login.html");
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      }
}

function fun(button,data){
  // 
  let re = document.getElementById('re');
  re.innerHTML = "";

  button.addEventListener('click',()=>{
    fetch(`http://localhost:8080/reotp/${data.username}`)
    .then(res=>{
      if(res.ok){
         return res.json();
      }
      else{
        throw new Error('Not able To Generate');
      }
    })
    .then(data=>{
      fun2(data);
    })
  })
  re.append(button);
}

function fun2(data){
   // Handle the successful response here
   swal({
    text: 'Please Enter 6 Digit OTP Here Check your mails',
    content: "input",
    button: {
      text: "Submit OTP!",
      closeModal: false,
    },
  })
  .then(name => {
    if (!name) throw null;
    return fetch(`http://localhost:8080/verify-account/${data.username}/${name}`);
  })
  .then(results => {
    if(results.status == 400){
      swal("Worng!", "Invalid OTP Enter", "error");
      let button = document.createElement('button')
      button.textContent('Regenerate OTP');
      fun(button);
      throw new Error("Invalid otp")
    }
    return results.json();
  })
  .then(json => {
    swal("Verified", `${json.name} Your Email is Verified`, "success")
    .then((value) => {
      // This code block will be executed when the user clicks "OK"
      location.replace("/login/login.html");
    });
  })

}

