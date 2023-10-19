// includeNavbar.js
document.addEventListener('DOMContentLoaded', function() {
    // Find the placeholder element
    var navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Define the path to your navbar HTML file
    var navbarPath = 'nav.html';
    
    // Fetch the navbar content
    xhr.open('GET', navbarPath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insert the fetched HTML into the placeholder
            navbarPlaceholder.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});


// includingFooter.js
document.addEventListener('DOMContentLoaded', function() {
    // Find the placeholder element
    var navbarPlaceholder = document.getElementById('footer-placeholder');
    
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Define the path to your navbar HTML file
    var navbarPath = 'footer.html';
    
    // Fetch the navbar content
    xhr.open('GET', navbarPath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insert the fetched HTML into the placeholder
            navbarPlaceholder.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});

// alert('hello')

const showPopupBtn = document.getElementById('showPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');

// Show the popup when the button is clicked
showPopupBtn.addEventListener('click', () => {
    popup.classList.add('show-popup');
});

// Close the popup when the close button is clicked
closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('show-popup');
});

// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('show-popup');
    }
});






// api fetching
let main;
let jwtToken = localStorage.getItem('jwtToken');
let alert = document.getElementById('alert');

function fetchapi(){
const apiUrl = 'http://localhost:8080/projects';
const request = new Request(apiUrl, {
  method: 'GET', 
  headers: {
    'Authorization': `Bearer ${jwtToken}`, 
    'Content-Type': 'application/json',
  }
})
fetch(request)
  .then(response => {
    if(response.status == 401){
        console.error('Request failed with status:', response.status);
        window.location.href = "../login/login.html";
        return response.text();
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    fun(data);
  })
  .catch(error => {
    console.error(error);
  });
}
fetchapi();



let projects = document.getElementById('body');

function fun(data){
  console.log(data.length);
  // if(data != []) {
  //   alert.innerHTML = "";
  //   let h111 = document.createElement('p');
  //   h111.textContent = "Task Not Found!!!";
  //   alert.append(h111); 
  // }
  // else{
  //   alert.innerHTML = "";
  // }

  if(!Array.isArray(data) || data.length == 0){
    alert.innerHTML = "";
    let h111 = document.createElement('p');
    h111.textContent = "Task Not Found!!!";
    alert.append(h111);
  }
    else{
    alert.innerHTML = "";
  }

  localStorage.setItem('projects', JSON.stringify(data));
  projects.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let a = document.createElement('a');
    a.textContent = element.projectName;
    a.addEventListener('click',()=>{
      localStorage.setItem('project', JSON.stringify(element));
    })
    a.href = "/website/ProjectPage.html";
    a.style.textDecoration = 'none';
    a.className = 'page';
    
    td.append(a);
    let td1 = document.createElement('td');
    td1.textContent = element.ldt;
    let td2 = document.createElement('td');
    let button = document.createElement('button');
    if(element.completed){
      button.style.backgroundColor = "green";
      button.textContent = "completed"
    }
    else{
      button.style.backgroundColor = "orange";
      button.textContent = "Progress"
    }    
    td2.append(button);
    let td3 = document.createElement('td');
    td3.textContent = element.admin.name;
    let td4 = document.createElement('td');
    td4.textContent = element.completedDate;
    tr.append(td,td1,td4,td3,td2);
    projects.append(tr);   
  });
}

// adding project

let form = document.querySelector('form');
form.addEventListener('submit',()=>{
  event.preventDefault();

  let date = form.date.value;
            var selectedDate = new Date(date);
            var formattedDate = selectedDate.getFullYear() + '/' + 
                                String(selectedDate.getMonth() + 1).padStart(2, '0') + '/' + 
                                String(selectedDate.getDate()).padStart(2, '0');
            date.value = formattedDate;

  let name = form.name.value;
  let project = {
    "projectName":name,
    "about": form.about.value,
    "completedDate" : date
  };
  let url = "http://localhost:8080/AddProject"
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+jwtToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(response =>{
    if(response.status == 401){
      // alert(response.status)
      window.location.href = "../login/login.html";
    }
    
    location.reload(true);
    return response.json();
  })
  console.log(project);
})




// filters

let filter = document.getElementById('customSelect');

filter.addEventListener('change',()=>{

  if(filter.value == "completed"){
    const apiUrl = 'http://localhost:8080/completedproject';
    const request = new Request(apiUrl, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${jwtToken}`, 
        'Content-Type': 'application/json',
      }
    });
    
    fetch(request)
      .then(response => {
        if (response.ok) {
            return response.json();
        }
        else if(response.status == 401){
          window.location.href = "http://localhost:8080/login";
        } 
        else {
          console.error('Request failed with status:', response.status);
          window.location.href = "../login/login.html";
          return response.text();
        }
    })
    .then(data => {
      console.log(data);
      if(data.length == 0) {
        alert.innerHTML = "";
        let h111 = document.createElement('p');
        h111.textContent = "Project Not Found!!!";
        alert.append(h111); 
      }
      fun(data);
    })
    .catch(error => {
      console.error(error);
    });

  }

  else if(filter.value == "notcompleted"){
    
      const apiUrl = 'http://localhost:8080/completednotproject';
      const request = new Request(apiUrl, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',
        }
      });
      let alert = document.getElementById('alert');
      fetch(request)
        .then(response => {
          if (response.ok) {
              return response.json();
          }
          else if(response.status == 401){
            window.location.href = "http://localhost:8080/login";
          } 
          else {
            console.error('Request failed with status:', response.status);
            window.location.href = "../login/login.html";
            return response.text();
          }
      })
      .then(data => {
        console.log(data);
        if(data.length == 0) {
          alert.innerHTML = "";
          let h111 = document.createElement('p');
          h111.textContent = "Project Not Found!!!";
          alert.append(h111); 
        }
        else{
          alert.innerHTML = "";
        }
        fun(data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    else if(filter.value == "due"){
      const apiUrl = 'http://localhost:8080/getDueProject';
      const request = new Request(apiUrl, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${jwtToken}`, 
          'Content-Type': 'application/json',
        }
      });
      let alert = document.getElementById('alert');
      fetch(request)
        .then(response => {
          if (response.ok) {
              return response.json();
          }
          else if(response.status == 401){
            console.log(response)
          } 
          else {
            console.error('Request failed with status:', response.status);
            window.location.href = "../login/login.html";
            return response.text();
          }
      })
      .then(data => {
        console.log(data);
        if(data.length == 0) {
          alert.innerHTML = "";
          let h111 = document.createElement('p');
          h111.textContent = "Project Not Found!!!";
          alert.append(h111); 
        }
        else{
          alert.innerHTML = "";
        }
        fun(data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    else if(filter.value == "none") fetchapi();



})








