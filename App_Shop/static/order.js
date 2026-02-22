
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
                message.innerHTML = `
                            <div class="card border-0 shadow-lg text-center mx-auto" style="max-width: 400px; margin-top: 2rem;">
                                <div class="card-body p-5 position-relative">
                                    <div class="position-absolute top-0 start-50 translate-middle">
                                        <div class="bg-white rounded-circle p-2 shadow-sm">
                                            <i class="fas fa-check-circle text-success display-3"></i>
                                        </div>
                                    </div>
                                    <div class="mt-4 pt-2">
                                        <h3 class="fw-bold text-success mb-3">Success!</h3>
                                        <p class="text-muted mb-0">
                                            Your order has been placed.<br>
                                            <span class="fw-semibold">Order ID: #ord${response.orderId}</span>
                                        </p>
                                    </div>
                                    <div class="mt-4">
                                        <a href="/" class="btn btn-success px-4">
                                            <i class="fas fa-home me-2"></i>Continue Shopping
                                        </a>
                                    </div>
                                </div>
                            </div>
                            `;

                // console.log(response.orderId);
            },
            error: function (xhr, status, error) {
                // Handle errors
                console.log(error);
            }
        });

    });


}