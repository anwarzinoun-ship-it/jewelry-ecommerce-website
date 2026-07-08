let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutForm = document.getElementById("checkout-form");

const checkoutTotal = document.getElementById("checkout-total");


function calculateTotal() {

    let total = 0;

    cart.forEach(function(item) {

        total = total + item.price * item.quantity;

    });

    checkoutTotal.textContent = total;
}


checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }


    const customer = {

        name: document.getElementById("name").value,

        phone: document.getElementById("phone").value,

        city: document.getElementById("city").value,

        address: document.getElementById("address").value

    };


    const order = {

        customer: customer,

        products: cart,

        total: Number(checkoutTotal.textContent),

        date: new Date().toLocaleString()

    };


    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    localStorage.removeItem("cart");


    alert("Commande confirmée avec succès !");


    window.location.href = "index.html";

});


calculateTotal();