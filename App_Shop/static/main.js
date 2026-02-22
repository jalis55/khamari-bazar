// const cart=[];
let cart = localStorage.getItem('cart-items')
  ? JSON.parse(localStorage.getItem('cart-items'))
  : []

const cartBtn = document.querySelectorAll('.cart')
// const cartBtn = document.querySelector('#cart')

// const addItem=(e)=>{
//     console.log(e.target.parentElement.parentElement.parentElement);
// }

cartBtn.forEach((btn) => {
  // console.log(btn)
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const product = e.target.parentElement.parentElement.parentElement
    const product_id = product.getAttribute('data-id')
    // console.log(product_id);
    const product_img = product.querySelector('.img-fluid').src
    const product_name = product.querySelector('h4').innerText
    // const product_price = parseFloat(product.querySelector("span").innerText);
    const product_price = parseFloat(product.querySelector('span').innerText)
    // console.log(typeof(product_price));
    const product_quantity = 5
    // console.log(product_img,product_name,product_price);
    const existingItem = cart.find((item) => {
      return item.product_id === product_id
    })
    if (existingItem) {
      existingItem.product_quantity += 1
      const cartLi = document.querySelector(`#pd${existingItem.product_id}`)
      const updateItemQty = cartLi.querySelector('#item_qty')
      const updateItemTotal = cartLi.querySelector('#item_total')
      updateItemQty.innerHTML = `<button class="btn btn-sm btn-outline-danger minus" onclick="decrementQty(event)">-</button> <b style="margin: 0 10px;">${existingItem.product_quantity}</b> <button class="btn btn-sm btn-outline-success plus" onclick="incrementQty(event)">+</button>`
      updateItemTotal.innerHTML = `${existingItem.product_quantity
        } X <span class="price">${existingItem.product_price} = ${existingItem.product_quantity * existingItem.product_price
        }</span>`
      getTotol()
    } else {
      cart.push({
        product_id,
        product_name,
        product_price,
        product_quantity,
        product_img,
      })
      updatCartList(
        product_id,
        product_name,
        product_price,
        product_quantity,
        product_img
      )
    }
    localStorage.setItem('cart-items', JSON.stringify(cart))
    // console.log(cart);
    cartNotification()
  })
})

//adding from local storage
const getTotol = () => {
  let total = 0
  cart.forEach((item) => {
    total += item.product_price * item.product_quantity
    // console.log(total);
  })
  // console.log("total price:",total);
  total = total.toFixed(2)
  const totalPrice = document.querySelector('#total-price')
  totalPrice.innerText = total
}

const updatCartList = (
  product_id,
  product_name,
  product_price,
  product_quantity,
  product_img
) => {
  const cartList = document.querySelector('.cart-list')

  const liElement = document.createElement('li')

  liElement.setAttribute('id', `pd${product_id}`)
  liElement.setAttribute('data-productId', `${product_id}`)
  if (cart == null) {
    liElement.innerHTML = `<p style="color:red;">No items</p>`
  } else {
    liElement.innerHTML = `
        <a href="#" class="photo"><img src="${product_img}" class="cart-thumb" alt="" /></a>
        <h6><a href="#">${product_name}</a></h6>
        <p id='item_qty' style="font-size:1.5rem; display:flex; align-items:center;"><button class="btn btn-sm btn-outline-danger minus" onclick="decrementQty(event)">-</button> <b style="margin: 0 10px;">${product_quantity}</b> <button class="btn btn-sm btn-outline-success plus" onclick="incrementQty(event)">+</button></p>
        <div class="quantity-container" style="display:flex;justify-content:space-between;align-items:center;">
        <p id='item_total'>${product_quantity} X <span class="price">${product_price} = ${product_quantity * product_price
      }</span></p>
        <button style="color:white;" class="btn btn-default hvr-hover btn-cart" onclick="removeItem(event)">Remove</button>
        </div>
        `
    cartList.appendChild(liElement)
    // console.log(getTotol());
    getTotol()

    const incrementBtn = liElement.querySelector('.plus')
    const decrementBtn = liElement.querySelector('.minus')
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
  const plusBtnParent = e.target.parentElement.parentElement
  // console.log(plusBtnParent);
  const productId = plusBtnParent.getAttribute('data-productid')
  const productDetails = cart.find((productItem) => {
    return productItem.product_id === productId;
  })
  const itemQty = plusBtnParent.querySelector('#item_qty');
  console.log(itemQty);
  const itemTotal = plusBtnParent.querySelector('#item_total');
  productDetails.product_quantity = parseInt(productDetails.product_quantity) + 1;
  itemQty.innerHTML = `<button class="btn btn-sm btn-outline-danger minus" onclick="decrementQty(event)">-</button> <b style="margin: 0 10px;">${productDetails.product_quantity}</b> <button class="btn btn-sm btn-outline-success plus" onclick="incrementQty(event)">+</button>`
  itemTotal.innerHTML = `${productDetails.product_quantity} X <span class="price">${productDetails.product_price} = ${productDetails.product_quantity * productDetails.product_price}</span>`

  localStorage.setItem('cart-items', JSON.stringify(cart))
  getTotol()
  // console.log(productDetails);
}
const decrementQty = (e) => {
  const plusBtnParent = e.target.parentElement.parentElement
  // console.log(plusBtnParent);
  const productId = plusBtnParent.getAttribute('data-productid')
  const productDetails = cart.find((productItem) => {
    return productItem.product_id === productId
  })

  if (productDetails.product_quantity > 5) {
    const itemQty = plusBtnParent.querySelector('#item_qty')
    const itemTotal = plusBtnParent.querySelector('#item_total')
    productDetails.product_quantity -= 1

    itemQty.innerHTML = `<button class="btn btn-sm btn-outline-danger minus" onclick="decrementQty(event)">-</button> <b style="margin: 0 10px;">${productDetails.product_quantity}</b> <button class="btn btn-sm btn-outline-success plus" onclick="incrementQty(event)">+</button>`
    itemTotal.innerHTML = `${productDetails.product_quantity} X <span class="price">${productDetails.product_price} = ${productDetails.product_quantity * productDetails.product_price}</span>`

    localStorage.setItem('cart-items', JSON.stringify(cart))
    getTotol()
  }
}

const removeItem = (e) => {
  const itemDetails = e.target.parentElement.parentElement;
  const itemId = itemDetails.getAttribute('data-productId');


  cart = cart.filter((item) => { return item.product_id !== itemId })
  localStorage.setItem('cart-items', JSON.stringify(cart));
  itemDetails.remove();
  getTotol();
  cartNotification();
}

const cartNotification = () => {
  const notification = document.querySelector('.badge')
  if (notification) {
    const cartLen = cart.length
    if (cartLen !== 0) {
      notification.innerText = `${cartLen}`;
    } else {
      notification.innerText = '';
    }
  }

  const sidebarCheckoutBtn = document.querySelector('.total .btn-cart');
  if (sidebarCheckoutBtn) {
    if (cart.length === 0) {
      sidebarCheckoutBtn.setAttribute("onclick", "alert('Your cart is empty! Please add some items.'); return false;");
      sidebarCheckoutBtn.style.opacity = "0.5";
      sidebarCheckoutBtn.style.cursor = "not-allowed";
    } else {
      sidebarCheckoutBtn.removeAttribute("onclick");
      sidebarCheckoutBtn.style.opacity = "1";
      sidebarCheckoutBtn.style.cursor = "pointer";
    }
  }
}

cart.forEach((item) => {
  updatCartList(
    item.product_id,
    item.product_name,
    item.product_price,
    item.product_quantity,
    item.product_img
  )
})

cartNotification()

