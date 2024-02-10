// Récupération des travaux de l'architecte depuis l'API + conversion des données en JSON
export const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json())

console.log(travaux)

// Création de la galerie à partir des données de l'API
function genererGalerie (travaux)
{
    // const projetsAjoutes = new Set()

    travaux.forEach(projet => 
    {
        // // Vérifier si le projet n'existe pas dans les projets ajoutés
        // if (!projetsAjoutes.has(projet.id)) 
        // {
        //     // Ajoute l'identifiant du projet à la liste des projets ajoutés
        //     projetsAjoutes.add(projet.id)

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
        // }
    })
}

genererGalerie(travaux)




//********** Filtre "Tous" **********

const boutonFiltrerTous = document.getElementById("btn-tous")
// Création d'un tableau pour stocker les id des projets déjà ajoutés :

boutonFiltrerTous.addEventListener('click', () => 
{
    document.querySelector(".gallery").innerHTML = ""
    genererGalerie(travaux) // on ajoute TOUS les projets
})



//********** Filtre "Objets" **********

const boutonFiltrerObjets = document.getElementById("btn-objets")

boutonFiltrerObjets.addEventListener('click', () => 
{
    const projetsFiltres = travaux.filter(function (projet)
    {
        return projet.category.name === "Objets"
    })
    
    document.querySelector(".gallery").innerHTML = "" // on retire tous les projets 

    genererGalerie(projetsFiltres) // on ajoute les projets correspondant au filtre

    console.log(projetsFiltres)
})



//********** Filtre "Appartements" **********

const boutonFiltrerApparts = document.getElementById("btn-appartements")

boutonFiltrerApparts.addEventListener('click', () => 
{
    const projetsFiltres = travaux.filter(function (projet)
    {
        return projet.category.name === "Appartements"
    })
    
    document.querySelector(".gallery").innerHTML = "" // on retire tous les projets 

    genererGalerie(projetsFiltres) // on ajoute les projets correspondant au filtre

    console.log(projetsFiltres)
})



//********** Filtre "Hôtels et restaurants" **********

const boutonFiltrerHotels = document.getElementById("btn-hotels")

boutonFiltrerHotels.addEventListener('click', () => 
{
    const projetsFiltres = travaux.filter(function (projet)
    {
        return projet.category.name === "Hotels & restaurants"
    })
    
    document.querySelector(".gallery").innerHTML = "" // on retire tous les projets 

    genererGalerie(projetsFiltres) // on ajoute les projets correspondant au filtre

    console.log(projetsFiltres)
})