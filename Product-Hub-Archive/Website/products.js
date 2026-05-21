(async () => {
    const loadingtext = document.createElement('div');
    const products = document.getElementById('products-container');
    const popup = document.getElementById('products-popup');
    let CurrentItem = null;
    loadingtext.innerHTML = "Loading...";
    loadingtext.className = "notice";
    document.getElementById('main').appendChild(loadingtext);

    const response = await fetch("https://api.jonaselevtech.xyz/product-hub/assets");

    if (response.status == 200) {
        const productlist = await response.json();
        productlist.forEach(item => {
            const frame = document.createElement('div');
            frame.className = "products-item";
            frame.innerHTML = `
                <img src="${item.ImageURL}" alt="">
                <p title="${item.Title}">${item.Title}</p>
            `;
            products.appendChild(frame);

            frame.addEventListener('click', async function () {
                if (CurrentItem == null && item.AID != undefined) {
                    CurrentItem = item.AID;

                    popup.querySelector("h1").textContent = item.Title;
                    popup.querySelector("p").innerHTML = item.Desc;
                    document.getElementById("products-popup-download").textContent = "Download";

                    popup.style.visibility = "visible";
                    popup.style.opacity = 1;

                } else if (CurrentItem == null && item.RobloxOnly == true) {
                    CurrentItem = item.ID;

                    popup.querySelector("h1").textContent = item.Title;
                    popup.querySelector("p").innerHTML = item.Desc;
                    document.getElementById("products-popup-download").textContent = "Get on Roblox";

                    popup.style.visibility = "visible";
                    popup.style.opacity = 1;
                };
            });
        });

        loadingtext.remove();
    } else {
        loadingtext.innerHTML = "Failed to fetch products"
    };

    document.getElementById("products-popup-download").addEventListener("click", async function () {
        if (CurrentItem != null && typeof CurrentItem == "string") {
            const link = document.createElement('a');
            link.href = `https://assets.jonaselevtech.xyz/products/${CurrentItem}.rbxm`;
            link.download = `${CurrentItem}.rbxm`;

            link.click();
        } else if (CurrentItem != null && typeof CurrentItem == "number") {
            window.open(`https://create.roblox.com/store/asset/${CurrentItem}`, "_blank");
        }
    });

    document.getElementById("products-popup-close").addEventListener("click", async function () {
        CurrentItem = null;

        popup.style.opacity = 0;
    });

    popup.addEventListener('transitionend', () => {
        if (getComputedStyle(popup).opacity == '0') {
            popup.style.visibility = "hidden";
        }
    });
})();