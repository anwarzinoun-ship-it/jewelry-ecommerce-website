const container =
    document.getElementById("products-container");


const sideCart =
    document.getElementById("side-cart");


const cartOverlay =
    document.getElementById("cart-overlay");


const openCartButton =
    document.getElementById("open-cart");


const closeCartButton =
    document.getElementById("close-cart");


const sideCartProducts =
    document.getElementById("side-cart-products");


const sideCartTotal =
    document.getElementById("side-cart-total");


const cartCount =
    document.getElementById("cart-count");


const notification =
    document.getElementById("notification");



let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



/* =========================================
   AFFICHER LES PRODUITS
========================================= */

function displayProducts() {

    container.innerHTML = "";


    products.forEach(function(product) {

        const card =
            document.createElement("div");


        card.classList.add("product-card");


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <h3>
                ${product.name}
            </h3>


            <p>
                ${product.price} DH
            </p>


            <button
                onclick="addToCart(${product.id})"
            >

                Ajouter au panier

            </button>

        `;


        container.appendChild(card);

    });

}



/* =========================================
   AJOUTER AU PANIER
========================================= */

function addToCart(productId) {

    const product =
        products.find(function(product) {

            return product.id === productId;

        });


    if (!product) {

        return;

    }


    const productInCart =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (productInCart) {

        productInCart.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();


    showNotification(
        product.name + " ajouté au panier"
    );


    openSideCart();

}



/* =========================================
   AFFICHER LE SIDE CART
========================================= */

function displaySideCart() {

    sideCartProducts.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;



    if (cart.length === 0) {

        sideCartProducts.innerHTML = `

            <div class="empty-side-cart">

                <p>
                    Votre panier est vide.
                </p>

                <button
                    onclick="closeSideCart()"
                >

                    Continuer mes achats

                </button>

            </div>

        `;

    }



    cart.forEach(function(item) {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add("side-cart-item");


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div class="side-cart-info">

                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${item.price} DH
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                </div>


                <button
                    class="side-remove-button"
                    onclick="removeFromCart(${item.id})"
                >

                    Supprimer

                </button>

            </div>

        `;


        sideCartProducts.appendChild(cartItem);


        total +=
            item.price * item.quantity;


        totalQuantity +=
            item.quantity;

    });



    sideCartTotal.textContent = total;


    cartCount.textContent = totalQuantity;

}



/* =========================================
   AUGMENTER QUANTITÉ
========================================= */

function increaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (item) {

        item.quantity++;

        saveCart();

    }

}



/* =========================================
   DIMINUER QUANTITÉ
========================================= */

function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (!item) {

        return;

    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== productId;

            });

    }


    saveCart();

}



/* =========================================
   SUPPRIMER PRODUIT
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(function(item) {

            return item.id !== productId;

        });


    saveCart();

}



/* =========================================
   SAUVEGARDER PANIER
========================================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displaySideCart();

}



/* =========================================
   OUVRIR PANIER
========================================= */

function openSideCart() {

    sideCart.classList.add("open");

    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

}



/* =========================================
   FERMER PANIER
========================================= */

function closeSideCart() {

    sideCart.classList.remove("open");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

}



/* =========================================
   NOTIFICATION
========================================= */

let notificationTimer;


function showNotification(message) {

    notification.textContent = message;


    notification.classList.add("show");


    clearTimeout(notificationTimer);


    notificationTimer =
        setTimeout(function() {

            notification.classList.remove("show");

        }, 2000);

}



/* =========================================
   EVENTS
========================================= */

openCartButton.addEventListener(
    "click",
    openSideCart
);


closeCartButton.addEventListener(
    "click",
    closeSideCart
);


cartOverlay.addEventListener(
    "click",
    closeSideCart
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSideCart();

        }

    }
);



/* =========================================
   INITIALISATION
========================================= */

displayProducts();

displaySideCart();