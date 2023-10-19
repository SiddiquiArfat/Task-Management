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

let cont = document.getElementById('main');
let jwtToken = localStorage.getItem('jwtToken');

let ele = JSON.parse(localStorage.getItem('task'));



    let url = "http://localhost:8080/Task/" + ele.id;
fetch(url, {
    method: "GET",
    headers: {
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.status == 401) {
        console.log("please login");
        window.location.href = "../login/login.html";
    }
    return response.json();
})
    .then(data => {
        // console.log(data);
        fun(data);
    })
    .catch(error => {
        console.error(error);
    });






// console.log(task);
const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function fun(element) {
    console.log(element);
    cont.innerHTML = "";
    cont.style.fontSize = "20px";
    cont.style.fontWeight = "100";
    let h2 = document.createElement('h2');
    h2.textContent = element.taskName;

    let a = element.ldt;
    console.log(a.substring(0, 4));
    let z = a.substring(5, 7);
    let h4 = document.createElement('h5');
    h4.textContent = 'Created On: ' + a.substring(8) + ' ' + month[z - 1] + ', ' + a.substring(0, 4);

    let a1 = element.closed;
    console.log(a1.substring(0, 4));
    let z1 = a1.substring(5, 7);
    let h6 = document.createElement('h5');
    h6.textContent = 'Deadline: ' + a1.substring(8) + ' ' + month[z1 - 1] + ', ' + a1.substring(0, 4);

    let h5 = document.createElement('h5');
    let button = document.createElement('button');
    button.id = "status";
    if (element.status == "CLOSE") {
        button.style.backgroundColor = "green";
        button.textContent = "completed";
    }
    else {
        button.style.backgroundColor = "orange";
        button.textContent = "Progress";
    }
    h5.textContent = 'Status: ';
    let btn = document.createElement('button');
    btn.textContent = 'Change';
    btn.className = "beautiful-button";

    btn.addEventListener('click', () => {
        funchange(element);
    })
    btn.style.marginLeft = "20px";
    let p = document.createElement('p');
    if(element.timestamp != null) {
        p.textContent = element.timestamp;
    }
    p.style.fontSize = '15px';
    p.style.color = 'grey';
    h5.append(button, btn, p);

    let h8 = document.createElement('h5');
    h8.textContent = 'Admin: ' + element.user.name;

    let h7 = document.createElement('h5');
    h7.textContent = 'About: ';
    let textarea = document.createElement('textarea');
    textarea.textContent = element.about;
    textarea.style.width = "90%"
    textarea.style.height = "100px";
    textarea.style.borderRadius = "10px";
    textarea.style.padding = "10px";
    textarea.style.background = "transparent";
    textarea.readOnly = true;
    // h7.append(textarea);
    cont.append(h2, h4, h6, h5, h8, h7, textarea);
}
// fun(ele)

function funchange(element) {
    if (element.status == "CLOSE") {
        let url = "http://localhost:8080/TaskOpen/" + element.id;
        fetch(url, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + jwtToken,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 401) {
                console.log("please login");
                window.location.href = "../login/login.html";
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                element = data;
                fun(data);
            })
            .catch(error => {
                console.error(error);
         });
    }
    else {

        let url = "http://localhost:8080/TaskClose/" + element.id;
        fetch(url, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + jwtToken,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 401) {
                console.log("please login");
                window.location.href = "../login/login.html";
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                fun(data);
            })
            .catch(error => {
                console.error(error);
         });

    }
}



// popup update
const showPopupBtn = document.getElementById('showPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');

// Show the popup when the button is clicked
showPopupBtn.addEventListener('click', () => {
    console.log('click');
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

// update Task


let updateForm = document.getElementById('updateform');

// let updatename = document.getElementById('')

updateForm.addEventListener('submit', () => {
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
    let url = "http://localhost:8080/updateTask/" + ele.id;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(response => {
        if (response.status == 401) {
            window.location.href = "../login/login.html";
        }
        return response.json();
    }).then(data => {
        element = data;
        localStorage.setItem('task', JSON.stringify(data));
        popup.classList.remove('show-popup');
        fun(data);
        return data;
    })
    console.log(date);
})


// delete
// delete project

let deletebtn = document.getElementById('deletebtn');
deletebtn.addEventListener('submit', () => {
    event.preventDefault();
    let deleteurl = "http://localhost:8080/deleteTask/" + ele.id;

    fetch(deleteurl, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + jwtToken,
            //   'Content-Type': 'application.json'
        }
    }).then(response => {
        if (response.status == 401) {
            window.location.href = "../login/login.html";
        }
        window.location.href = "../website/Task.html";
        return response.json();
    }).then(data => {
        console.log(data);

    })
})

const popuptask = document.getElementById('popupDelete');
const closebtntask = document.getElementById('closePopupBtnDelete');
const delete1 = document.getElementById('showPopupBtnDelete');
delete1.addEventListener('click', () => {
    popuptask.classList.add('show-popup');
})
closebtntask.addEventListener('click', () => {
    popuptask.classList.remove('show-popup');
});
// Close the popup when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === popuptask) {
        popuptask.classList.remove('show-popup');
    }
});