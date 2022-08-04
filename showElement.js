window.onload = function () {
    if (Array.isArray(model) && model.length != 0) {
        let divLstCats = document.getElementById("divLstCats");
        showElements(divLstCats, model);
    }
    else {
        document.getElementById("divEmptyList").classList.remove("hidden");
    }

};

function showElements(el, datas) {

    if (datas.length) {
        for (let j = 0; j < datas.length; j++) {
            let data = datas[j];
            showValues(el, data);
        };
    }
    else {
        showValues(el, datas);
    }

}

function showValues(el, data) {

    let elClone = el.cloneNode(true);

    let lstElData = elClone.querySelectorAll("[data-prop]");

    for (let i = 0; i < lstElData.length; i++) {

        let currentProp = lstElData[i].getAttribute("data-prop");

        if (data.hasOwnProperty(currentProp)) {

            let whereInsert = lstElData[i].getAttribute("data-src");

            switch (whereInsert) {
                case "text": lstElData[i].textContent = data[currentProp];
                    break;
                case "name": lstElData[i].setAttribute("name", data[currentProp]);
                    break;
            }

        }
        else {
            alert(currentProp + " n'est pas renseignée.");
        }
    };

    el.parentNode.append(elClone);
    elClone.classList.remove("hidden");
}


function getFetch(url, fonction) {

    fetch("https://localhost:44302/" + url, { method: 'GET' })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            fonction(data)
        })
}


function showDetails(elt) {
    let idCat = elt.getAttribute('name');
    getFetch("Home/catDetails/" + idCat, function (data) {
        let elt = document.getElementById("divDetailsCat");
        showElements(elt,data);
    })
}
