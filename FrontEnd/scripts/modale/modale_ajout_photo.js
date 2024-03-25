
// ********** Génération de la section "Ajout photo" de la modale **********



// Import des variables et fonctions
import { categories, travaux } from "../config.js";
import { genererGalerie } from "../galerie.js";
import { afficherPopup, fermerPopup } from "../message_erreur.js";
import { modale, sectionMiniGalerie, flecheRetour } from "./modale_main.js";



// ********** Création de la section "Ajout photo" **********

// Création de la section d'ajout de nouveaux projets
export const sectionAjoutPhoto = document.createElement("form");
sectionAjoutPhoto.setAttribute("method", "POST");
sectionAjoutPhoto.setAttribute("enctype", "multipart/form-data");
sectionAjoutPhoto.classList.add("section-ajout-photo");
sectionAjoutPhoto.style.display = "none";
sectionAjoutPhoto.addEventListener('submit', (e) => {e.preventDefault()});
modale.appendChild(sectionAjoutPhoto);

// Ajout du titre
const titreAjoutPhoto = document.createElement("h3");
titreAjoutPhoto.textContent = "Ajout photo";
sectionAjoutPhoto.appendChild(titreAjoutPhoto);



// ********** Zone de téléchargement de l'image **********

// Ajout de la zone de téléchargement des photos
const conteneurPhoto = document.createElement("div");
conteneurPhoto.classList.add("conteneur-photo");
sectionAjoutPhoto.appendChild(conteneurPhoto);

// Icone image
const imgPhoto = document.createElement("img");
const cheminImgPhoto = "./assets/icons/icone_img.svg";
imgPhoto.src = cheminImgPhoto;
conteneurPhoto.appendChild(imgPhoto);



// ********** Bouton de téléchargement de l'image **********

// Label de l'input / contient span + input file
const labelImage = document.createElement("label");
labelImage.classList.add("custom-input"); /* pour personnaliser l'input file */
conteneurPhoto.appendChild(labelImage);

// Span/bouton "+ Ajouter photo" - remplace l'input (question de style)
const btnAjoutPhoto = document.createElement("span");
btnAjoutPhoto.textContent = "+ Ajouter photo";
btnAjoutPhoto.id = "btn-ajout-photo";
labelImage.appendChild(btnAjoutPhoto);

// Input de type file qui télécharge l'image
export const inputImage = document.createElement("input");
inputImage.id = "input-image";
inputImage.setAttribute("type", "file");
inputImage.setAttribute("name", "image");
inputImage.setAttribute("accept", ".jpg, .png");
labelImage.appendChild(inputImage);



// Texte d'indication de la taille des img sous le bouton
const indicTaillePhoto = document.createElement("p");
indicTaillePhoto.textContent = "jpg, png : 4mo max";
conteneurPhoto.appendChild(indicTaillePhoto);



// ********** Prévisualisation de l'image **********

// Création de la balise img pour afficher la photo
export const imgAffichee = document.createElement("img");
imgAffichee.setAttribute("src", "#");
imgAffichee.id = "image-affichee";
imgAffichee.style.display = "none";
sectionAjoutPhoto.appendChild(imgAffichee);

// Conteneur qui prévisualisera l'image
const conteneurPhoto2 = document.createElement("div");
conteneurPhoto2.classList.add("conteneur-photo2");
conteneurPhoto2.style.display = "none";
sectionAjoutPhoto.appendChild(conteneurPhoto2);
conteneurPhoto2.appendChild(imgAffichee);



// ********** Champs de saisie du titre **********

// label
const labelTitrePhoto = document.createElement("label");
labelTitrePhoto.textContent = "Titre";
labelTitrePhoto.setAttribute("for", "titre");
sectionAjoutPhoto.appendChild(labelTitrePhoto);

// input
const titrePhoto = document.createElement("input");
titrePhoto.id = "titre";
titrePhoto.setAttribute("type", "text");
titrePhoto.setAttribute("name", "titre");
sectionAjoutPhoto.appendChild(titrePhoto);



// ********** Liste déroulante **********

// label
const labelCategoriePhoto = document.createElement("label");
labelCategoriePhoto.textContent = "Catégorie";
labelCategoriePhoto.setAttribute("for", "categorie");
sectionAjoutPhoto.appendChild(labelCategoriePhoto);

// select
const listeCategories = document.createElement("select");
listeCategories.id = "categorie";
listeCategories.setAttribute("name", "categorie");
sectionAjoutPhoto.appendChild(listeCategories);

// option
const optionCacheeCategories = document.createElement("option");
optionCacheeCategories.textContent = ""; /* option vide */
listeCategories.appendChild(optionCacheeCategories);

categories.forEach(categorie => 
{
    // On créé 1 balise option par catégorie
    let optionCategories = document.createElement("option");

    // Personnalisation du nom selon la catégorie
    optionCategories.textContent = categorie.name;

    // On ajoute la balise option à la balise select
    listeCategories.appendChild(optionCategories);
});



// Ajout de la barre de séparation
const barreSeparation = document.createElement("span");
barreSeparation.id = "barre-span";
sectionAjoutPhoto.appendChild(barreSeparation);



// Bouton "Valider" du formulaire
const btnValiderPhoto = document.createElement("input");
btnValiderPhoto.setAttribute("type", "submit");
btnValiderPhoto.setAttribute("value", "Valider");
btnValiderPhoto.id = "btn-valider";
btnValiderPhoto.addEventListener('submit', (e) => {e.preventDefault()});
sectionAjoutPhoto.appendChild(btnValiderPhoto);



