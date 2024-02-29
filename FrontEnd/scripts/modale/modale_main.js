// Contient la 1ère page "Galerie photo" de la modale



// Import des fonctions/données
import { travaux } from "../config.js"
import { sectionAjoutPhoto } from "./modale_ajout_photo.js"



// Récup de l'élément conteneur qui accueillera la modale
const modaleBackground = document.querySelector(".modale") // <aside>


// ********** Création de la modale **********

// Création de la modale
export const modale = document.createElement("div")
modale.classList.add("modale-style")
modaleBackground.appendChild(modale)

// Ajout la croix dans la modale
const croixFermer = document.createElement("img")
const cheminImage = "./assets/icons/croix.svg"
croixFermer.src = cheminImage
croixFermer.id = "croix-fermer"
modale.appendChild(croixFermer)



// ********** Création de la section galerie **********

// Création de la section galerie
export const sectionMiniGalerie = document.createElement("div")
sectionMiniGalerie.classList.add("section-galerie")
modale.appendChild(sectionMiniGalerie)

// Ajout du titre
const titreGalerie = document.createElement("h3")
titreGalerie.textContent = "Galerie photo"
sectionMiniGalerie.appendChild(titreGalerie)

// Création de la mini galerie
const creerMiniGalerie = document.createElement("div")
creerMiniGalerie.classList.add("mini-gallery")
sectionMiniGalerie.appendChild(creerMiniGalerie)

// Création du bouton "Ajouter une photo"
const btnAjouterPhoto = document.createElement("button")
btnAjouterPhoto.textContent = "Ajouter une photo"
btnAjouterPhoto.classList.add("btn-ajout-photo-galerie")
sectionMiniGalerie.appendChild(btnAjouterPhoto)



export function miniGalerie ()
{
    // Fait apparaitre la galerie (par défaut en display: none;)
    sectionMiniGalerie.style.display = "flex"
    sectionAjoutPhoto.style.display = "none"
    
    // Retire tous les projets pour éviter les doublons /*  A REVOIR PLUS TARD ??? */
    creerMiniGalerie.innerHTML = ""

    // Génère la galerie de projet
    travaux.forEach(projet => 
    {
        // Balise qui contient l'image du projet et l'icone poubelle
        const projetElement = document.createElement("figure")
        creerMiniGalerie.appendChild(projetElement)

        // Met l'image du projet en fond sur la balise figure
        projetElement.style.backgroundImage = `url(${projet.imageUrl})` // Concatène en 1 seule chaine de caractère

        // Ajout de la petite poubelle
        const suppElement = document.createElement("img")
        const cheminImage = "./assets/icons/poubelle.svg"
        suppElement.src = cheminImage
        suppElement.id = ("poubelle")
        projetElement.appendChild(suppElement)
    })
}



// ********** Ecouteur d'événement sur le bouton "Modifier" **********

const btnModifier = document.querySelector(".btn-modifier")

// Au clic sur le bouton "Modifier"
btnModifier.onclick = () =>
{
    // On fait apparaitre la modale
    modaleBackground.setAttribute('aria-hidden', false)
    modaleBackground.setAttribute('aria-modal', true)
    modaleBackground.style.display = "flex"

    // Ajoute un voile gris autour de la modale
    modaleBackground.classList.add("modale-background")

    // Ajout de la galerie
    miniGalerie()
}




// ********** Fermeture de la modale **********

const croixFermerModale = document.getElementById("croix-fermer")

function fermerModale ()
{
    // On fait dispparaitre la modale
    modaleBackground.setAttribute("aria-hidden", true)
    modaleBackground.setAttribute('aria-modal', false)

    // Ferme la modale après 300ms / pour animation
    window.setTimeout(() =>
    {
        modaleBackground.style.display="none"
    }, 300)
}


// Au clic sur la croix, la modale se ferme
croixFermerModale.addEventListener("click", fermerModale)


// La modale se ferme quand on clique ailleurs
modaleBackground.addEventListener("click", (event) =>
{
    if (event.target === modaleBackground)
    {
        fermerModale()
    }
})