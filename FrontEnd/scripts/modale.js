import {travaux} from "./config.js"

// Récup de l'élément conteneur qui accueillera la modale
const modaleBackground = document.querySelector(".modale") // <aside>



function miniGalerie ()
{
    // Recherche de la section "Galerie photo"
    const sectionMiniGalerie = document.querySelector(".section-galerie")
    
    // Création d'une div pour gérer les projets
    const miniGalerie = document.createElement("div")
    miniGalerie.classList.add("mini-gallery")
    sectionMiniGalerie.appendChild(miniGalerie)

    travaux.forEach(projet => 
    {
        // Balise qui contient l'image et l'icone poubelle/supp
        const projetElement = document.createElement("figure")
        miniGalerie.appendChild(projetElement)

        // Concatène l'URL en 1 seule chaine de caractère
        projetElement.style.backgroundImage = "url("+projet.imageUrl+")" 

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
    // Recherche de la modale pour y insérer la galerie
    const modale = document.querySelector(".modale-style")

    // Création du conteneur de tous les éléments de la galerie
    const sectionMiniGalerie = document.createElement("div")
    sectionMiniGalerie.classList.add("section-galerie")
    modale.appendChild(sectionMiniGalerie)

    // Ajout du titre
    const titreGalerie = document.createElement("h3")
    titreGalerie.textContent = "Galerie photo"
    sectionMiniGalerie.appendChild(titreGalerie)

    // Ajout de la galerie de projet
    miniGalerie()

    // Création du bouton "Ajouter une photo"
    const btnAjouterPhoto = document.createElement("button")
    btnAjouterPhoto.textContent = "Ajouter une photo"
    sectionMiniGalerie.appendChild(btnAjouterPhoto)
}


function genererModale()
{
    // Ajoute d'un effet autour de la modale
    modaleBackground.classList.add("modale-background")

    // Création de la modale
    const modale = document.createElement("div")
    modale.classList.add("modale-style")
    modaleBackground.appendChild(modale)
    
    // Ajout de la croix dans la modale
    const croixFermer = document.createElement("img")
    const cheminImage = "./assets/icons/croix.svg"
    croixFermer.src = cheminImage
    croixFermer.id = "croix-fermer"
    modale.appendChild(croixFermer)

    genererSectionGalerie()

    // fonction qui génère le contenu selon des addEventListener

}


function modaleEventListener()
{
    const btnModifier = document.querySelector(".btn-edition")

    btnModifier.addEventListener("click", () =>
    {
        const modale = document.querySelector(".modale")
        modale.classList.remove("desactive")

        genererModale()
    })
}

modaleEventListener()