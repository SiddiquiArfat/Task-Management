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

let bod = document.getElementById('body');

// popup update
const showPopupBtn = document.getElementById('showPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');

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


let jwtToken = localStorage.getItem('jwtToken');
fun();
function fun(){
  // bod.innerHTML = "";
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
        console.log(data);
        body(data);
      })

}

let intro = document.getElementById('intro');
let about = document.getElementById('about');

function body(data){
    
    bod.innerHTML = "";
    let image = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";
    
    let img = document.createElement('img');
    if(data.profileImage == null){
        img.src = image;
        console.log('yes');
    }
    else{
        img.src = data.profileImage;
    }

    let name = document.createElement('p');
    name.textContent = data.username;
    let edit = document.createElement('button');
    edit.textContent = 'Edit Profile';
    edit.addEventListener('click',()=>{
        popup.classList.add('show-popup');
        // update();
    })
    let change = document.createElement('button');
    change.textContent = 'Change Password';
    let logout = document.createElement('button');
    logout.textContent = 'Logout';
    let name1 = document.createElement('p');
    name1.textContent = data.name;
    let ab = document.createElement('p');
    ab.className = 'abbout';
    ab.textContent = data.bio;

    intro.append(img,name1);

    let br = document.createElement('br');
    let followers = document.createElement('span')
    let followings = document.createElement('span') 
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');


    follower(a1);
    following(a2);
    // update it later
    // if(fol!=null) a1.textContent = fol.length+' followers';
    // else a1.textContent = '0 followers';
    // if(foling!=null) a2.textContent = fol.length+' following';
    // else a2.textContent = '0 following';

    a1.href = "#";
    a2.href = "#";
    
    followers.append(a1);
    followings.append(a2);

    about.append(followers, followings,br, name, edit,change,logout, ab);

    bod.append(intro, about);
}

let form = document.getElementById('updateform');

form.addEventListener('submit',()=>{

  const apiUrl = 'http://localhost:8080/updateuser';
  
  let obdy ={
    'name': form.name.value,
    'bio': form.about.value
  };
    const request = new Request(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obdy)
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
        fun();
        // return data;
      })

})
  


function follower(a1){

    const apiUrl = 'http://localhost:8080/followers';
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

function following(a2){

    const apiUrl = 'http://localhost:8080/following';
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
  
