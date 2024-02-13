// Import des données de l'API
import {travaux} from "./config.js"
import {categories} from "./config.js"


// Création de la galerie à partir des données de l'API
function genererGalerie (travaux)
{
    travaux.forEach(projet => 
    {
        // Récupération de l'élément du DOM qui accueillera la galerie de projets/travaux
        const sectionGalerie = document.querySelector(".gallery")
        // Création d'une balise dédiée à chaque projet
        const projetElement = document.createElement("figure")

        // On créé une image
        const imageElement = document.createElement("img")
        // On désigne la source de l'image à chercher dans le JSON
        imageElement.src = projet.imageUrl

        // On créé la balise pour y mettre le titre de l'image
        const nomElement = document.createElement("figcaption")
        nomElement.innerText = projet.title


        // On rattache la balise (qui va contenir notre card) à la section galerie (.gallery)
        sectionGalerie.appendChild(projetElement)
        // On rattache l'image au projet/notre card
        projetElement.appendChild(imageElement)
        // Et on ajoute le texte au projet
        projetElement.appendChild(nomElement)
    })
}

genererGalerie(travaux)



// Ajout de l'écouteur d'événement sur les boutons de filtres
function filtrer (boutonElement, nomCategorie)
{
    boutonElement.addEventListener('click', () => 
    {
        const projetsFiltres = travaux.filter(function (projet)
        {
            // On cherche les projets ayant la même catégorie
            return projet.category.name === nomCategorie 
        })
        
        document.querySelector(".gallery").innerHTML = "" // on retire tous les projets 

        genererGalerie(projetsFiltres) // on ajoute les projets correspondant au filtre
    })
}



// Création des boutons de filtres et de l'écouteur d'événement
function genererFiltres(categories)
{
    const sectionFiltres = document.querySelector(".filtres")

    categories.forEach(categorie => 
    {
        let boutonElement = document.createElement("button")
        // On ajoute du texte à notre bouton
        boutonElement.textContent = categorie.name
        // On ajoute un écouteur d'événement 
        filtrer(boutonElement, categorie.name)
        sectionFiltres.appendChild(boutonElement)
    })
}

genererFiltres(categories)



//********** Filtre "Tous" **********
const boutonFiltrerTous = document.getElementById("btn-tous")
boutonFiltrerTous.addEventListener('click', () => 
{
    document.querySelector(".gallery").innerHTML = ""
    genererGalerie(travaux) // on ajoute TOUS les projets
})
