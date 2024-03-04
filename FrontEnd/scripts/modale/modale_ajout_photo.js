// Génération de la section "Ajout photo" de la modale



// Import des catégories pour liste déroulante
import { categories } from "../config.js"
import { modale, sectionMiniGalerie, flecheRetour } from "./modale_main.js"



// ********** Création de la section "Ajout photo" **********

// Création de la section d'ajout de nouveaux projets
export const sectionAjoutPhoto = document.createElement("form")
sectionAjoutPhoto.setAttribute("method", "POST")
sectionAjoutPhoto.setAttribute("action", "http://localhost:5678/api/works")
// sectionAjoutPhoto.setAttribute("url", "/upload-picture")
sectionAjoutPhoto.setAttribute("enctype", "multipart/form-data")
sectionAjoutPhoto.classList.add("section-ajout-photo")
sectionAjoutPhoto.style.display = "none"
modale.appendChild(sectionAjoutPhoto)

// Ajout du titre
const titreAjoutPhoto = document.createElement("h3")
titreAjoutPhoto.textContent = "Ajout photo"
sectionAjoutPhoto.appendChild(titreAjoutPhoto)



// ********** Zone de téléchargement de l'image **********

// Ajout de la zone de téléchargement des photos
const conteneurPhoto = document.createElement("div")
conteneurPhoto.classList.add("conteneur-photo")
sectionAjoutPhoto.appendChild(conteneurPhoto)

// Icone image
const imgPhoto = document.createElement("img")
const cheminImgPhoto = "./assets/icons/icone_img.svg"
imgPhoto.src = cheminImgPhoto
conteneurPhoto.appendChild(imgPhoto)



// ********** Bouton de téléchargement de l'image **********

// Label de l'input / contient span + input file
const labelImage = document.createElement("label")
labelImage.classList.add("custom-input") /* pour personnaliser l'input file */
conteneurPhoto.appendChild(labelImage)

// Span/bouton "+ Ajouter photo" - remplace l'input (question de style)
const btnAjoutPhoto = document.createElement("span")
btnAjoutPhoto.textContent = "+ Ajouter photo"
btnAjoutPhoto.id = "btn-ajout-photo"
labelImage.appendChild(btnAjoutPhoto)

// Input de type file qui télécharge l'image
export const inputImage = document.createElement("input")
inputImage.id = "input-image"
inputImage.setAttribute("type", "file")
inputImage.setAttribute("name", "image")
inputImage.setAttribute("accept", ".jpg, .png")
labelImage.appendChild(inputImage)



// Texte d'indication de la taille des img sous le bouton
const indicTaillePhoto = document.createElement("p")
indicTaillePhoto.textContent = "jpg, png : 4mo max"
conteneurPhoto.appendChild(indicTaillePhoto)



// ********** Prévisualisation de l'image **********

// Création de la balise img pour afficher la photo
export const imgAffichee = document.createElement("img")
imgAffichee.setAttribute("src", "#")
imgAffichee.id = "image-affichee"
imgAffichee.style.display = "none"
sectionAjoutPhoto.appendChild(imgAffichee)

// Conteneur qui prévisualisera l'image
const conteneurPhoto2 = document.createElement("div")
conteneurPhoto2.classList.add("conteneur-photo2")
conteneurPhoto2.style.display = "none"
sectionAjoutPhoto.appendChild(conteneurPhoto2)
conteneurPhoto2.appendChild(imgAffichee)



// ********** Champs de saisie du titre **********

// label
const labelTitrePhoto = document.createElement("label")
labelTitrePhoto.textContent = "Titre"
labelTitrePhoto.setAttribute("for", "titre")
sectionAjoutPhoto.appendChild(labelTitrePhoto)

// input
const titrePhoto = document.createElement("input")
titrePhoto.id = "titre"
titrePhoto.setAttribute("type", "text")
titrePhoto.setAttribute("name", "titre")
titrePhoto.setAttribute("required", "required")
sectionAjoutPhoto.appendChild(titrePhoto)



// ********** Liste déroulante **********

// label
const labelCategoriePhoto = document.createElement("label")
labelCategoriePhoto.textContent = "Catégorie"
labelCategoriePhoto.setAttribute("for", "categorie")
sectionAjoutPhoto.appendChild(labelCategoriePhoto)

// select
const listeCategories = document.createElement("select")
listeCategories.id = "categorie"
listeCategories.setAttribute("name", "categorie")
sectionAjoutPhoto.appendChild(listeCategories)

// option
categories.forEach(categorie => 
{
    // On créé 1 balise option par catégorie
    let optionCategories = document.createElement("option")

    // Personnalisation du nom selon la catégorie
    optionCategories.textContent = categorie.name

    // On ajoute la balise option à la balise select
    listeCategories.appendChild(optionCategories)
})



