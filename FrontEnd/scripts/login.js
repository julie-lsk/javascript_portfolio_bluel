export function login()
{
    const formLogin = document.querySelector("#form-login")
    formLogin.addEventListener( "submit", (event) =>
    {
        event.preventDefault()

        const infosUtilisateurs = 
        {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        }

        const infosBody = JSON.stringify(infosUtilisateurs)

        let response = fetch("http://localhost:5678/api/users/login",
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: infosBody
        })

        if (response) 
        {
            
        }
        else if (condition)
        {

        }
    })
}

login()