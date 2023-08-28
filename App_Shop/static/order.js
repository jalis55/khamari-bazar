
let cart = localStorage.getItem("cart-items") ? JSON.parse(localStorage.getItem('cart-items')) : [];

if (cart.length == 0) {
    window.location.href = "/";
}
else {


    const form = document.querySelector('#shippingForm');


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phone = form.querySelector("#phone").value;
        const address = form.querySelector("#address").value;
        const city = form.querySelector("#city").value;
        const zip_code = form.querySelector("#zip_code").value;
        let addressData = { phone, address, city, zip_code };

        const localStorageData = localStorage.getItem("cart-items");
        const productDetails = JSON.parse(localStorageData);
        productData = []

        for (var i = 0; i < productDetails.length; i++) {
            const product = {
                'id': productDetails[i].product_id,
                'qty': productDetails[i].product_quantity
            }
            productData.push(product);
        }
        const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

        const dataset = {
            shipping_address: JSON.stringify(addressData),
            product_data: JSON.stringify(productData)

        }

        $.ajax({
            type: "POST",
            url: "/shipping-process",  // Replace with your view URL
            headers: {
                "X-CSRFToken": csrftoken  // Include the CSRF token in the headers
            },
            data: dataset,

            success: function (response) {
                localStorage.removeItem('cart-items');
                // Handle the response if needed
                // ...

                // No redirect here, as this is an AJAX request
                form.remove();
                const message = document.querySelector("#message");
                message.innerHTML = `<div class="row justify-content-center shadow-lg  bg-white rounded "
                style="width: 325px; margin: 0 auto; padding: 20px; border-radius: 5px; position: relative;">
                <div class="circle-success-container" style="color: #82ce34; position: absolute; top: -31px;">
                    <i class="fa-solid fa-circle-check fa-4x"></i>
                </div>
                <div class="success-message pt-4 h2">
                    Success!
                </div>
                <div class="booking-message text-center pt-1" style="line-height: normal;">
                    Your order has been placed. <br>Order id:#ord${response.orderId}.
                </div>`
                
                // console.log(response.orderId);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.log(error);
            }
        });

    });


}