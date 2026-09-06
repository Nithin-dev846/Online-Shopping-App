let cart = [];

// Add product to cart
function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


// Update cart
function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let total = document.getElementById("total");

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {

        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h4>${item.name}</h4>

                <p>Price: ₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    ${item.quantity}

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <p>
                    Subtotal:
                    ₹${item.price * item.quantity}
                </p>

                <button
                    class="remove"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    cartCount.innerText = totalQuantity;
    total.innerText = totalPrice;
}


// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


// Remove product
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


// Open cart
function openCart() {
    document.getElementById("cart").style.display = "block";
}


// Close cart
function closeCart() {
    document.getElementById("cart").style.display = "none";
}


// Search products
function searchProducts() {

    let searchValue =
        document.getElementById("search").value.toLowerCase();

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        let productName =
            product.getAttribute("data-name").toLowerCase();

        if (productName.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}


// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];
    updateCart();
    closeCart();
}