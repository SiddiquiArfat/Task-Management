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



const closePopupBtnup = document.getElementById('uploadclosePopupBtn');
const popupup = document.getElementById('uploadpopup');

// Close the popup when the close button is clicked
closePopupBtnup.addEventListener('click', () => {
    popupup.classList.remove('show-popup');
});

// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === popupup) {
        popupup.classList.remove('show-popup');
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
    let image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    
    let img = document.createElement('img');
    if(data.profileImage == null){
        img.src = image;
        console.log('yes');
    }
    else{
        img.src = `data:image/jpeg;base64,${data.profileImage}`;
    }

    let name = document.createElement('p');
    name.textContent = data.username;
    let edit = document.createElement('button');
    edit.textContent = 'Edit Profile';
    edit.addEventListener('click',()=>{
        popup.classList.add('show-popup');
        // update();
    })
    
    let logout = document.createElement('button');
    logout.textContent = 'Logout';
    logout.addEventListener('click',()=>{
      swal({
        title: "Are you sure?",
        text: "want to logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your now Logout", {
            icon: "success",
          }).then(th=>{
            localStorage.setItem('jwtToken',"0");
            window.location.href = "../login/login.html";
          })
        }
      });
    })
    let name1 = document.createElement('p');
    name1.textContent = data.name;
    let ab = document.createElement('p');
    ab.className = 'abbout';
    ab.textContent = data.bio;

    let upload = document.createElement('button');
    upload.textContent = "Upload Photo";
    upload.addEventListener('click',()=>{
      popupup.classList.add('show-popup');
    })    

    intro.append(img,name1,upload);

    let br = document.createElement('br');
    let followers = document.createElement('span')
    let followings = document.createElement('span') 
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');
    a1.href = `followers.html?userId=${data.username}`;
    a2.href = `following.html?userId=${data.username}`;

    follower(a1);
    following(a2);
    // update it later
    // if(fol!=null) a1.textContent = fol.length+' followers';
    // else a1.textContent = '0 followers';
    // if(foling!=null) a2.textContent = fol.length+' following';
    // else a2.textContent = '0 following';

  
    
    followers.append(a1);
    followings.append(a2);

    about.append(followers, followings,br, name, edit,logout, ab);

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
  
///code to upload image 
document.addEventListener("DOMContentLoaded", function () {
  const imageUploadInput = document.getElementById("imageUpload");


  imageUploadInput.addEventListener("change", function () {
      const selectedFile = imageUploadInput.files[0];

      if (selectedFile) {
          // Display the selected file's name
        

          // Now, you can upload the selected file to the server using fetch
          const formData = new FormData();
          formData.append("file", selectedFile);

          fetch('http://localhost:8080/upload', {
              method: "POST",
              body: formData,
              headers: {
                  "Authorization": `Bearer ${jwtToken}`
              }
          })
          .then((response) => {
              if (response.ok) {
                  //alert("Profile photo uploaded successfully!");
                  
              } else {
                  alert("Profile photo upload failed. Please try again.");
              }
          })
          .catch((error) => {
              console.error("Error uploading profile photo:", error);
          });
      }
  });
});


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
  