// Ajout de la barre de séparation
const barreSeparation = document.createElement("span")
barreSeparation.id = "barre-span"
sectionAjoutPhoto.appendChild(barreSeparation)



// Bouton "Valider" du formulaire
const btnValiderPhoto = document.createElement("input")
btnValiderPhoto.setAttribute("type", "submit")
btnValiderPhoto.setAttribute("value", "Valider")
btnValiderPhoto.id = "btn-valider"
sectionAjoutPhoto.appendChild(btnValiderPhoto)



let imageUrl




// ********** Fonction de prévisualisation de l'image **********

export const apercuImage = function (e)
{
    // Récup de la balise qui affichera l'image téléchargée
    const image = document.getElementById("image-affichee")

    // Création objet FileList qui contient l'image sélectionnée
    const [picture] = e.target.files

    // Liste des types de fichiers autorisés
    let types = ["image/jpg", "image/jpeg", "image/png"]

    // Vérif si le type de l'image est autorisé
    if (types.includes(picture.type))
    {
        // On enlève le contenu et son conteneur
        conteneurPhoto.style.display = "none"

        // On y ajoute l'image dans un nouveau conteneur (question de style)
        conteneurPhoto2.style.display = "flex"
        imgAffichee.style.display = "flex"
    }

    // Si une image a été sélectionnée
    if (picture)
    {
        // Création d'un objet FileReader pour lire le contenu du fichier/img
        let reader = new FileReader()

        // On déclenche l'event lorsque la lecture du fichier est terminée
        reader.onload = function (e)
        {
            // On change l'URL de l'image
            image.src = e.target.result
        }

        // Lecture de l'image téléchargée sous forme de données URL
        reader.readAsDataURL(picture)

        imageUrl =  e.target.files[0]//URL.createObjectURL(e.target.files[0])
        console.log(imageUrl)
    }
}




// ********** Ouverture de la 2ème section "Ajout photo" **********

const btnAjouterPhoto = document.querySelector(".btn-ajout-photo-galerie")

btnAjouterPhoto.addEventListener("click", () =>
{
    // On retire la section galerie
    sectionMiniGalerie.style.display = "none"

    // On affiche la section "Ajout photo"
    sectionAjoutPhoto.style.display = "flex"
    // On affiche la flèche de retour
    flecheRetour.style.display = "flex"


    // On affiche la zone de téléchargeemnt de photo
    conteneurPhoto.style.display = "flex"
    // On cache la zone qui va afficher l'image plus tard (au téléchargement)
    conteneurPhoto2.style.display = "none"

    // Vide le contenu du champs de saisie du titre de l'img
    titrePhoto.value = ""
})




// ********** Conditions d'envoi du formulaire **********

// Déclenche la vérification lorsque les valeurs changent
inputImage.addEventListener('input', verifierConditionsRemplies)
titrePhoto.addEventListener('input', verifierConditionsRemplies)
listeCategories.addEventListener('change', verifierConditionsRemplies)

function verifierConditionsRemplies() 
{
    // On recherche les valeurs saisies
    const imageUploadee = inputImage.files && inputImage.files.length > 0
    const titreSaisi = titrePhoto.value.trim() !== ''
    const categorieChoisie = listeCategories.value !== ''

    // Vérifiez si toutes les conditions sont remplies
    if (imageUploadee && titreSaisi && categorieChoisie) 
    {
        // Si oui, activez le bouton
        btnValiderPhoto.disabled = false
        // Changez la couleur du bouton en vert
        btnValiderPhoto.style.backgroundColor = '#1D6154'
    } 
    else 
    {
        // Sinon, désactivez le bouton
        btnValiderPhoto.disabled = true
        // Laissez la couleur par défaut du bouton
        btnValiderPhoto.style.backgroundColor = ''
    }
}




// ********** Ajout nouveau projet **********

function ajoutProjet()
{
    sectionAjoutPhoto.addEventListener("submit", async (event) =>
    {
        // Annule le comportement par défaut du nav lors de l'envoi du formulaire
        event.preventDefault()

        const formData = new FormData(this)

        formData.append("image", imageUrl)
        formData.append("title", titrePhoto.value)
        formData.append("category", 1)

        console.log(inputImage.value)
        console.log(titrePhoto.value)
        console.log(listeCategories.value)

        // Récupération du token pour autoriser l'envoi d'un projet
        let token = window.localStorage.getItem("token")

        try
        {
            await fetch("http://localhost:5678/api/works", 
            {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`}, /* Bearer = mode d'auth */
                body: formData
            })
            // Vérifie les données retournées par l'api
            .then(data =>
            {
                console.log(data)
            })

            // window.location.href = "index.html" // renvoi vers la page d'accueil
            /* + lui dire d'actualiser la page pour voir les 12 travaux ? */
        }
        catch (error)
        {
            console.error("Erreur lors de l'envoi du formulaire.", error)
        }

        // this.reset()
    })
}

ajoutProjet()