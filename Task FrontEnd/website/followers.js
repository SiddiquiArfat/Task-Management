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
  
  // const showPopupBtn = document.getElementById('showPopupBtn');
  const closePopupBtn = document.getElementById('closePopupBtn');
  const popup = document.getElementById('popup');
  
  // Show the popup when the button is clicked
  // showPopupBtn.addEventListener('click', () => {
  //     popup.classList.add('show-popup');
  // });
  
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
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  let main = document.getElementById('main');
  let jwtToken = localStorage.getItem('jwtToken');
  let username;
  // self user
  const apiUrl = 'http://localhost:8080/profile';
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
      username = data.username;
      console.log(data);
    })
  
  
  fun();
  function fun() {
    // bod.innerHTML = "";
    const apiUrl = 'http://localhost:8080/followers/'+userId;
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
        if(data.length == 0){
            main.innerHTML = "";
            let h1 = document.createElement('h1');
            h1.textContent = "No Followers Found"
            main.append(h1);
            
        }
        else{
            body(data);
        }
      })
  
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
  
  async function fetchData(uid, btn) {
    try {
      const data = await check(uid);
      // console.log('Data:', data);
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
  
  
  
  
  async function body(data) {
    main.innerHTML = "";
    data.forEach(element => {
      let div = document.createElement('div');
      let img = document.createElement('img');
      img.className = 'profile';
      if (element.profileImage == null) {
        img.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      }
      else {
          img.src = `data:image/jpeg;base64,${element.profileImage}`;
      }
      let name = document.createElement('p');
      name.textContent = element.name;
  
      let uname = document.createElement('p');
      uname.textContent = element.username;
      uname.style.color = 'gray';
  
      let btn = document.createElement('button');
      let follower = element.followers;
      let div2 = document.createElement('div');
      div2.className = 'container';
      fetchData(element.id, btn);
      btn.addEventListener('click', () => {
        if (btn.textContent == 'following') {
          const apiUrl = 'http://localhost:8080/unfollow/'+element.id;
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
  
          const apiUrl = 'http://localhost:8080/follow/'+element.id;
          console.log(element.id);
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
  
      })
  
  
  
      div2.append(btn)
      div.append(img, name,uname,div2);
  
      let cont = document.getElementById('cont');
      uname.addEventListener('click',()=>{
        
      localStorage.setItem('UserProfile', JSON.stringify(element));
      location.href = "UserProfile.html"; 
  
      })
  
      main.append(div);
    });
  }