// Génération de la section "Ajout photo" de la modale



// Import des catégories pour liste déroulante
import { categories } from "../config.js"
import { modale } from "./modale_main.js"
import { sectionMiniGalerie } from "./modale_main.js"


// TEST A REVOIR - COMMIT AVANT GROSSES MODIFS
function ajoutProjet()
{
    const formAjoutProjet = document.querySelector(".champsSaisie")
    formAjoutProjet.addEventListener("submit", async (event) =>
    {
        // Annule le comportement par défaut du nav lors de l'envoi du formulaire
        event.preventDefault()

        // On récup les infos sur l'utilisateur (mises dans un objet)
        const infosProjets = 
        {
            image: event.target.querySelector("[name=email]").value,
            title: event.target.querySelector("[name=password]").value,
            category: event.target.querySelector("[name=password]").value
        }

        const infosBody = JSON.stringify(infosProjets)

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



// ********** Création de la section "Ajout photo" **********

// Création de la section d'ajout de nouveaux projets
export const sectionAjoutPhoto = document.createElement("div")
sectionAjoutPhoto.classList.add("section-ajout-photo")
sectionAjoutPhoto.style.display = "none"
modale.appendChild(sectionAjoutPhoto)


// Ajout du titre
const titreAjoutPhoto = document.createElement("h3")
titreAjoutPhoto.textContent = "Ajout photo"
sectionAjoutPhoto.appendChild(titreAjoutPhoto)



// Ajout de la zone d'ajout des photos
const conteneurPhoto = document.createElement("div")
conteneurPhoto.classList.add("conteneur-photo")
sectionAjoutPhoto.appendChild(conteneurPhoto)

// Icone image
const imgPhoto = document.createElement("img")
const cheminImgPhoto = "./assets/icons/icone_img.svg"
imgPhoto.src = cheminImgPhoto
conteneurPhoto.appendChild(imgPhoto)

// Bouton "+ Ajouter photo"
const btnAjoutPhoto = document.createElement("button")
btnAjoutPhoto.textContent = "+ Ajouter photo"
btnAjoutPhoto.id = "btn-ajout-photo"
conteneurPhoto.appendChild(btnAjoutPhoto)

// Texte d'indication de la taille des img sous le bouton
const indicTaillePhoto = document.createElement("p")
indicTaillePhoto.textContent = "jpg, png : 4mo max"
conteneurPhoto.appendChild(indicTaillePhoto)



// Création du formulaire
const champsSaisie = document.createElement("form")
champsSaisie.setAttribute("method", "POST")
champsSaisie.classList.add("champs-saisie")
sectionAjoutPhoto.appendChild(champsSaisie)

// Champs de saisie du titre de l'img
// label
const labelTitrePhoto = document.createElement("label")
labelTitrePhoto.textContent = "Titre"
labelTitrePhoto.setAttribute("for", "titre")
champsSaisie.appendChild(labelTitrePhoto)
// input
const titrePhoto = document.createElement("input")
titrePhoto.id = "titre"
titrePhoto.setAttribute("type", "text")
titrePhoto.setAttribute("name", "titre")
titrePhoto.setAttribute("required", "required")
champsSaisie.appendChild(titrePhoto)

// Création de la liste déroulante contenant les catégories
// label
const labelCategoriePhoto = document.createElement("label")
labelCategoriePhoto.textContent = "Catégorie"
labelCategoriePhoto.setAttribute("for", "categorie")
champsSaisie.appendChild(labelCategoriePhoto)
// select
const listeCategories = document.createElement("select")
listeCategories.id = "categorie"
listeCategories.setAttribute("name", "categorie")
champsSaisie.appendChild(listeCategories)
// option
categories.forEach(categorie => 
{
    // 1 balise option / catégorie
    let optionCategories = document.createElement("option")
    // Ajout du nom de la catégorie / option
    optionCategories.textContent = categorie.name
    listeCategories.appendChild(optionCategories)
})

// Ajout de la barre de séparation
const barreSeparation = document.createElement("span")
barreSeparation.id = "barre-span"
champsSaisie.appendChild(barreSeparation)

// Bouton "valider"
const btnValiderPhoto = document.createElement("input")
btnValiderPhoto.setAttribute("type", "submit")
btnValiderPhoto.setAttribute("value", "Valider")
btnValiderPhoto.id = "btn-valider"
champsSaisie.appendChild(btnValiderPhoto) /* inclu dans le form */




// ********** Ouverture de la 2ème section "Ajout photo" **********

const btnAjouterPhoto = document.querySelector(".btn-ajout-photo-galerie")

btnAjouterPhoto.addEventListener("click", () =>
{
    // On retire la section galerie
    sectionMiniGalerie.style.display = "none"

    // On affiche la section "Ajout photo"
    sectionAjoutPhoto.style.display = "flex"
})