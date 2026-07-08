// Récupérer le panier depuis localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Récupérer les éléments HTML
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");


// Afficher le panier
function displayCart() {

    // Vider le container avant de réafficher
    cartContainer.innerHTML = "";

    let total = 0;


    // Si le panier est vide
    if (cart.length === 0) {

        cartContainer.innerHTML = "<p>Votre panier est vide.</p>";

        totalPrice.textContent = 0;

        return;
    }


    // Parcourir tous les produits du panier
    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>Prix : ${item.price} DH</p>

                <p>Quantité : ${item.quantity}</p>


                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>


                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>


                <button onclick="removeProduct(${item.id})">
                    Supprimer
                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);


        // Calcul du total
        total = total + item.price * item.quantity;

    });


    // Afficher le total
    totalPrice.textContent = total;

}


// Augmenter la quantité
function increaseQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        product.quantity++;

        saveCart();

    }

}


// Diminuer la quantité
function decreaseQuantity(productId) {

    const product = cart.find(function(item) {

        return item.id === productId;

    });


    if (product) {

        product.quantity--;


        // Si quantité arrive à 0, supprimer le produit

        if (product.quantity === 0) {

            cart = cart.filter(function(item) {

                return item.id !== productId;

            });

        }


        saveCart();

    }

}


// Supprimer complètement un produit
function removeProduct(productId) {

    cart = cart.filter(function(item) {

        return item.id !== productId;

    });


    saveCart();

}


// Sauvegarder le panier
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// Afficher le panier au chargement de la page
displayCart();