// Récupération des travaux de l'architecte depuis l'API + conversion en json
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json())

console.log(travaux)

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

        // On créé la balise pour y mettre le titre de l'image
        const nomElement = document.createElement("figcaption")
        nomElement.innerText = projet.title


        // On rattache la balise (qui va contenir notre card) à la section galerie (.gallery)
        sectionGalerie.appendChild(projetElement)
        // On rattache l'image au projet/notre card
        projetElement.appendChild(imageElement)
        // Et on ajoute le texte au projet
        projetElement.appendChild(nomElement)
    }
}

genererGalerie(travaux)