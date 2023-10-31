
    let form = document.getElementById('contact');
    form.addEventListener('submit', () => {
        event.preventDefault();
        let data = {
            "email": form.email.value,
            "name": form.name.value,
            "message": form.message.value
        };
        console.log(data);
        fetch("http://localhost:8080/contact", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                swal("Done!", "Message Sent!", "success").then(response=>{
                    window.location.href = "index.html";
                })
            }
            return response.json();
        })
    })