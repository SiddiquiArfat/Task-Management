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

function fetchapi(){

const apiUrl = 'http://localhost:8080/projects/9';

let jwtToken = localStorage.getItem('jwtToken');

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
    fun(data);
  })
  .catch(error => {
    console.error(error);
  });

  

}
fetchapi();



let projects = document.getElementById('body');



function fun(data){
  
  projects.innerHTML = "";

  data.forEach((element) => {
    // console.log(element);
    

    let tr = document.createElement('tr');
    
    let td = document.createElement('td');

    let a = document.createElement('a');
    a.textContent = element.projectName;
    a.addEventListener('click',()=>{
      localStorage.setItem('project', JSON.stringify(element));
    })
    a.href = "/website/ProjectPage.html";

  

    // td.textContent = element.projectName;
    td.append(a);

    let td1 = document.createElement('td');
    td1.textContent = element.ldt;

    let td2 = document.createElement('td');
    
    let button = document.createElement('button');

    if(element.completed){
      button.style.backgroundColor = "green";
      button.textContent = "completed"
      // td2.textContent = "completed";
    }
    else{
      button.style.backgroundColor = "orange";
      button.textContent = "completed"
      // td2.textContent = "Progress";
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







