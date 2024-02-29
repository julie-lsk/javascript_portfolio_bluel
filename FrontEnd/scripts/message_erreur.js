// ********** Gestion de la popup du message d'erreur **********

const popupBackground = document.querySelector(".popup-background")


export function afficherPopup() 
{
    popupBackground.classList.remove("desactive") // La popup apparait
}


function cacherPopup()
{
    popupBackground.classList.add("desactive") // La popup disparait
}


export function fermerPopup()
{
    let btnFermerPopup = document.querySelector("#zone-text button")

    // La popup se ferme au clique sur le bouton "Fermer"
    btnFermerPopup.addEventListener("click", () =>
    {
        cacherPopup()
    })

    // La popup se ferme quand on clique ailleurs
    popupBackground.addEventListener("click", (event) =>
    {
        if (event.target === popupBackground)
        {
            cacherPopup()
        }
    })
}