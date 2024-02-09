// Récupération des travaux de l'architecte depuis l'API
const reponse = await fetch("http://localhost:5678/api/works")
travaux = await reponse.json(); //on convertit la réponse en JSON


// Création de la galerie à partir des données de l'API
function genererGalerie (travaux)
{
    for (let i = 0 ; i < travaux.length ; i++)
    {
        const projet = travaux[i]

        // Récupération de l'élément du DOM qui accueillera la galerie de projets/travaux
        const sectionGalerie = document.querySelector(".gallery")
        // Création d'une balise dédiée à chaque projet
        const projetElement = document.createElement("figure")

        // On créé une image
        const imageElement = document.createElement("img")
        // On désigne la source de l'image à chercher dans le JSON
        imageElement.src = projet.imageUrl

        // On créé la balise pour y mettre le nom de l'image
        const nomElement = document.createElement("figcaption")
        nomElement.innerText = projet.title
    }
}