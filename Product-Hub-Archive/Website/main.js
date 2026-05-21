async function loadProductHub() {
    const css = await fetch('products.css');
    const productjs = await fetch('products.js');
    const style = document.createElement('style');
    const script = document.createElement('script');
        
    style.textContent = await css.text();

    document.head.appendChild(style);

    script.textContent = await productjs.text();

    document.head.appendChild(script);

    document.title = "JET Product Hub";
}

document.addEventListener('DOMContentLoaded', async function() {
    const loadingtext = document.createElement('div');
    loadingtext.innerHTML = "Loading...";
    loadingtext.className = "notice";
    
    document.getElementById('main').appendChild(loadingtext);

    if (window.location.pathname == "/products") {
        await loadProductHub();
    }
    loadingtext.remove();

    document.getElementById("button-container").querySelectorAll('button').forEach(button => {
        button.addEventListener('click', async function() {
            await redirect(button.id);
        })
    });
});