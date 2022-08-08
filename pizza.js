// Attend le chargement des éléments html de ma page avant de s'exécuter
window.onload = function () {

    // vérifie si ma variable globale Model est valorisé
    // en fonction affichera la liste de mes pizzas ou un message
    // pour dire qu'il n'y a pas de pizzas
    if (Array.isArray(model) && model.length != 0) {
        const divLstPizzas = document.getElementById("divLstPizza");
        showElements(divLstPizzas, model);
    }
    else {
        document.getElementById("divEmptyList").classList.remove("hidden");
    }

    // fonction auto appelé qui récupère la liste des pates et 
    // la liste des ingrédients pour alimenter les input select de mon form
    (function () {
        getFetch("Home/pizzaIngredientPate", function (data) {
            let formCreatePizza = document.getElementById("divFormPizza");
            let selectPate = formCreatePizza.querySelector("#pate option");
            let selectIngredient = formCreatePizza.querySelector("#ingredient option");

            showSelect(data.Pates, selectPate);
            showSelect(data.Ingredients, selectIngredient);
        })
    })();
};

// listener pour afficher mon form de création de pizza
document.getElementById("createPizza").addEventListener('click', () => {
    const formPizza = document.getElementById("divFormPizza");
    formPizza.querySelector("h3").textContent = "Créé votre pizza :";
    formPizza.querySelector("#createButtonForm").textContent = "Créer";
    formPizza.classList.remove("hidden");
});

// listener pour enregistrer ma pizza
document.getElementById("createButtonForm").addEventListener('click', () => {
    const formPizza = document.getElementById("divFormPizza");

    // instanciation obj Pate
    const pateSelect = formPizza.querySelector("#pate");
    const pate = {
        'Id': parseInt(pateSelect.value),
        'Nom': pateSelect.options[pateSelect.selectedIndex].text
    }

    // instanciation obj Ingredient
    const ingSelect = formPizza.querySelector("#ingredient");
    // récupération id ingredient select
    const ingredientsId = $("#ingredient").val();
    const ingredientsIdToInt = ingredientsId.map(ing => parseInt(ing));
    // récupération nom ingredient select
    const ingredientsNom = ingSelect.querySelectorAll('option:checked');
    const ingredientsNomText = Array.from(ingredientsNom).map(el => el.textContent);
    // association des 2 listes afin d'avoir une liste d'obj Ingredient pour envoie back
    const lstIng = getIngForPizza(ingredientsIdToInt, ingredientsNomText);

    // instanciation obj Pizza
    const newPizza = {
        'Nom': formPizza.querySelector("#name").value,
        'Pate': pate,
        'Ingredients': lstIng
    }

    postFetch("/Home/registerNewPizza/", newPizza, function (data) {
        const divLstPizzas = document.getElementById("divLstPizza");
        document.querySelector("#divEmptyList").classList.add("hidden");
        showElements(divLstPizzas, data);
    })
});

// listener pour cacher mon form de création de pizza si abandon création
document.getElementById("cancelButton").addEventListener('click', (el) => {
    el.target.closest("#divFormPizza").classList.add("hidden");
});

// fonction pour alimenter mes input select dans mon form de pizza
function showSelect(datas, elt) {

    for (let i = 0; i < datas.length; i++) {
        let elClone = elt.cloneNode(true);

        elClone.setAttribute("value", datas[i].Id);
        elClone.textContent = datas[i].Nom;

        elt.parentNode.append(elClone);
        elClone.classList.remove("hidden");
    }
}

// fonction pour instancier une liste d'obj Ingredient en associant 
// l'id avec la valeur en text pour créer ou modifier une pizza
function getIngForPizza(id, ing) {
    let lstIngObj = Array();
    for (i = 0; i < id.length; i++) {
        let ingObj = {
            'Id': id[i],
            'Nom': ing[i]
        }
        lstIngObj.push(ingObj);
    }
    return lstIngObj;
}
