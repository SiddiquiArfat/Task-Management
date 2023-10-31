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
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

fun();
function fun(){
  // bod.innerHTML = "";
    const apiUrl = 'http://localhost:8080/profile/'+userId;
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
        body(data);
      })

}




function body(data){

  let bod = document.getElementById('body');
let intro = document.getElementById('intro');
let about = document.getElementById('about');

intro.innerHTML = "";
about.innerHTML = "";
    
   
let image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    
let img = document.createElement('img');
if(data.profileImage == null){
    img.src = image;
    
}
else{
    img.src = `data:image/jpeg;base64,${data.profileImage}`;
}

    let name = document.createElement('p');
    name.textContent = data.username;
    
    let name1 = document.createElement('p');
    name1.textContent = data.name;
    let ab = document.createElement('p');
    if(data.bio!=null){
      ab.className = 'abbout';
    ab.textContent = data.bio;
    }
    
    

    intro.append(img,name1);

    let br = document.createElement('br');
    // let followers = document.createElement('span')
    // let followings = document.createElement('span') 
    
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');

   
    

    follower(a1,data.username);
    following(a2,data.username);
    a1.href = `followers.html?userId=${data.username}`;
    a2.href = `following.html?userId=${data.username}`;

    // followers.append(a1);
    // followings.append(a2);



    let btn = document.createElement('button');
    
    fetchData(data.id, btn);
    btn.addEventListener('click', () => {
      if (btn.textContent == 'following') {
        const apiUrl = 'http://localhost:8080/unfollow/'+data.id;
        const request = new Request(apiUrl, {
          method: 'PATCH',
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
            // console.log(data);
            fun();
          })
      }
      else{

        const apiUrl = 'http://localhost:8080/follow/'+data.id;
        const request = new Request(apiUrl, {
          method: 'PATCH',
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
            // console.log(data);
            fun();
          })
      }
    });

    

    about.append(a1, a2, br, name, ab, btn);
    bod.append(intro, about);
}


async function fetchData(uid, btn) {
  try {
    const data = await check(uid);
    // console.log('Data:', data);
    btn.style.width = "200px";
    if (data === true) {
      btn.style.backgroundColor = 'gray';
      btn.style.color = 'white';
      btn.textContent = 'following';
    }
    else {
      btn.style.backgroundImage = "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)";
      btn.style.color = 'white';
      btn.textContent = 'follow';
    }
    
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle errors
  }
}


async function check(uid){
  const apiUrl = 'http://localhost:8080/check/'+uid;
        // console.log(element.id);
        const request = new Request(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        });
          
        try {
          const response = await fetch(request);
      
          if (response.ok) {
            const data = await response.json();
            return data; // Return the data
          } else if (response.status == 401) {
            window.location.href = "../login/login.html";
          }
        } catch (error) {
          console.error('An error occurred:', error);
          throw error; // You can re-throw the error if needed
        }
}





function follower(a1,username){

    const apiUrl = 'http://localhost:8080/followers/'+username;
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
        
        a1.textContent = data.length+" followers";
        
        return data;
      })


}

function following(a2,username){

    const apiUrl = 'http://localhost:8080/following/'+username;
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
        a2.textContent = data.length+" following";
        
        return data;
      })


}

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