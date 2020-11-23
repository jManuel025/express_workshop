const init = () => {
    if(!localStorage.getItem('token')) {
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = './signin.html'
        })
        document.querySelector('.btn-primary').addEventListener('click', login)
    }
    else {
        window.location.href = 'pokedex.html'
    }
}

const login = () => {
    const user_mail = document.querySelector('#input-mail').value
    const user_password = document.querySelector('#input-password').value
    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail,
            user_password
        }
    }).then(res => {
        if(res.data.code === 200) {
            localStorage.setItem('token', res.data.message)
            window.location.href = 'pokedex.html'
        } 
        else {
            alert('Usuario o contrasena incorrectos')
        }
    }).catch(err => {
        console.log(err)
    })
}

window.onload = init
