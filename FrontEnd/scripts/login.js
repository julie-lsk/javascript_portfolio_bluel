// Pour afficher le message d'erreur
import {afficherPopup, fermerPopup} from "./message_erreur.js" 

console.log("token : ",window.localStorage.getItem("token")) // vérifie le token


// Gestion du statut de la réponse
function verifStatut(response) 
{
    // Vérifie si la requête est en succès (code HTTP entre 200 et 300)
    if (response.status >= 200 && response.status < 300) 
    {
        return response 
    } 
    else
    {
        throw new Error("Erreur lors de la requête")
    }
} 
// Aide pour gérer le statut de la réponse : https://github.com/JakeChampion/fetch


export function login()
{
    const formLogin = document.querySelector("#form-login")
    formLogin.addEventListener("submit", async (event) =>
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

        try
        {
            // Requête à l'API pour envoyer les infos pour l'auth / 2ème argument de fetch
            const reponse = await fetch("http://localhost:5678/api/users/login",
            {
                method: 'POST', // création d'un new token / dmd d'auth
                headers: {"Content-Type": "application/json"}, // corps de la requête = format json
                body: infosBody // infos utilisateurs
            })

            const data = await verifStatut(reponse).json()
            window.localStorage.setItem('token', data.token) // on stocke le token de la réponse
            window.location.href = "index.html" // renvoi vers la page d'accueil
        }
        catch (erreur)
        {
            console.error("L'adresse mail et/ou le mot de passe ne correspond pas.")
            afficherPopup() // affiche le message d'erreur
        }
    })
}



// Déconnecte l'utilisateur lorsqu'il est sur la page login

export function logout()
{
    // Si l'URL contient "login.html"
    if (window.location.href.includes("login.html"))
    {
        // On retire le token pour déconnecter l'utilisateur
        localStorage.clear() 
    }
}


// Appel des fonctions

login()
fermerPopup()
logout()