export let imageUrl;



// ********** Fonction de prévisualisation de l'image + vérif taille **********

export const apercuImage = function (e)
{
    // Récup de la balise qui affichera l'image téléchargée
    const image = document.getElementById("image-affichee");

    // Création tableau FileList qui contient l'image sélectionnée
    const [picture] = e.target.files;

    // Liste des types de fichiers autorisés
    let types = ["image/jpg", "image/jpeg", "image/png"];


    // Vérification du type de l'image
    if (!types.includes(picture.type))
    {
        // Si taille > 4mo
        alert("Le type de l'image n'est pas autorisé.");
    }

    let tailleMax = 4 * 1024 * 1024; /* 4mo en bytes */

    // Vérification de la taille de l'image
    if (picture.size >= tailleMax)
    {
        // Si taille > 4mo
        alert("La taille de l'image ne doit pas dépasser 4mo.");
        return;
    }

    // Si le type et la taille de l'image sont autorisés 
    // On enlève le contenu et son conteneur
    conteneurPhoto.style.display = "none";

    // On y ajoute l'image dans un nouveau conteneur (question de style)
    conteneurPhoto2.style.display = "flex";
    imgAffichee.style.display = "flex";

    // Création d'un objet FileReader pour lire le contenu du fichier/img
    let reader = new FileReader();

    // On déclenche l'event lorsque la lecture du fichier est terminée
    reader.onload = function (e)
    {
        // On change l'URL de la balise image
        image.src = e.target.result;
    };

    // Lecture de l'image téléchargée sous forme de données URL
    reader.readAsDataURL(picture);
    // Sélectionne la 1ère image de l'input file 
    imageUrl = e.target.files[0];
}
// Fonction appelée au clic sur btn "+ Ajouter photo" - modale_main.js





// ********** Vérif des champs de saisie lors du submit **********

// Vérifie si les champs sont remplis lors de l'envoi du new projet
function initEvent()
{
    // Le bouton devient vert quand tout est rempli
    let modifBtnCouleur = function ()
    {
        // Si les 3 champs sont remplis
        if (!(titrePhoto.value === '' || listeCategories.value === '' || inputImage.files.length === 0))
        {
            // Le boutton devient vert
            btnValiderPhoto.style.backgroundColor = '#1D6154'; /* vert */
        }
        else
        {
            // Sinon, il reste gris
            btnValiderPhoto.style.backgroundColor = '#A7A7A7'; /* gris */
        }
    }

    // On vérifie à chaque envoi du formulaire
    btnValiderPhoto.addEventListener("click", (event) =>
    {
        event.preventDefault();

        // Si 1 (ou +) des champs n'est pas rempli
        if (titrePhoto.value === '' || listeCategories.value === '' || inputImage.files.length === 0)
        {
            afficherPopup();
        }

        // Si non, on ajoute le projet
        ajoutProjet();
    })
    
    // A chaque modif, on vérifie les champs 
    titrePhoto.addEventListener("input", modifBtnCouleur);
    listeCategories.addEventListener("change", modifBtnCouleur);
    inputImage.addEventListener("input", modifBtnCouleur);
}

initEvent();





// ********** Attribution des id selon la catégorie **********

function idCategorie (categoryName)
{
    // categoryName est initialisé dans la fonction ajoutProjet

    switch (categoryName)
    {
        // Attribution des id selon le nom des catégories
        case "Objets" : return 1;
        case "Appartements" : return 2;
        case "Hotels & restaurants" : return 3;
        default : return null;
    }
}




// ********** Ajout nouveau projet **********

async function ajoutProjet()
{
    const formData = new FormData();

    let categoryName = listeCategories.value;
    // Appel de la fonction qui détermine l'id selon la catégorie
    let categorieId = idCategorie(categoryName);

    formData.append("image", imageUrl);
    formData.append("title", titrePhoto.value);
    formData.append("category", categorieId);

    // Récupération du token pour autoriser l'envoi d'un projet
    let token = window.localStorage.getItem("token");

    try
    {
        const response = await fetch("http://localhost:5678/api/works", 
        {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`}, /* Bearer = mode d'auth */
            body: formData
        });

        // Vérifie si la requête est en succès (code HTTP entre 200 et 300)
        if (response.status >= 200 && response.status < 300) 
        {
            // Ajout du projet en JSON dans la variable
            travaux.push(await response.json());

            alert("Statut de la requête : " + response.statusText);
            document.querySelector(".gallery").innerHTML = "";
            genererGalerie(travaux);
        }
    }
    catch (erreur)
    {
        console.error("Erreur lors de l'envoi du formulaire : " + erreur);
    }
}




// ********** Ouverture de la 2ème section "Ajout photo" **********

const btnAjouterPhoto = document.querySelector(".btn-ajout-photo-galerie");

btnAjouterPhoto.addEventListener("click", () =>
{
    // On retire la section galerie
    sectionMiniGalerie.style.display = "none";

    // On affiche la section "Ajout photo"
    sectionAjoutPhoto.style.display = "flex";
    // On affiche la flèche de retour
    flecheRetour.style.display = "flex";


    // On affiche la zone de téléchargeemnt de photo
    conteneurPhoto.style.display = "flex";
    // On cache la zone qui va afficher l'image plus tard (au téléchargement)
    conteneurPhoto2.style.display = "none";

    // Vide le contenu du champs de saisie du titre de l'img
    titrePhoto.value = "";
});




// ********** Appel des fonctions **********

idCategorie();
fermerPopup();