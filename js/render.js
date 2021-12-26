const renderComponentNavbar = {
    userInfo(userCurrent) {
        $('.user-info').innerHTML = UserInfo(userCurrent);
        navbarEvent.SignOut();
        navbarEvent.loadProfile();
    },

    userInfoDefault() {
        $('.user-info').innerHTML = UserInfoDefault();
        navbarEvent.loadSign();
    },

    rememberAccount() {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent) {
            this.userInfo(userCurrent);
            //fix loi load lại lại bắt login nữa hic
            chekLogin = true;
        }
    },

    amountWishlist() {
        let wish = WishListModel.GetWish();
        $('.navigation-container .icon.wishList').dataset.amount = wish.length;
        $('.navigation-mobile .icon.noti.wishList').dataset.amount = wish.length;
    },

    amountCart() {
        let cart = CartModel.GetCart();
        $('.navigation-container .icon.cart ').dataset.amount = cart.length;
        $('.navigation-mobile .icon.noti.cart ').dataset.amount = cart.length;
    },

    start() {
        this.rememberAccount();
        this.amountWishlist();
        this.amountCart();
    },
};

const renderModalSign = {
    rememberUsername() {
        let username = JSON.parse(localStorage.getItem('username'));
        if (username) {
            $$('.groups input')[0].value = username;
            $$('.groups input')[1].focus();
        } else {
            $$('.groups input')[0].focus();
        }
    },
};

const renderModalProfile = {
    start() {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let inputList = $$('.modal-profile__info input');
        if (inputList) {
            inputList[0].value = userCurrent.fullname;
            inputList[1].value = userCurrent.address;
            inputList[2].value = userCurrent.phone;
        }
        $('.modal-profile__imgBox img').src =
            userCurrent.img || 'https://source.unsplash.com/random';
        $('.modal-profile__header h1').innerText = userCurrent.username;
        modalProfileEvent.init();
    },
};

const renderModalCart = {
    product() {
        let products = CartModel.GetCart();

        if(products.length ==  0) {
            $('.modal__cart-footer').style.display = 'none';
            $('.modal__cart-product-box').innerHTML = CartModelEmpty();
            return;
        }

        $('.modal__cart-footer').style.display = 'block';
        products = products.map(product => ProductItemCartModel(product)).join('');
        $('.modal__cart-product-box').innerHTML = products;
    },

    subtotal() {
        let subtotal = CartModel.GetSubtotal();
        $('.modal__cart-subtotal-all').innerHTML = formatMoney(subtotal, '$');
    },

    start() {
        this.product();
        this.subtotal();
        modalCartEvent.init();
        renderComponentNavbar.amountCart();
    },
};

const renderToastAddToCart = {
    start() {
        let toastApp = $('#toast-app');
        let toasts = document.createElement('div');
        toasts.classList.add('toast-app');
        toasts.innerHTML = ToastAddToCart();
        toastApp.appendChild(toasts);

        toasts.querySelector('.toast-app__close').onclick = () => {
            toastApp.removeChild(toasts);
        };

        setTimeout(() => {
            if (toasts) toastApp.removeChild(toasts);
        }, 2000);
    },
};

renderComponentNavbar.start();
renderModalCart.start();