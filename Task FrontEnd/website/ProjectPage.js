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

// popup update
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

// delete button
const showPopupBtnDelete = document.getElementById('showPopupBtnDelete');
const closePopupBtnDelete = document.getElementById('closePopupBtnDelete');
const popupDelete = document.getElementById('popupDelete');

// Show the popup when the button is clicked
showPopupBtnDelete.addEventListener('click', () => {
  popupDelete.classList.add('show-popup');
});

// Close the popup when the close button is clicked
closePopupBtnDelete.addEventListener('click', () => {
    popupDelete.classList.remove('show-popup');
});

// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === popupDelete) {
        popupDelete.classList.remove('show-popup');
    }
});




// console.log(element);
let jwtToken = localStorage.getItem('jwtToken');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

function func(){
let url = "http://localhost:8080/getproject/"+ userId;

fetch(url,{
  method: "GET",
  headers: {
    'Authorization': 'Bearer '+jwtToken,
    'Content-Type': 'application/json'
  }
}).then(response => {
  if(response.status == 401){
    console.log("please login");
    window.location.href = "../login/login.html";
  }
  return response.json();
})
.then(data => {
  // console.log(data);
  localStorage.setItem('project', JSON.stringify(data));
  fun(data);
})
.catch(error => {
  console.error(error);
});
}
func()

let mainsection = document.getElementById('projectMain');


function fun(element){
  console.log(element)
  mainsection.innerHTML = "";
  // let element = JSON.parse(localStorage.getItem('project')) || [];
  let div1 = document.createElement('div');
  let h2 = document.createElement('h2');
  h2.textContent = 'Project Details';
  let h3 = document.createElement('h3');
  h3.textContent =  element.projectName;
  let h4 = document.createElement('h5');
  h4.textContent = 'Created On: '+ element.ldt;
  let h6 = document.createElement('h5');
  h6.textContent = 'Deadline: '+ element.completedDate;  
  let h5 = document.createElement('h5');
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
  let h8 = document.createElement('h5');
  h8.textContent = 'Admin: '+ element.admin.name;
  let h7 = document.createElement('h5');
  h7.textContent = 'About: ';
  let textarea = document.createElement('textarea');
  textarea.textContent = element.about;
  textarea.style.width = "80%"
  textarea.style.height = "100px";
  // textarea.style.border = "none";
  textarea.style.background = "transparent";
  textarea.readOnly = true;
  div1.append(h2,h3,h4,h6,h5,h8,h7,textarea);
  console.log(element.projectName);



  let div2 = document.createElement('div');
  let interdiv = document.createElement('div');
  interdiv.className = 'inter';
  let taskh1 = document.createElement('h2');
  taskh1.textContent = 'Tasks';
  let addTask = document.createElement('button');
  addTask.textContent = '+';
  addTask.className = 'beautiful-button';
  addTask.style.height = '40px';
  addTask.addEventListener('click', () => {
    popuptask.classList.add('show-popup');
  });
  interdiv.append(taskh1,addTask);
  let task = element.tasks;
  div2.append(interdiv);
  task.forEach((ele,index) => {
    let h33 = document.createElement('h5');
    let button = document.createElement('button');
    button.id = "status";
    if(ele.status == 'CLOSE'){
      button.style.backgroundColor = "green";
      button.textContent = "completed";
    }
    else{
      button.style.backgroundColor = "orange";
      button.textContent = "Progress";
    }    
    button.style.marginLeft = "30px";
    let a = document.createElement('a');
    a.textContent = ele.taskName;
    a.style.color = 'black';
    a.addEventListener('click',()=>{
      localStorage.setItem('task', JSON.stringify(ele));
    })
    a.href = "TaskPage.html?userId="+ele.id;
    h33.append(a);
    h33.append(button);
    div2.append(h33);
  });
  // div2.append(interdiv,h33);



  let div3 = document.createElement('div');
  let intediv = document.createElement('div');
  intediv.className = 'inter';

  let member = document.createElement('h2');
  member.textContent = "Contributers";

  let add = document.createElement('button');
  add.textContent = '+';
  add.className = 'beautiful-button';
  add.style.height = '40px';
  add.addEventListener('click', () => {
    console.log('click one');
    popupAdd.classList.add('show-popup');
});

  intediv.append(member,add);
  let user = element.user;
  
  // div3.innerHTML = "";
  div3.append(intediv);
  user.forEach((ele,index)=>{
    // console.log(ele);
    let h344 = document.createElement('h5');
    h344.textContent = index+1 +" | "+ele.name+" | "+ele.username;
   

    div3.append(h344);
  })

  mainsection.append(div1,div3,div2);
}


let ele = JSON.parse(localStorage.getItem('project')) || [];


// updating project

let updateForm = document.getElementById('updateform');

// let updatename = document.getElementById('')

