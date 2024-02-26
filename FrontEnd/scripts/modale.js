// Pour génération mini galerie
import {travaux} from "./config.js"


// ********** Création de la modale **********

// Récup de l'élément conteneur qui accueillera la modale
const modaleBackground = document.querySelector(".modale") // <aside>

// Création de la modale
const modale = document.createElement("div")
modale.classList.add("modale-style")
modaleBackground.appendChild(modale)

// Ajoute la croix dans la modale
const croixFermer = document.createElement("img")
const cheminImage = "./assets/icons/croix.svg"
croixFermer.src = cheminImage
croixFermer.id = "croix-fermer"
modale.appendChild(croixFermer)


// ********** Section galerie **********

// Création de la section galerie
const sectionMiniGalerie = document.createElement("div")
sectionMiniGalerie.classList.add("section-galerie")
modale.appendChild(sectionMiniGalerie)

// Ajout du titre
const titreGalerie = document.createElement("h3")
titreGalerie.textContent = "Galerie photo"
sectionMiniGalerie.appendChild(titreGalerie)


// Création d'une div pour gérer les projets
const creerMiniGalerie = document.createElement("div")
creerMiniGalerie.classList.add("mini-gallery")
sectionMiniGalerie.appendChild(creerMiniGalerie)

// Création du bouton "Ajouter une photo"
const btnAjouterPhoto = document.createElement("button")
btnAjouterPhoto.textContent = "Ajouter une photo"
sectionMiniGalerie.appendChild(btnAjouterPhoto)



function miniGalerie ()
{
    // Retire tous les projets pour éviter les doublons
    creerMiniGalerie.innerHTML = ""

    travaux.forEach(projet => 
    {
        // Balise qui contient l'image du projet et l'icone poubelle
        const projetElement = document.createElement("figure")
        creerMiniGalerie.appendChild(projetElement)

        // Met l'image du projet en fond sur la balise figure
        projetElement.style.backgroundImage = "url("+projet.imageUrl+")" // Concatène en 1 seule chaine de caractère

        // Ajout de la petite poubelle
        const suppElement = document.createElement("img")
        const cheminImage = "./assets/icons/poubelle.svg"
        suppElement.src = cheminImage
        suppElement.id = ("poubelle")
        projetElement.appendChild(suppElement)
    })
}


function genererSectionGalerie ()
{
    // // Recherche de la modale pour y insérer la galerie
    // const modale = document.querySelector(".modale-style")

    // // Création du conteneur de tous les éléments de la galerie
    // const sectionMiniGalerie = document.createElement("div")
    // sectionMiniGalerie.classList.add("section-galerie")
    // modale.appendChild(sectionMiniGalerie)

    // // Ajout du titre
    // const titreGalerie = document.createElement("h3")
    // titreGalerie.textContent = "Galerie photo"
    // sectionMiniGalerie.appendChild(titreGalerie)

    // Ajout de la galerie de projet
    miniGalerie()

    // // Création du bouton "Ajouter une photo"
    // const btnAjouterPhoto = document.createElement("button")
    // btnAjouterPhoto.textContent = "Ajouter une photo"
    // sectionMiniGalerie.appendChild(btnAjouterPhoto)
}



function fermerModale()
{
    const croixFermerModale = document.getElementById("croix-fermer")

    croixFermerModale.addEventListener("click", () =>
    {
        // On fait dispparaitre la modale
        const modale = document.querySelector(".modale")
        modale.setAttribute("aria-hidden", true)
        modale.setAttribute('aria-modal', false)
        modale.style.display="none"

        // Ferme la page après 500ms / pour animation
        // window.setTimeout(() =>
        // {
        //     modale.style.display="none"
        // }, 500)
    })
}



function genererModale()
{
    // Ajoute un voile gris autour de la modale
    modaleBackground.classList.add("modale-background")

    genererSectionGalerie()
}



const btnModifier = document.querySelector(".btn-modifier")

// Au clic sur le bouton "Modifier"
btnModifier.onclick = () =>
{
    // On fait apparaitre la modale
    const modale = document.querySelector(".modale")
    modale.setAttribute('aria-hidden', false)
    modale.setAttribute('aria-modal', true)
    modale.style.display = "flex"
    
    genererModale() 
    fermerModale()
}