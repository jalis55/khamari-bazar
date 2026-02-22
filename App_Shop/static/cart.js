//cart page

let cart = localStorage.getItem("cart-items") ? JSON.parse(localStorage.getItem('cart-items')) : []



const addToCart = () => {
    const itemDetails = document.querySelector("tbody");
    cart.forEach(element => {
        const trElement = document.createElement("tr");
        trElement.setAttribute("data-productId", element.product_id)

        trElement.innerHTML = `
        <td class="thumbnail-img">
                <a href="#">
                    <img class="img-fluid" src="${element.product_img}" alt="" />
                </a>
            </td>
            <td class="name-pr">
                <a href="#">
                    ${element.product_name}
                </a>
            </td>
            <td class="price-pr">
                <p>&#2547; ${element.product_price}</p>
            </td>
            <td class="quantity-box"><input type="number" size="4" value="${element.product_quantity}" min="1" step="1"
                    class="c-input-text qty text" id="total_qty" onInput="updateCartList(event)"></td>
            <td class="total-pr">
                <p>&#2547; ${element.product_quantity * element.product_price}</p>
            </td>
            <td class="remove-pr">
                <a href="#" onclick="removeCartItem(event);">
                    <i class="fas fa-times"></i>
                </a>
            </td>`;

        itemDetails.appendChild(trElement);



    });
}

const updateCartList = (e) => {

    const itemQty = e.target.value;
    if (itemQty >= 5) {
        const itemDetails = e.target.parentElement.parentElement;
        const productId = itemDetails.getAttribute("data-productId");
        const item = cart.find(element => element.product_id == productId);
        //
        item.product_quantity = itemQty;

        itemDetails.querySelector("#total_qty").value = itemQty;
        const totalPrice = itemDetails.querySelector(".total-pr");
        totalPrice.innerHTML = `<p>&#2547; ${item.product_quantity * item.product_price}</p>`;
        localStorage.setItem("cart-items", JSON.stringify(cart));
        orderSummary();
    }


}
const orderSummary = () => {
    const subTotal = document.querySelector("#sub_total");
    const grandTotal = document.querySelector("#grand_total");
    const total = getTotal();
    subTotal.innerText = total;
    grandTotal.innerText = total;

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.setAttribute("onclick", "alert('Your cart is empty! Please add some items.'); return false;");
            checkoutBtn.style.opacity = "0.5";
            checkoutBtn.style.cursor = "not-allowed";
        } else {
            checkoutBtn.removeAttribute("onclick");
            checkoutBtn.style.opacity = "1";
            checkoutBtn.style.cursor = "pointer";
        }
    }
}

const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
        total += item.product_price * item.product_quantity;
    })
    return total;
}
const removeCartItem = (e) => {
    const productDetails = e.target.parentElement.parentElement.parentElement;
    const productId = productDetails.getAttribute("data-productId");
    cart = cart.filter((item) => {
        return item.product_id !== productId;
    })
    productDetails.remove();

    localStorage.setItem("cart-items", JSON.stringify(cart));
    orderSummary();
}

orderSummary();
addToCart();