let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Demon Slayer',
        tag: 'Jacket',
        price: 560.00,
        inCart: 0
    },
    {
        name: 'AOT Tshirt',
        tag: 'AOT',
        price: 159.00,
        inCart: 0
    },
    {
        name: 'HXH LongSleeve',
        tag: 'HXH',
        price: 480.00,
        inCart: 0
    },
    {
        name: 'AOT Hoodie',
        tag: 'Hoodie',
        price: 560.00,
        inCart: 0
    },
    {
        name: 'Dark Tshirt',
        tag: 'TShirt',
        price: 299.00,
        inCart: 0
    },
    {
        name: 'Anime kawaii',
        tag: 'Shirt',
        price: 499.00,
        inCart: 0
    },

    {
        name: 'Survey coprs cape',
        tag: 'cape',
        price: 560.00,
        inCart: 0
    },

    {
        name: 'Haikyuu Tshirt',
        tag: 'Haikyuu',
        price: 368.00,
        inCart: 0
    },
    {
        name: 'AOT Necklace',
        tag: 'Necklace',
        price: 80.00,
        inCart: 0
    },
    {
        name: 'Levi Lamp',
        tag: 'Lamp',
        price: 650.00,
        inCart: 0
    },
    {
        name: 'Naruto Tshirt',
        tag: 'Naruto',
        price: 299.00,
        inCart: 0
    },
    {
        name: 'Onepiece Shirt',
        tag: 'Onepiece',
        price: 399.00,
        inCart: 0
    },

]



for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = document.querySelector('.cart-list span')
    if (productNumbers) {
        productNumbers.textContent = productNumbers;
    }

}




function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');


    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-list span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-list span').textContent = 1;
    }

    setItem(product);

}

function setItem(product) {
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsIncart", JSON.stringify(cartItems));
}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalcost');

    console.log("My cart cost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price);

    } else {
        localStorage.setItem("totalcost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalcost');


    console.log(cartItems)
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            &nbsp;&nbsp;
                <div class="product">
                <i class='bx bxs-x-circle'></i>
                <img src="shop/images/${item.tag}.webp">
                <span>${item.name}</span><br>&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span>${item.price}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="quantity"><i class='bx bxs-check-circle'></i> <span>${item.inCart}</span></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="total">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>${item.inCart * item.price}.00</span>
                </div>
                `;




        });

        productContainer.innerHTML += `
                <div class="basketTotalContainer">
                <h12 class="basketTotalTitle">
                    CarTotal</h12>
                <h12 class="basketTotal">
                    ₱${cartCost}.00
                </h12>

            `;

        productContainer.innerHTML += `
            <div class="payment">
            <h12 class="paymentMethod">
                PaymentMethod</h12>
           `;
    }
}

onLoadCartNumbers();
displayCart();