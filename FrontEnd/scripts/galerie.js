// ********** Import des données de l'API **********
import {travaux} from "./config.js";
import {categories} from "./config.js";


console.dir(travaux);
console.log("token : ",window.localStorage.getItem("token")); // vérifie le token



// ********** Galerie - page d'accueil **********

// Création de la galerie à partir des données de l'API
export function genererGalerie (travaux)
{
    travaux.forEach(projet => 
    {
        // Récupération de l'élément du DOM qui accueillera la galerie de projets/travaux
        const sectionGalerie = document.querySelector(".gallery");
        // Création d'une balise dédiée à chaque projet
        const projetElement = document.createElement("figure");

        // On créé une image
        const imageElement = document.createElement("img");
        // On désigne la source de l'image à chercher dans le JSON
        imageElement.src = projet.imageUrl;

        // On créé la balise pour y mettre le titre de l'image
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = projet.title;


        // On rattache la balise (qui va contenir notre card) à la section galerie (.gallery)
        sectionGalerie.appendChild(projetElement);
        // On rattache l'image au projet/notre card
        projetElement.appendChild(imageElement);
        // Et on ajoute le texte au projet
        projetElement.appendChild(nomElement);
    })
}



// ********** Création des filtres **********

// Ajout de l'écouteur d'événement sur les boutons de filtres
function filtrer (boutonElement, nomCategorie)
{
    boutonElement.addEventListener('click', () => 
    {
        const projetsFiltres = travaux.filter(function (projet)
        {
            // On cherche les projets ayant la même catégorie
            return projet.category.name === nomCategorie;
        });
        
        document.querySelector(".gallery").innerHTML = ""; // on retire tous les projets 

        genererGalerie(projetsFiltres); // on ajoute les projets correspondant au filtre
    })
}



// ********** Boutons de filtres **********

// Création des boutons de filtres et ajout de l'écouteur d'événement
function genererFiltres(categories)
{
    const sectionFiltres = document.querySelector(".filtres");

    categories.forEach(categorie => 
    {
        let boutonElement = document.createElement("button");
        // On ajoute du texte à notre bouton
        boutonElement.textContent = categorie.name;
        // On ajoute un écouteur d'événement 
        filtrer(boutonElement, categorie.name); // categorie.name = nomCategorie
        sectionFiltres.appendChild(boutonElement);
    })
}



// ********** Filtre "Tous" **********

const boutonFiltrerTous = document.getElementById("btn-tous");
boutonFiltrerTous.addEventListener('click', () => 
{
    document.querySelector(".gallery").innerHTML = "";

    genererGalerie(travaux); // on ajoute TOUS les projets
})



// ********** Page d'accueil en "Mode édition" **********

export function modifierPageAccueil()
{
    const token = window.localStorage.getItem("token");

    // Si un token est stocké, l'utilisateur est connecté
    if (token)
    {
        // Retire "login" 
        const login = document.getElementById("login");
        login.classList.add("desactive");

        // Ajoute "logout"
        const logout = document.querySelector(".logout");
        logout.classList.remove("desactive");

        // Ajoute le mode édition
        const modeEdition = document.querySelector(".mode-edition");
        modeEdition.classList.remove("desactive");

        // Supprime les filtres
        const boutonsFiltres = document.querySelectorAll(".filtres");
        boutonsFiltres.forEach(bouton => 
        {
            bouton.remove(); // On enlève chaque bouton
        })

        // Ajoute le bouton "modifier" à côté du titre
        const btnModifier = document.querySelector(".btn-modifier");
        btnModifier.classList.remove("desactive");
    }
}


// ********** Appel des fonctions **********

genererGalerie(travaux);
genererFiltres(categories);
modifierPageAccueil();
