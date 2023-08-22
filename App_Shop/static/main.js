// const cart=[];
let cart = localStorage.getItem("cart-items") ? JSON.parse(localStorage.getItem('cart-items'))
 :[];

const cartBtn = document.querySelectorAll('.cart');

cartBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.parentElement.parentElement.parentElement;
        const product_id=product.getAttribute('data-id');
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
            const cartLi=document.querySelector(`#pd${existingItem.product_id}`);
            const updateItemQty=cartLi.querySelector("#item_qty");
            const updateItemTotal=cartLi.querySelector("#item_total")
            updateItemQty.innerHTML=`<p id='item_qty' style="font-size:1.5rem;"><span style="color:red;cursor:pointer" id="minus">-</span> ${existingItem.product_quantity} <span style="color:red;cursor:pointer" id="plus">+</span></p>`
            updateItemTotal.innerHTML=`${existingItem.product_quantity} X <span class="price">${existingItem.product_price}=${existingItem.product_quantity*existingItem.product_price}</span>`
            getTotol();
        }
        else {
            cart.push({ product_id,product_name, product_price, product_quantity, product_img })
            updatCartList(product_id,product_name, product_price, product_quantity, product_img)
        }
        localStorage.setItem('cart-items',JSON.stringify(cart));
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
    total=total.toFixed(2);
    const totalPrice = document.querySelector("#total-price");
    totalPrice.innerText = total;
}


const updatCartList = (product_id,product_name, product_price, product_quantity, product_img) => {
    const cartList = document.querySelector(".cart-list");

    const liElement = document.createElement("li");

    liElement.setAttribute("id",`pd${product_id}`)
    liElement.setAttribute("data-productId",`${product_id}`)
    if (cart == null) {
        liElement.innerHTML = `<p style="color:red;">No items</p>`
    }
    else {
        liElement.innerHTML = `
        <a href="#" class="photo"><img src="${product_img}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${product_name}</a></h6>
        <p id='item_qty' style="font-size:1.5rem;"><span style="color:red;cursor:pointer" id="minus">-</span> ${product_quantity} <span style="color:red;cursor:pointer" id="plus">+</span></p>
        <p id='item_total'>${product_quantity} X <span class="price">${product_price}=${product_quantity*product_price}</span></p>
        `

        /**
         * `
        <a href="#" class="photo"><img src="${product_img}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${product_name}</a></h6>
        <p style="font-size:1.5rem;"><span style="color:red;cursor:pointer" id="minus">-</span> 1 <span style="color:red;cursor:pointer" id="plus">+</span></p>
        <p>${product_quantity} - <span class="price">${product_price}</span></p>
        `
         * 
         */
        cartList.appendChild(liElement);
        // console.log(getTotol());
        getTotol();

    }


}
cart.forEach((item)=>{
    updatCartList(item.product_id,item.product_name,item.product_price,item.product_quantity,item.product_img);
})


