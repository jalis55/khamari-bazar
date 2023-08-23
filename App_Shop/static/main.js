// const cart=[];
let cart = localStorage.getItem("cart-items") ? JSON.parse(localStorage.getItem('cart-items'))
    : [];

const cartBtn = document.querySelectorAll('.cart');
// const cartBtn = document.querySelector('#cart')

// const addItem=(e)=>{
//     console.log(e.target.parentElement.parentElement.parentElement);
// }



cartBtn.forEach((btn) => {
    // console.log(btn)
    btn.addEventListener('click', (e) => {

        e.preventDefault();
        const product = e.target.parentElement.parentElement.parentElement;
        const product_id = product.getAttribute('data-id');
        // console.log(product_id);
        const product_img = product.querySelector('.img-fluid').src;
        const product_name = product.querySelector("h4").innerText;
        // const product_price = parseFloat(product.querySelector("span").innerText);
        const product_price = parseFloat(product.querySelector("span").innerText);
        // console.log(typeof(product_price));
        const product_quantity = 1;
        // console.log(product_img,product_name,product_price);
        const existingItem = cart.find((item) => {
            return item.product_id === product_id
        })
        if (existingItem) {
            existingItem.product_quantity += 1;
            const cartLi = document.querySelector(`#pd${existingItem.product_id}`);
            const updateItemQty = cartLi.querySelector("#item_qty");
            const updateItemTotal = cartLi.querySelector("#item_total")
            updateItemQty.innerHTML = `<p id='item_qty' style="font-size:1.5rem;"><span style="color:red;cursor:pointer" id="minus">-</span> ${existingItem.product_quantity} <span style="color:red;cursor:pointer" id="plus">+</span></p>`
            updateItemTotal.innerHTML = `${existingItem.product_quantity} X <span class="price">${existingItem.product_price}=${existingItem.product_quantity * existingItem.product_price}</span>`
            getTotol();
        }
        else {
            cart.push({ product_id, product_name, product_price, product_quantity, product_img })
            updatCartList(product_id, product_name, product_price, product_quantity, product_img)
        }
        localStorage.setItem('cart-items', JSON.stringify(cart));
        // console.log(cart);

    })

})

//adding from local storage
const getTotol = () => {
    let total = 0;
    cart.forEach((item) => {
        total += item.product_price * item.product_quantity
        // console.log(total);
    })
    // console.log("total price:",total);
    total = total.toFixed(2);
    const totalPrice = document.querySelector("#total-price");
    totalPrice.innerText = total;
}


const updatCartList = (product_id, product_name, product_price, product_quantity, product_img) => {
    const cartList = document.querySelector(".cart-list");

    const liElement = document.createElement("li");

    liElement.setAttribute("id", `pd${product_id}`)
    liElement.setAttribute("data-productId", `${product_id}`)
    if (cart == null) {
        liElement.innerHTML = `<p style="color:red;">No items</p>`
    }
    else {
        liElement.innerHTML = `
        <a href="#" class="photo"><img src="${product_img}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${product_name}</a></h6>
        <p id='item_qty' style="font-size:1.5rem;"><span style="color:red;cursor:pointer" class="minus" onclick="decrementQty(event)">-</span> <b>${product_quantity}</b> <span style="color:red;cursor:pointer" class="plus" onclick="incrementQty(event)">+</span></p>
        <p id='item_total'>${product_quantity} X <span class="price">${product_price}=${product_quantity * product_price}</span></p>
        `
        cartList.appendChild(liElement);
        // console.log(getTotol());
        getTotol();


        const incrementBtn = liElement.querySelector(".plus");
        const decrementBtn = liElement.querySelector(".minus");
        // const incrementBtn = event.target



        // incrementBtn.addEventListener('click',(e)=>{
        //     const itemParent=e.target.parentElement;
        //     const itemQty=itemParent.querySelector("b")
        //     itemQty.innerText=`${product_quantity+1}`


        // })

        // decrementBtn.addEventListener('click',(e)=>{
        //     console.log(e.target.parentElement);
        // })


    }



}
const incrementQty = (e) => {
    const plusBtnParent = e.target.parentElement.parentElement;
    // console.log(plusBtnParent);
    const productId = plusBtnParent.getAttribute('data-productid')
    const productDetails = cart.find((productItem) => {
        return productItem.product_id === productId
    })
    const itemQty = plusBtnParent.querySelector('#item_qty')
    const itemTotal = plusBtnParent.querySelector('#item_total');
    productDetails.product_quantity += 1

    itemQty.innerHTML = `<span style="color:red;cursor:pointer" class="minus" onclick="decrementQty(event)">-</span> <b>${productDetails.product_quantity}</b> <span style="color:red;cursor:pointer" class="plus" onclick="incrementQty(event)">+</span>`;
    itemTotal.innerHTML = `${productDetails.product_quantity} X <span class="price">${productDetails.product_price}=${productDetails.product_quantity * productDetails.product_price}</span>`;

    localStorage.setItem('cart-items', JSON.stringify(cart));
    getTotol();
    // console.log(productDetails);


}
const decrementQty = (e) => {
    const plusBtnParent = e.target.parentElement.parentElement;
    // console.log(plusBtnParent);
    const productId = plusBtnParent.getAttribute('data-productid')
    const productDetails = cart.find((productItem) => {
        return productItem.product_id === productId
    })
    console.log(productDetails.product_quantity);
    if(productDetails.product_quantity>1){
       
    

    const itemQty = plusBtnParent.querySelector('#item_qty')
    const itemTotal = plusBtnParent.querySelector('#item_total');
    productDetails.product_quantity -= 1

    itemQty.innerHTML = `<span style="color:red;cursor:pointer" class="minus" onclick="decrementQty(event)">-</span> <b>${productDetails.product_quantity}</b> <span style="color:red;cursor:pointer" class="plus" onclick="incrementQty(event)">+</span>`;
    itemTotal.innerHTML = `${productDetails.product_quantity} X <span class="price">${productDetails.product_price}=${productDetails.product_quantity * productDetails.product_price}</span>`;

    localStorage.setItem('cart-items', JSON.stringify(cart));
    getTotol();
    }


}
cart.forEach((item) => {
    updatCartList(item.product_id, item.product_name, item.product_price, item.product_quantity, item.product_img);
})


