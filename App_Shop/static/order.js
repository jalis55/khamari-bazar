const form=document.querySelector('#shippingForm');


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const phone=form.querySelector("#phone").value;
    const address=form.querySelector("#address").value;
    const city=form.querySelector("#city").value;
    const zip_code=form.querySelector("#zip_code").value;
    let addressData={phone,address,city,zip_code};
    // addressData={'shipping_address':JSON.stringify(addressData)}


    // console.log(addressData);

    



  
    // Iterate through FormData entries
 
    // console.log(formDataArr);
    const localStorageData =localStorage.getItem("cart-items");
    const productDetails=JSON.parse(localStorageData);
    productData=[]

    for(var i=0;i<productDetails.length;i++){
        const product={
            'id':productDetails[i].product_id,
            'qty':productDetails[i].product_quantity
        }
        productData.push(product);
    }
    const csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    // const data = {product_data:JSON.stringify(productData)}
    console.log(typeof(data));
    console.log(typeof(formDataArr));
    const dataset={
        shipping_address:JSON.stringify(addressData),
        product_data:JSON.stringify(productData)

    }



    $.ajax({
        type: "POST",
        url: "/shipping-process",  // Replace with your view URL
        headers: {
            "X-CSRFToken": csrftoken  // Include the CSRF token in the headers
        },
        data:dataset,

        success: function(response) {
            // Handle the response if needed
            // ...

            // No redirect here, as this is an AJAX request
            console.log(response);
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.log(error);
        }
    });

});


