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
let jwtToken = localStorage.getItem('jwtToken');


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

      let tp = data.length;
      let tpc = 0;
      for(let i=0;i<data.length;i++){
        if(data[i].status == 'CLOSE'){
          tpc++;
        }
      }

      let not = tp - tpc;

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Task per Day'],
          ['Completed', tpc],
          ['Not Completed', not],
          ['Total Task', tp],
        ]);

        var options = {
          title: 'My Task Record',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }
    })
}
fetchapi();










let t;

let body = document.querySelector('body');
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

function projectsearch(tag, query) {

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

function tasksearch(tag, query) {
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

