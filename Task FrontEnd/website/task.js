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
      a1.addEventListener('click', () => {
        localStorage.setItem('project', JSON.stringify(element));
      })
      a1.href = "/website/ProjectPage.html";
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
    a.addEventListener('click', () => {
      localStorage.setItem('task', JSON.stringify(element));
    })
    a.href = "/website/TaskPage.html";
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




// add task
let projectss = JSON.parse(localStorage.getItem('projects'));
let select = document.getElementById('customSelect1');
projectss.forEach((element, index) => {
  let opt = document.createElement('option');
  opt.textContent = element.projectName;
  select.append(opt);
})

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

    location.reload(true);
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
