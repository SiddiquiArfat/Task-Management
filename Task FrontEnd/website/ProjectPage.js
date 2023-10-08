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



let element = JSON.parse(localStorage.getItem('project')) || [];
console.log(element);

let mainsection = document.getElementById('projectMain');
mainsection.innerHTML = "";

  let div1 = document.createElement('div');
  let h2 = document.createElement('h2');
  h2.textContent = 'Project Details';

  let h3 = document.createElement('h2');
  h3.textContent =  element.projectName;
  let h4 = document.createElement('h3');
  h4.textContent = 'Created On: '+ element.ldt;

  let h6 = document.createElement('h3');
  h6.textContent = 'Deadline: '+ element.completedDate;  

  let h5 = document.createElement('h3');
//   if(element.completed) h5.textContent = 'Status: '+ 'Completed';
   

    
    let button = document.createElement('button');
    button.id = "status";

    if(element.completed){
      button.style.backgroundColor = "green";
      button.textContent = "completed";
    }
    else{
      button.style.backgroundColor = "orange";
      button.textContent = "Progress";
    }    
    h5.textContent = 'Status: ';
    h5.append(button);


  let h8 = document.createElement('h3');
  h8.textContent = 'Admin: '+ element.admin.name;

  let h7 = document.createElement('h3');
  h7.textContent = 'About: ';


  div1.append(h2,h3,h4,h6,h5,h8,h7);

  
  console.log(element.projectName);
  mainsection.append(div1);
