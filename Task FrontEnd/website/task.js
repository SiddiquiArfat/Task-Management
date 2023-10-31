// includeNavbar.js
document.addEventListener('DOMContentLoaded', function () {
  // Find the placeholder element
  var navbarPlaceholder = document.getElementById('navbar-placeholder');

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the path to your navbar HTML file
  var navbarPath = 'nav.html';

  // Fetch the navbar content
  xhr.open('GET', navbarPath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Insert the fetched HTML into the placeholder
      navbarPlaceholder.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
});


// includingFooter.js
document.addEventListener('DOMContentLoaded', function () {
  // Find the placeholder element
  var navbarPlaceholder = document.getElementById('footer-placeholder');

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Define the path to your navbar HTML file
  var navbarPath = 'footer.html';

  // Fetch the navbar content
  xhr.open('GET', navbarPath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Insert the fetched HTML into the placeholder
      navbarPlaceholder.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
});

console.log(window.myProject);


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



// getting all tasks

// api fetching
let main;
let jwtToken = localStorage.getItem('jwtToken');
let alert = document.getElementById('alert');

function fetchapi() {

  const apiUrl = 'http://localhost:8080/tasks';
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
      else if (response.status == 401) {
        window.location.href = "../login/login.html";
      }
    })
    .then(data => {
      console.log(data);

      fun(data);
    })
}
fetchapi();




function getDetail(tid) {
  console.log(tid);
  let a1 = document.createElement('a');
  a1.className = 'page';
  let url = "http://localhost:8080/userproject/" + tid;

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      if (response.status == 401) location.href = '../login/login.html';
      return response.json();
    }).then(data => {
      // console.log(data);
      // u = data;
      a1.textContent = data.projectName;
      // a1.addEventListener('click', () => {
      //   localStorage.setItem('project', JSON.stringify(element));
      // })
      a1.href = `ProjectPage.html?userId=${data.id}`;
      return data;
    })
  return a1;
}



let projects = document.getElementById('body');
function fun(data) {
  projects.innerHTML = "";


  if(data == undefined) {
    alert.innerHTML = "";
    let h111 = document.createElement('p');
    h111.textContent = "Task Not Found!!!";
    alert.append(h111);
    swal("Tasks Not Found", `No Task Found`, "error"); 
  }
  else{
    alert.innerHTML = "";
  }

  data.forEach((element) => {

    let a1 = getDetail(element.id);


    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let a = document.createElement('a');
    a.textContent = element.taskName;
    a.className = "page";
    a.href = `TaskPage.html?userId=${element.id}`;
    td.append(a);
    let td1 = document.createElement('td');
    td1.textContent = element.ldt;

    let td7 = document.createElement('td');
    td7.append(a1);

    let td2 = document.createElement('td');
    let button = document.createElement('button');
    if (element.status == 'CLOSE') {
      button.style.backgroundColor = "green";
      button.textContent = "completed"
    }
    else {
      button.style.backgroundColor = "orange";
      button.textContent = "Progress"
    }
    td2.append(button);
    let td3 = document.createElement('td');
    td3.textContent = element.user.name;
    tr.append(td, td1, td7, td3, td2);
    projects.append(tr);
  });
}

let select = document.getElementById('customSelect1');
function fetchapii(){
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
      data.forEach((element, index) => {
        let opt = document.createElement('option');
        opt.textContent = element.projectName;
        select.append(opt);
      })
      
    })
    .catch(error => {
      console.error(error);
    });
  }
  fetchapii();


// add task
// let projectss = JSON.parse(localStorage.getItem('projects'));



let form = document.querySelector('form');
form.addEventListener('submit', () => {
  event.preventDefault();

  let date = form.date.value;
  var selectedDate = new Date(date);
  var formattedDate = selectedDate.getFullYear() + '/' +
    String(selectedDate.getMonth() + 1).padStart(2, '0') + '/' +
    String(selectedDate.getDate()).padStart(2, '0');
  date.value = formattedDate;

  let name = form.name.value;
  let project = {
    "taskName": name,
    "about": form.about.value,
    "closed": date
  };
  let url = "http://localhost:8080/AddTask/" + select.value;

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(response => {
    if (response.status == 401) {
      // alert(response.status)
      window.location.href = "../login/login.html";
    }
    popup.classList.add('show-popup');
    swal("Good job!", `You have added task successfully`, "success");
    fetchapi();
    return response.json();
  })
  console.log(project);
})


// filters

let filter = document.getElementById('customSelect');

filter.addEventListener('change', () => {

  if (filter.value == "notcompleted") {


    const apiUrl = 'http://localhost:8080/opentask';
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
        else if (response.status == 401) {
          window.location.href = "../login/login.html";
        }
      })
      .then(data => {
        console.log(data);
        
        fun(data);
      })
  }


  else if(filter.value == "completed"){

    const apiUrl = 'http://localhost:8080/closedtask';
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
        else if (response.status == 401) {
          window.location.href = "../login/login.html";
        }
        
      })
      .then(data => {
        console.log(data);

        fun(data);
      })

  }
  else{
    fetchapi();
  }
})

// search
let t;
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