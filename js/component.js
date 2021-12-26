function UserInfo(user) {
    return html`
    <div class="user_menu ">
        <div class="profile">
            <img src="${user.img || 'https://source.unsplash.com/random'}" alt="">
        </div>
        <div class="menu">
            <h2 class="fullname">${user.username}</h2>
            <ul>
                <li class="menu__item"  id="profile-icon">
                    <i class="fas fa-user"></i>
                    <p>Profile</p>
                </li>
                <li class="menu__item">
                    <i class="fas fa-file-invoice-dollar"></i>
                    <a href="#order">Order</a>
                </li>
                <li class="menu__item" id="icon-logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <p>Logout</p>  
                </li>
            </ul>
        </div>
    </div> 
    `
}

function UserInfoDefault() {
    return html`
    <i class="fas fa-user" id="user-icon"></i> 
    `
}

function ProductItem( product) {
    return html`  
        <div class="product-item">
            <div class="product-image__box">

                <img src="${product.imgList[0]}" alt="unsplash" class="product-image"/>
                <img src="${product.imgList[1]}" alt="unsplash" class="product-image--back"/>

                <div class="icon-heart ${product.wish == 1 && 'active'}" data-id="${product.id}" data-wish="${product.wish}">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart"></i>
                </div>
                
                <div class="product-control">
                    <div class="product-quantity">
                        <button class="btn btn-mul"> - </button>
                        <input type="number" class ="product-input-quantity" data-id="${product.id}" min="1" max="9999" value="1">
                        <button class="btn btn-add"> + </button>
                    </div>
                    <div class="product-add-cart" data-id = "${product.id}">
                        <div>
                            <p id="add">THÊM VÀO GIỎ</p>
                        </div>
                        <div>
                            <i id="cart-icon" class="fas fa-shopping-cart"></i>
                        </div>   
                    </div>

                </div>
            </div>

            <div class="product-info">
                <h2 class="product-info__heading">${product.name}</h2>
                <div class="product-price">
                    <span class="product-info__price product-info__price--sale">${ formatMoney(product.price, '$')}</span>
                    <span class="product-info__price">${ formatMoney(product.sale, '$')}</span>
                </div> 
            </div> 
        </div>
    `
}

function ProductItemCartModel(product) {
    return `
        <li class="modal__cart-product-item">
            <div class="modal__cart-imgbox">
                <img class="modal__cart-img" src="${product.imgList[0]}" alt="">
            </div>

            <div class="modal__cart-item-infor">
                <h3 class="modal__cart-item-name">${product.name}</h3>
                <span class="modal__cart-item-price">${formatMoney(product.sale, '$')}</span>
                <div class="modal__cart-item-input cartEvent">
                    <button class="cart__item-decrement" data-id = "${product.id}">-</button>

                    <input type="number" min="1" max="9999" step="1" value="${product.quantity}" class="cart_item-input" data-id = "${product.id}" inputmode="numeric">

                    <button class="cart__item-increment" data-id = "${product.id}">+</button>
                </div>
            </div>

            <div class="modal__cart-delete-icon deleteIcon"  data-id = "${product.id}" >
                <i class="far fa-trash-alt deleteIcon"></i>
            </div>
        </li>
    `;
}

function CartModelEmpty() {
    return `
    <div class = "modal__cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h4 class="modal__cart-empty-text">Giỏ Hàng Của Bạn Trống :(((</h4>
        <a href="/order.html">ĐƠN HÀNG CỦA TÔI</a>
    </div>
  `
}

function ToastAddToCart() {
    return html`
        <div class="toast-app__icon">
            <i class="fas fa-cart-plus"></i>
        </div>
        <div class="toast-app__body">
            <h3 class="toast-title">Đã thêm vào giỏ hàng</h3>
            <p class="toast-msg">Vào giỏ hàng của bạn và kiểm tra ngay</p>
        </div>
        <div class="toast-app__close">
            <i class="fas fa-times"></i>
        </div>
    `
}

function ModalProductItem(product) {
    return html`
    <button class="btn-exist">
        <i class="fas fa-times"></i>
    </button>

    <div class="modal__product-image-box">
        ${product.imgList.map((img,index) => `
            <img class="${index == 0 && "active" }" src="${img}" alt="unsplash"/>
        `).join('')}
        
        

        <div class="product-image__control right">
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="product-image__control left">
            <i class="fas fa-chevron-left"></i>
        </div>
    </div>
    <div class="modal__product-info">
        <h3 class="product__header">${product.name}</h3>
        <span class="product__price">${ formatMoney(product.price, '$')}</span>
        <span class="product__sale">${ formatMoney(product.sale, '$')}</span>
        <div class="product__rate">
            ${rateProduct(product.rate)}
        </div>
        <span class="product__disr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptas quia alias eos odit pariatur voluptate ullam, voluptates magnam maxime?</span>
        <div class="product__unit">
            <div class="modal__cart-item-input productEvent">
                <button class="cart__item-decrement" data-id = "${product.id}">-</button>

                <input type="number" min="1" max="9999" step="1" value="1" class="cart_item-input" data-id = "${product.id}" inputmode="numeric">

                <button class="cart__item-increment" data-id = "${product.id}">+</button>
            </div>

            <div class="icon-heart ${product.wish == 1 && 'active'}" data-id="${product.id}" data-wish="${product.wish}">
                <i class="far fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
        </div>

        <button class="btn product-add-cart" data-id = "${product.id}">
            THÊM VÀO GIỎ
        </button>
        <img src="./images/img_more.png" alt="">
    </div>
    `
}

function rateProduct(rate) {
    let rateDefault = 5;
    let itemRate = "";

    for(let i=1; i<= rate ; i++)
    itemRate += `<i class="fas fa-star"></i>`;
       
    for(let i=1; i<= rateDefault - rate ; i++)
    itemRate += `<i class="far fa-star"></i>`;
       
    return itemRate;
}
