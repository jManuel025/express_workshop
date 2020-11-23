const init = () => {

    if(!localStorage.getItem('token')) {
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = './login.html'
        })
        document.querySelector('.btn-primary').addEventListener('click', signin)
    }
    else {
        window.location.href = 'pokedex.html'
    }
}

const signin = () => {
    const user_name = document.querySelector('#input-name').value
    const user_mail = document.querySelector('#input-mail').value
    const user_password = document.querySelector('#input-password').value
    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name,
            user_mail,
            user_password
        }
    }).then(res => {
        console.log(res)
        window.location.href = './login.html'
    }).catch(err => {
        console.log(err)
    })
}

window.onload = init
