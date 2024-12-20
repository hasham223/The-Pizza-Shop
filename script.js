
function addToCart(itemName, itemPrice) {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

   
    const existingItemIndex = cart.findIndex(item => item.name === itemName);

    if (existingItemIndex !== -1) {
        
        cart[existingItemIndex].quantity += 1;
    } else {
       
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartDisplay = document.getElementById('cart-display');
    cartDisplay.innerHTML = '';
    let total = 0;

    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];


    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    
    cart.forEach((item) => {
        if (item.quantity && item.price) {
            total += item.price * item.quantity;
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
            cartDisplay.appendChild(itemElement);
        }
    });

    
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartDisplay.appendChild(totalElement);
}
function loadCartOnPage() {
    updateCartDisplay();
}

function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    
    localStorage.removeItem('cart');


    window.location.href = "order-confirmation.html"; 
}


if (window.location.pathname.includes('my-order.html')) {
    window.onload = loadCartOnPage;

    
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
}
