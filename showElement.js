window.onload = function () {
    if (Array.isArray(model) && model.length != 0) {
        let divLstCats = document.getElementById("divLstCats");
        showElements(divLstCats, model);
    }
    else {
        document.getElementById("divEmptyList").classList.remove("hidden");
    }


    function showElements(el, datas) {

        for (let j = 0; j < datas.length; j++) {
            let elClone = el.cloneNode(true);

            let lstElData = elClone.querySelectorAll("[data-prop]");

            for (let i = 0; i < lstElData.length; i++) {

                let currentProp = lstElData[i].getAttribute("data-prop");

                if (datas[j].hasOwnProperty(currentProp)) {

                    let whereInsert = lstElData[i].getAttribute("data-src");

                    switch (whereInsert) {
                        case "text": lstElData[i].textContent = datas[j][currentProp];
                            break;
                        case "name": lstElData[i].setAttribute("name", datas[j][currentProp]);
                            break;
                    }
                    
                }
                else {
                    alert(currentProp + " n'est pas renseignée.");
                }
            };

            el.parentNode.append(elClone);
            elClone.classList.remove("hidden");
        };

    }
};

