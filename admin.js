let orders = JSON.parse(localStorage.getItem("orders")) || [];


const ordersContainer =
    document.getElementById("orders-container");

const ordersCount =
    document.getElementById("orders-count");

const productsSold =
    document.getElementById("products-sold");

const revenue =
    document.getElementById("revenue");



function displayDashboard() {

    let totalProducts = 0;

    let totalRevenue = 0;


    ordersCount.textContent = orders.length;


    orders.forEach(function(order) {

        totalRevenue += order.total;


        order.products.forEach(function(product) {

            totalProducts += product.quantity;

        });

    });


    productsSold.textContent = totalProducts;

    revenue.textContent = totalRevenue;

}



function displayOrders() {

    ordersContainer.innerHTML = "";


    if (orders.length === 0) {

        ordersContainer.innerHTML =
            "<p class='empty-orders'>Aucune commande.</p>";

        return;

    }


    orders.forEach(function(order, orderIndex) {

        const orderCard =
            document.createElement("div");


        orderCard.classList.add("order-card");


        let productsHTML = "";


        order.products.forEach(function(product) {

            productsHTML += `

                <div class="admin-product">

                    <span>
                        ${product.name}
                    </span>

                    <span>
                        ${product.quantity}
                        ×
                        ${product.price} DH
                    </span>

                </div>

            `;

        });


        orderCard.innerHTML = `

            <div class="order-header">

                <h3>
                    Commande #${orderIndex + 1}
                </h3>

                <span>
                    ${order.date}
                </span>

            </div>


            <div class="customer-info">

                <p>
                    <strong>Client :</strong>
                    ${order.customer.name}
                </p>

                <p>
                    <strong>Téléphone :</strong>
                    ${order.customer.phone}
                </p>

                <p>
                    <strong>Ville :</strong>
                    ${order.customer.city}
                </p>

                <p>
                    <strong>Adresse :</strong>
                    ${order.customer.address}
                </p>

            </div>


            <div class="admin-products-list">

                ${productsHTML}

            </div>


            <div class="admin-order-total">

                Total :
                ${order.total} DH

            </div>


            <button
                class="delete-order-button"
                onclick="deleteOrder(${orderIndex})"
            >

                Supprimer la commande

            </button>

        `;


        ordersContainer.appendChild(orderCard);

    });

}



function deleteOrder(orderIndex) {

    const confirmation = confirm(
        "Voulez-vous supprimer cette commande ?"
    );


    if (!confirmation) {

        return;

    }


    orders.splice(orderIndex, 1);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    displayDashboard();

    displayOrders();

}



displayDashboard();

displayOrders();