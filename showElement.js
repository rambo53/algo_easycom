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
                    lstElData[i].textContent = datas[j][currentProp];
                }
            };

            el.parentNode.append(elClone);
            elClone.classList.remove("hidden");
        };

    }
};
