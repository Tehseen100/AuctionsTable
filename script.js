const bars = document.getElementById("bars");
const close = document.getElementById("close");
const navMenu = document.querySelector(".nav-menu");

if (bars) {
    bars.addEventListener("click", () => {
        navMenu.classList.add("active");
    })
};

if (close) {
    close.addEventListener("click", () => {
        navMenu.classList.remove("active");
    })
};

// Add To Cart Function

function AddToCart(proImg, proName, proPrice) {
    const queryPara = new URLSearchParams({
        img: proImg,
        name: proName,
        price: proPrice
    });

    window.location.href = 'product-detail.html?' + queryPara.toString();
}