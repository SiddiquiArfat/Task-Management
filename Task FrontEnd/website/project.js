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
  

  if(!Array.isArray(data) || data.length == 0){
    alert.innerHTML = "";
    let h111 = document.createElement('p');
    h111.textContent = "Project Not Found!!!";
    alert.append(h111);
    swal("Projects Not Found", `No Project Found`, "error");
  }
    else{
    alert.innerHTML = "";
  }


  // localStorage.setItem('projects', JSON.stringify(data));
  projects.innerHTML = "";
  data.forEach((element) => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let a = document.createElement('a');
    a.textContent = element.projectName;
    
    a.href = `ProjectPage.html?userId=${element.id}`;
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
    else if(response.status == 400){
      swal("Project Already Exists", `Please choose some other name`, "error");
      new Error('Project already exits');
    }
else{
    popup.classList.remove('show-popup');
    swal("Good job!", "Project Added Successfully!", "success");
    // location.reload(true);
    fetchapi();
    return response.json();
}
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

// search
function search(data, tag) {
  t = tag;
  let query = data.value;
  tag.innerHTML = "";
  let h3 = document.createElement('h3');
  h3.textContent = 'People';
  let users = document.createElement('div');
  if (query == '' || query == " ") {
    tag.style.display = 'none';

  } else {
    tag.style.display = 'block';
    const apiUrl = 'http://localhost:8080/searchuser/' + query;
    const request = new Request(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      }
    })
    fetch(request)
      .then(response => {
        if (response.status == 401) {
          console.error('Request failed with status:', response.status);
          window.location.href = "../login/login.html";
          return response.text();
        }
        return response.json();
      })
      .then(data => {
        data.forEach(element => {
          console.log(element);

          let innerdiv = document.createElement('div');
          let a = document.createElement('a');
          a.textContent = element.name;
          a.href = `UserProfile.html?userId=${element.username}`;
          let img = document.createElement('img');
          img.className = 'profile';
          if (element.profileImage == null) {
            img.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          }
          else {
            img.src = `data:image/jpeg;base64,${element.profileImage}`;
          }
          innerdiv.append(img, a);
          users.append(innerdiv);

        });
        
      })
      .catch(error => {
        console.error(error);
      });

      projectsearch(tag, query)
      tasksearch(tag, query)

      tag.append(h3, users);

      
  }
}

function projectsearch(tag, query){

  let h3p = document.createElement('h3');
  h3p.textContent = 'Projects';
  let project = document.createElement('div');

  const apiUrl = 'http://localhost:8080/searchuserproject/' + query;
    const request = new Request(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      }
    })
    fetch(request)
      .then(response => {
        if (response.status == 401) {
          console.error('Request failed with status:', response.status);
          window.location.href = "../login/login.html";
          return response.text();
        }
        return response.json();
      })
      .then(data => {
        data.forEach(element => {
          let innerdiv = document.createElement('div');
          let a = document.createElement('a');
          a.textContent = element.projectName;
          a.href = `ProjectPage.html?userId=${element.id}`;
          innerdiv.append(a);
          project.append(innerdiv);
        });
        
      })
      .catch(error => {
        console.error(error);
      });

      tag.append(h3p, project)

}

function tasksearch(tag, query){
  let h3p = document.createElement('h3');
  h3p.textContent = 'Tasks';
  let project = document.createElement('div');
  const apiUrl = 'http://localhost:8080/searchusertask/' + query;
    const request = new Request(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      }
    })
    fetch(request)
      .then(response => {
        if (response.status == 401) {
          console.error('Request failed with status:', response.status);
          window.location.href = "../login/login.html";
          return response.text();
        }
        return response.json();
      })
      .then(data => {
        data.forEach(element => {
          let innerdiv = document.createElement('div');
          let a = document.createElement('a');
          a.textContent = element.taskName;
          a.href = `TaskPage.html?userId=${element.id}`;
          innerdiv.append(a);
          project.append(innerdiv);
        });
      })
      .catch(error => {
        console.error(error);
      });
      tag.append(h3p, project)
}

document.body.addEventListener('click', function (event) {
  const target = event.target;
  // Check if the click target is outside the scrollable div

  if (target !== t && !t.contains(target)) {
    t.style.display = 'none';
  }
});



// loading
// This event listener will hide the loading container when the page is fully loaded.
window.addEventListener("load", function () {
  document.querySelector(".loading-container").style.display = "none";
});




