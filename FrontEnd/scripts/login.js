import { afficherPopup } from "./popup.js"

// Gestion du statut de la réponse
function checkStatus(response) 
{
    // Vérifie si la requête est en succès (code HTTP entre 200 et 300)
    if (response.status >= 200 && response.status < 300) 
    {
        return response 
    } 
    else
    {
        // Affiche un message d'erreur
        afficherPopup()
    }
} 
// Aide pour gérer le statut de la réponse : https://github.com/JakeChampion/fetch


export function login()
{
    const formLogin = document.querySelector("#form-login")
    formLogin.addEventListener( "submit", (event) =>
    {
        // Annule le comportement par défaut du nav lors de l'envoi du formulaire
        event.preventDefault()

        // On récup les infos sur l'utilisateur (mises dans un objet)
        const infosUtilisateurs = 
        {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value
        }

        const infosBody = JSON.stringify(infosUtilisateurs)

        // Requête à l'API pour envoyer les infos pour l'auth / 2ème argument de fetch
        fetch("http://localhost:5678/api/users/login",
        {
            method: 'POST', // création d'un new token / dmd d'auth
            headers: {"Content-Type": "application/json"}, // corps de la requête = format json
            body: infosBody // infos utilisateurs
        })
        .then(checkStatus) // on vérifie le statut de la réponse
        .then(response => response.json()) // conversion en json
        .then(response =>
        {
            window.localStorage.setItem('token', response.token) // on stocke le token de la réponse
            window.location.href = "index.html" // renvoi vers la page d'accueil
        })
    })
}

login()