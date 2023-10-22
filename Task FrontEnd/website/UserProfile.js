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
let user = JSON.parse(localStorage.getItem('UserProfile'));

fun();
function fun(){
  // bod.innerHTML = "";
    const apiUrl = 'http://localhost:8080/profile/'+user.username;
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
    
   
    let image = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";
    
    let img = document.createElement('img');
    if(data.profileImage == null){
        img.src = image;
    }
    else{
        img.src = data.profileImage;
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
    let followers = document.createElement('span')
    let followings = document.createElement('span') 
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');


    follower(a1,data.username);
    following(a2,data.username);
    // update it later
    // if(fol!=null) a1.textContent = fol.length+' followers';
    // else a1.textContent = '0 followers';
    // if(foling!=null) a2.textContent = fol.length+' following';
    // else a2.textContent = '0 following';

    a1.href = "#";
    a2.href = "#";
    
    followers.append(a1);
    followings.append(a2);



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

    about.append(followers, followings,br, name,  ab,btn);
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