updateForm.addEventListener('submit',()=>{
  event.preventDefault();
  let date = updateForm.date.value;
  var selectedDate = new Date(date);
  var formattedDate = selectedDate.getFullYear() + '/' + 
                      String(selectedDate.getMonth() + 1).padStart(2, '0') + '/' + 
                      String(selectedDate.getDate()).padStart(2, '0');
  date.value = formattedDate;

  let userData = {
    "name": updateForm.name.value,
    "about": updateForm.about.value,
    "deadline": date
  };


  let url = "http://localhost:8080/updateproject/"+userId;

  fetch(url,{
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer '+jwtToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(response =>{
    if(response.status == 401){
      window.location.href = "../login/login.html";
    }
    popup.classList.remove('show-popup');
    swal("Project Updated!", "Project Updated", "success");
    func();
    return response.json();
  })
  console.log(date);
})

// delete project

let deletebtn = document.getElementById('deletebtn');
deletebtn.addEventListener('submit',()=>{
  event.preventDefault();
  let deleteurl = "http://localhost:8080/deleteproject/"+userId;

  fetch(deleteurl,{
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer '+jwtToken,
      'Content-Type': 'application.json'
    }
  }).then(response =>{
    if(response.status == 401){
      window.location.href = "../login/login.html";
    }
    window.location.href = "/website/project.html";
    return response.json();
  })
  console.log(date);
})

// mark as compelete

let mark = document.getElementById('showPopupBtn1');
mark.addEventListener('click',()=>{
  event.preventDefault();
  if(!ele.completed){
    console.log('completed');
    let progressurl = "http://localhost:8080/completeproject/"+userId
    fetch(progressurl,{
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer '+jwtToken,
        'Content-Type': 'application/json'
      },
    }).then(response =>{
      if(response.status == 401){
        window.location.href = "../login/login.html";
      }
      // window.location.href = "/website/projectPage.html";
      // console.log(response.json());
      return response.json();
    }).then(data => {
      console.log(data);
      ele = data;
      localStorage.setItem('project', JSON.stringify(data));
      // fun();
      func();
    })

  }else{
    console.log('not completed');
    let progressurl = "http://localhost:8080/progressproject/"+ele.id
    fetch(progressurl,{
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer '+jwtToken,
        'Content-Type': 'application/json'
      },
    }).then(response =>{
      if(response.status == 401){
        window.location.href = "../login/login.html";
      }
      return response.json();
    }).then(data => {
      console.log(data);
      ele = data;
      localStorage.setItem('project', JSON.stringify(data));
      // fun();
      func();
    })

    
  }
  
})
 

// const showPopupBtnAdd = document.querySelector('.beautiful-button')
const closePopupBtnAdd = document.getElementById('closePopupBtnAdd');
const popupAdd = document.getElementById('popupAdd');
// Show the popup when the button is clicked
// Close the popup when the close button is clicked
closePopupBtnAdd.addEventListener('click', () => {
    popupAdd.classList.remove('show-popup');
});
// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === popupAdd) {
        popupAdd.classList.remove('show-popup');
    }
});


const popuptask = document.getElementById('popupTask');
const closebtntask = document.getElementById('closePopupBtnTask');
closebtntask.addEventListener('click', () => {
  popuptask.classList.remove('show-popup');
});
// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
  if (e.target === popuptask) {
      popuptask.classList.remove('show-popup');
  }
});


// collaborator
  
let userform = document.getElementById('user');
userform.addEventListener('submit',()=>{
  event.preventDefault();
  let username = userform.name.value;
  let pid = ele.id;

  let userData = {
    "projectId": pid,
    "username": username
  }
  let addurl = "http://localhost:8080/assignproject"

  fetch(addurl,{
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer '+jwtToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(response=>{
    if(response.status == 401){
      window.location.href = "/login/login.html";
    }
    else if(response.status == 400){
      popupAdd.classList.remove('show-popup');
      swal("Error", "Please check email once", "error");
    }
    else{
      return response.json();
    }
    // location.reload(true);
    
  }).then(data=>{
      console.log(data);
      // element = data;
      // localStorage.setItem('project', JSON.stringify(data));
      popupAdd.classList.remove('show-popup');
      swal("Good job!", `${data.name} is assigned to the project`, "success");
      
      func();
  })

})

// adding task
let taskform = document.getElementById('addtask');
taskform.addEventListener('submit',()=>{
  event.preventDefault();
  let date = taskform.date.value;
  var selectedDate = new Date(date);
  var formattedDate = selectedDate.getFullYear() + '/' + 
                      String(selectedDate.getMonth() + 1).padStart(2, '0') + '/' + 
                      String(selectedDate.getDate()).padStart(2, '0');
  date.value = formattedDate;
  
  let taskdata = {
    "taskName": taskform.name.value,
    "about": taskform.about.value,
    "closed": date
  };
  let el = JSON.parse(localStorage.getItem('project'));

  let url = "http://localhost:8080/AddTask/"+el.projectName;
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+jwtToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskdata)
  }).then(response=>{
    
    if(response.status == 401) location.href = '../login/login.html';
    swal("Good job!", `You have added task successfully`, "success");

    return response.json();
  }).then(data=>{
    popuptask.classList.remove('show-popup');
    func();
  })

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