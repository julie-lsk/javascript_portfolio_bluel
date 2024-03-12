
// Récupération des travaux et catégories depuis l'API 
// + conversion des données en JSON

export const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

export const categories = await fetch ("http://localhost:5678/api/categories").then(categories => categories.json());