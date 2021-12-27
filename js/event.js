let chekLogin = false;


const navbarEvent = {
    fancyBurger() {
        const navbar = $('.navbar');
        const btn = $('.fancy-burger');
        btn.onclick = () => {
            btn.querySelectorAll('span').forEach((span) => {
                span.classList.toggle('open');
            });
            navbar.classList.toggle('open');
        };
    },

    navItem() {
        $$('nav a').forEach((navItem) => {
            navItem.onclick = () => {
                if ($('nav a.active')) $('nav a.active').classList.remove('active');
                navItem.classList.add('active');
                if ($('.navbar.open')) $('.fancy-burger').click();
            };
        });
    },

    loadSign() {
        let userIconList = $$('#user-icon');

        if (userIconList)
            userIconList.forEach((userIcon) => {
                userIcon.onclick = () => {
                    $('.modal').classList.add('active');
                    $('.modal__body').classList.add('active');
                    renderModalSign.rememberUsername();
                    modalEvent.init('sign');
                };
            });
    },

    btnCart() {
        $('#cart-icon').onclick = () => {
            modalEvent.btnExist('cart');
            $('.modal').classList.add('active');
            $('.modal__cart').classList.add('active');
        };

        $('.icon.noti.cart').onclick = () => {
            $('#cart-icon').click();
        };
    },

    loadProfile() {
        let profileIcon = $('#profile-icon');
        if (profileIcon)
            profileIcon.onclick = () => {
                $('.modal').classList.add('active');
                $('.modal__profile').classList.add('active');
                renderModalProfile.start();
            };
    },

    SignOut() {
        let iconSignOut = $('#icon-logout');
        if (!iconSignOut) return;

        iconSignOut.onclick = () => {
            chekLogin = false;

            ProductModel.Initialize();

            let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
            let users = UserModel.getAll();

            users.forEach((user) => {
                if (user.id == userCurrent.id) {
                    user.cart = CartModel.GetCart();
                    user.wishList = WishListModel.GetWish();
                }
            });

           
            UserModel.UpdateAll(users);
            CartModel.UpdateCart([]);
            WishListModel.UpdateWish([]);
            localStorage.setItem('userCurrent', JSON.stringify(''));
            localStorage.setItem('timeExpired', JSON.stringify(''));


            renderModalCart.start();
            renderComponentNavbar.userInfoDefault();
            renderComponentNavbar.amountWishlist();

            //renderOrderPage.items();
            if(window.location.href.includes('index'))
            renderHome.products();

            if(window.location.href.includes('wishList'))
            renderWishList.start();

            if(window.location.href.includes('shop')) {
                renderShop.configProducts = ProductModel.getAll();
                renderShop.start();
            }
           
            if(window.location.href.includes('order'))
            renderOrderPage.items();
            


            
        };
    },

    init() {
        //this.fancyBurger();
        this.loadSign();
        this.SignOut();
        //this.navItem();
        this.btnCart();
        //this.btnSearch();
    },
};


const wishListEvent = {
    btn() {
        let btnWishList = $$('#wishList .icon-heart');
        let _this = this;
        btnWishList.forEach((icon) => {
            icon.onclick = function (e) {
                e.stopPropagation();
                _this.changeStatusWish(icon);
                renderWishList.start();
            };
        });

        let btnReturn = $('.wishList__Empty button');
        if (btnReturn)
            btnReturn.onclick = () => {
                window.location.href = '/shop.html';
            };
    },

    changeStatusWish(icon) {
        let wish = Number(icon.dataset.wish);
        icon.dataset.wish = wish == 0 ? 1 : 0;
        icon.classList.toggle('active');

        ProductModel.updateWish(icon.dataset.id, icon.dataset.wish);
        WishListModel.ChangeStatusWish(icon.dataset.id, icon.dataset.wish);

        if(window.location.href.includes('shop'))
        {
            for(let product of renderShop.configProducts )
                if(product.id == icon.dataset.id) 
                product.wish = icon.dataset.wish;
        }
    },

    updateProductBeWish() {
       
        let isExist;
        let wishList = WishListModel.GetWish();
        if (wishList.length == 0) return;

        let products = ProductModel.getAll();

        wishList.forEach((id) => {

            isExist = false;
            products.forEach((product) => {
                if (id == product.id) {
                    product.wish = 1;
                    isExist = true;
                }
            });

        });

        ProductModel.UpdateAll(products);
    },

    init() {
        itemProductEvent.init();
        this.btn();
    },
};


const itemProductEvent = {
    btnProduct() {
        let productControl = $$('.product-control');
        productControl.forEach((product) => {
            product.onclick = function (e) {
                e.stopPropagation();
            };
        });

        let productItem = $$('.product-item');
        productItem.forEach((product) => {
            product.onclick = function (e) {
                e.stopPropagation();
            };
        });

        let listProductBtnAdd = $$('.product-quantity .btn-add');
        listProductBtnAdd.forEach((btn) => {
            btn.onclick = function () {
                let quantity = Number.parseInt(btn.parentElement.querySelector('input').value) + 1;
                btn.parentElement.querySelector('input').value = quantity;
            };
        });

        let listProductBtnMul = $$('.product-quantity .btn-mul');
        listProductBtnMul.forEach((btn) => {
            btn.onclick = function () {
                let quantity = Number.parseInt(btn.parentElement.querySelector('input').value);
                if (quantity > 1) btn.parentElement.querySelector('input').value = quantity - 1;
            };
        });
    },

    btnWish() {
        let btnWishList = $$('.icon-heart');

        btnWishList.forEach((icon) => {
            icon.onclick = function (e) {
                e.stopPropagation();
                wishListEvent.changeStatusWish(icon);
                renderComponentNavbar.amountWishlist();

                if(!icon.classList.contains('modalIconHeart')) return;

                if(window.location.href.includes('index'))
                renderHome.products();

                if(window.location.href.includes('wishList'))
                renderWishList.start();

                if(window.location.href.includes('shop'))
                renderShop.start();
                
               
            };
        });

    },

    btnAddToCart() {
        $$('.product-add-cart').forEach(item => {
            item.onclick = () => {
                let quantity = item.parentElement.querySelector('input').value;
                quantity = Number(quantity);
                if(!quantity) quantity = 1;
                let product = { quantity,...ProductModel.getById(item.dataset.id)};
                CartModel.AddProduct(product);
                item.parentElement.querySelector('input').value = 1;
                renderToastAddToCart.start();
                renderModalCart.start();
            }
        })
    },

    btnItemProduct() {
        $$('.product-image__box').forEach((item) => {
            item.onclick = function () {
                let id = item.querySelector('.icon-heart').dataset.id;
                let product = ProductModel.getById(id);
                $('.modal').classList.add('active');
                $('.modal__product').classList.add('active');
                $('.modal__product').innerHTML = ModalProductItem(product);
                modalProduct.init();
                modalEvent.btnExist('product');
                itemProductEvent.btnAddToCart();
                itemProductEvent.btnWish();
            };
        });
    },

    init() {
        this.btnProduct();
        this.btnWish();
        this.btnAddToCart();
        this.btnItemProduct();
    }
}


const modalEvent = {
    btnNoti(view = 'normal') {
        let modalNoti = $('.modal__noti');

        $('.btn-noti').onclick = () => {
            if (view == 'sign') {
                if (chekLogin) {
                    $$('.btn-exist').forEach((btn) => {
                        btn.click();
                    });
                }
                if (modalNoti.classList.contains('success')) {
                    $('#sign-in .username').value = $('#sign-up .username').value;
                    $('.changeSignIn').click();
                    $$('.groups input').forEach((input, index) => {
                        if (index > 0) input.value = '';
                    });
                }
            }

            if (view == 'profile') {
                if (modalNoti.classList.contains('success')) {
                    $$('.modal-profile__changePass .groups input').forEach((input) => {
                        input.value = '';
                    });
                }
            }

            if (view == 'normal') {
                $('.modal').classList.remove('active');
            }

            if (view == 'checkOut') {
                $('.modal__cart').classList.add('active');
            }

            if (view == 'checkLogin') {
                $('#user-icon').click();
            }

            modalNoti.classList.remove('success');
            modalNoti.classList.remove('error');
        };

        $('.modal__noti input').onkeydown = (e) => {
            if (e.keyCode == 13) {
                $('.btn-noti').click();
                $$('.groups input')[1].focus();
            }
        };
    },

    btnExist(view) {
        $$('.btn-exist').forEach((btn) => {
            btn.onclick = () => {
                $('.modal').classList.remove('active');

                if (view == 'sign') {
                    $('.modal__body').classList.remove('active');
                    $('#sign-in').classList.remove('active');
                    $('#sign-up').classList.remove('active');
                    $$('.groups input').forEach((input, index) => {
                        if (index > 0) input.value = '';
                        ValidatorForm.clearError({ target: input });
                    });
                }

                if (view == 'profile') {
                    $('.modal__profile').classList.remove('active');
                    $('.modal-profile__main').classList.remove('hidden');
                    $('.modal-profile__changePass').classList.remove('active');
                    modalProfileEvent.disabledEdit();
                    $$('.groups input').forEach((input) => {
                        input.value = '';
                        ValidatorForm.clearError({ target: input });
                    });
                }

                if (view == 'cart') {
                    $('.modal__cart').classList.remove('active');
                }

                if (view == 'product') {
                    $('.modal__product').classList.remove('active');
                }

                $('.modal__noti').classList.remove('success');
                $('.modal__noti').classList.remove('error');
            };
        });
    },

    init(view) {
        this.btnNoti(view);
        this.btnExist(view);
    },
};


const modalSignEvent = {
    changeSign() {
        $$('.modal__inner .changeSign').forEach((header) => {
            header.onclick = () => {
                $('#sign-in').classList.toggle('active');
                $('#sign-up').classList.toggle('active');
            };
        });
    },

    showPass() {
        $$('.groups span i').forEach((item) => {
            item.onclick = () => {
                let passField = item.parentElement.parentElement.querySelector('input');
                if (passField.type === 'password') {
                    passField.type = 'text';
                    item.classList.add('hide-btn');
                } else {
                    passField.type = 'password';
                    item.classList.remove('hide-btn');
                }
            };
        });
    },

    SignIn() {
        $('.btn-signin').onclick = () => {
            let userName = $('#sign-in .username');
            let passWord = $('#sign-in .password');
            let userCurrent;

            UserModel.getAll().forEach((user) => {
                if (user.username == userName.value && user.password == passWord.value) {
                    chekLogin = true;
                    userCurrent = user;
                    UserModel.setUserCurrent(userCurrent);
                    setTimeExpired();
                }
            });

            if (chekLogin) {
                $('.modal__noti').classList.add('success');
                $('.modal__noti input').focus();
                $('.modal-noti__disc.success').innerText = 'Đăng nhập thành công';

                //update lại data của người dùng khi đăng nhập
                userCurrent.cart.forEach(product => {
                    CartModel.AddProduct(product);
                });

                let wishList = new Set([...userCurrent.wishList, ...WishListModel.GetWish()]);
                wishList = [...wishList];
                WishListModel.UpdateWish(wishList);

                wishListEvent.updateProductBeWish();

                //render lại view chung
                renderModalCart.start();
                renderComponentNavbar.userInfo(userCurrent);
                renderComponentNavbar.amountWishlist();

                //render lại view cho từng trang html
                if(window.location.href.includes('index'))
                renderHome.products();
    
                if(window.location.href.includes('wishList'))
                renderWishList.start();
    
                if(window.location.href.includes('shop'))
                renderShop.start()

                if(window.location.href.includes('order'))
                renderOrderPage.items();


    

            } else {

                $('.modal__noti').classList.add('error');
                $('.modal__noti input').focus();
                $('.modal-noti__disc.error').innerText = 'Tài khoản và mật khẩu sai';
            }
        };

        $('#sign-in').onkeydown = (e) => {
            if (e.keyCode == 13) $('.btn-signin').click();
        };
    },

    SignUp() {
        $('.btn-signup').onclick = () => {
            let isValid = true;

            let inputList = $('.btn-signup').parentElement.querySelectorAll('.groups input');
            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                $('.modal__noti').classList.add('success');
                $('.modal-noti__disc.success').innerText = 'Đăng ký thành công';
                UserModel.Insert({
                    id: UserModel.getIdMax() + 1,
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value,
                    username: inputList[3].value,
                    password: inputList[4].value,
                    isAdmin: false,
                    cart: [],
                    wishList: [],
                });
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đủ thông tin';
            }
        };
        $('#sign-up').onkeydown = (e) => {
            if (e.keyCode == 13) $('.btn-signup').click();
        };
    },

    init() {
        this.changeSign();
        this.showPass();
        this.SignIn();
        this.SignUp();
        modalEvent.init('sign');
        ValidatorForm.Initialize('#sign-up .form');
    },
};


const modalCartEvent = {

    btnQuantity() {
        let listProductBtnAdd = $$('.cartEvent .cart__item-increment');
        listProductBtnAdd?.forEach((btn) => {
            btn.onclick = function () {
                let quantity = btn.parentElement.querySelector('input').value;
                quantity = Number(quantity) + 1;
                btn.parentElement.querySelector('input').value = quantity;

               
                let product = { quantity: 1,...ProductModel.getById(btn.dataset.id)};
                CartModel.AddProduct(product);
                renderModalCart.subtotal();
            };
        });

        let listProductBtnMul = $$('.cartEvent .cart__item-decrement');
        listProductBtnMul?.forEach((btn) => {
            btn.onclick = function () {
                let quantity =Number(btn.parentElement.querySelector('input').value);
                if (quantity > 1) btn.parentElement.querySelector('input').value = --quantity;

                let product = { quantity: -1,...ProductModel.getById(btn.dataset.id)};
                CartModel.AddProduct(product);
                renderModalCart.subtotal();
            };
        });
    },

    btnDelete() {
        $$('.modal__cart-delete-icon')?.forEach(btn => {
            btn.onclick = () => {
                CartModel.DeleteProduct(btn.dataset.id);
                renderModalCart.start();
            }
        })
    },

    btnCheckOut() {
        $('.modal__cart-view-cart-btn').onclick = () => {
            let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));

            if(userCurrent == "") {
                $('.modal__cart').classList.remove('active');
                modalEvent.btnNoti("checkLogin");
                $('.modal__noti').classList.add('error');
                $('.modal__noti input').focus();
                $('.modal-noti__disc.error').innerText = 'Vui lòng đăng nhập để đặt hàng !';
                return;
            }
           
            let id = BillModel.getAll().length + 1;
            let billNew = { 
                id,
                username: userCurrent.username,
                products: CartModel.GetCart(),
                subtotal: CartModel.GetSubtotal(),
                created_at: Date.now(),
                status : "PENDING",
            }
            BillModel.AddBill(billNew);
            CartModel.UpdateCart([]);
            renderModalCart.start();

            $('.modal__cart').classList.remove('active');
            modalEvent.btnNoti("checkOut");
            $('.modal__noti').classList.add('success');
            $('.modal__noti input').focus();
            $('.modal-noti__disc.success').innerText = 'Đã đặt hàng thành công !';


        }
    },

    init() {
        this.btnQuantity();
        this.btnDelete();
        this.btnCheckOut();
    }
}

const modalProduct = {
    btnPrevNext() {
        let imgList = $$('.modal__product-image-box img');
        let i = 0;

        $('.product-image__control.right').onclick = () => {
            imgList.forEach((img) => {
                img.classList.remove('active');
            });

            i = (i + 1) % imgList.length;
            imgList[i].classList.add('active');
        }

        $('.product-image__control.left').onclick = () => {
            imgList.forEach((img) => {
                img.classList.remove('active');
            });

            i = (i - 1 + imgList.length) % imgList.length;
            imgList[i].classList.add('active');
        }
    },

    btnQuantity() {
        let listProductBtnAdd = $$('.productEvent .cart__item-increment');
        listProductBtnAdd?.forEach((btn) => {
            btn.onclick = function () {
                let quantity = btn.parentElement.querySelector('input').value;
                quantity = Number(quantity) + 1;
                btn.parentElement.querySelector('input').value = quantity;
            };
        });

        let listProductBtnMul = $$('.productEvent .cart__item-decrement');
        listProductBtnMul?.forEach((btn) => {
            btn.onclick = function () {
                let quantity =Number(btn.parentElement.querySelector('input').value);
                if (quantity > 1) btn.parentElement.querySelector('input').value = --quantity;
            };
        });
    },

    init() {
        this.btnPrevNext();
        this.btnQuantity();
    }
}



const modalProfileEvent = {
    activeEdit() {
        let inputList = $$('.modal-profile__info input');
        $('#edit-profile').onclick = () => {
            $('.modal-profile__info').classList.add('edit');
            $('.modal-profile__main').classList.remove('hidden');
            $('.modal-profile__changePass').classList.remove('active');
            inputList.forEach((input) => {
                input.disabled = false;
            });
        };
    },

    disabledEdit() {
        let inputList = $$('.modal-profile__info input');
        $('.modal-profile__info').classList.remove('edit');
        inputList.forEach((input) => {
            input.setAttribute('disabled', '');
        });
    },

    save() {
        let inputList = $('.btn-save').parentElement.querySelectorAll('.groups input');
        $('.btn-save').onclick = () => {
            let isValid = true;

            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                this.disabledEdit();
                let infoNew = {
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value,
                };

                let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
                UserModel.chaneInfo(infoNew, userCurrent);
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đúng thông tin';
            }
        };
    },

    changePass() {
        $('#change-pass').onclick = () => {
            $('.modal-profile__main').classList.add('hidden');
            $('.modal-profile__changePass').classList.add('active');
            this.disabledEdit();
        };
    },

    changeProfile() {
        $('.modal-profile__changePass .changeSign').onclick = () => {
            $('.modal-profile__main').classList.remove('hidden');
            $('.modal-profile__changePass').classList.remove('active');

            $$('.modal-profile__changePass .groups input').forEach((input) => {
                input.value = '';
                ValidatorForm.clearError({ target: input });
            });
        };
    },

    btnChangePass() {
        let inputList = $('.btn-changePass').parentElement.querySelectorAll('.groups input');
        $('.btn-changePass').onclick = () => {
            let isValid = true;

            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                $('.modal__noti').classList.add('success');
                $('.modal-noti__disc.success').innerText = 'Đổi pass thành công';
                let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
                UserModel.changePass(userCurrent, inputList[1].value);
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đúng thông tin';
            }
        };
    },

    init() {
        this.activeEdit();
        this.save();
        this.changePass();
        this.changeProfile();
        this.btnChangePass();
        modalEvent.init('profile');
        ValidatorForm.Initialize('.modal-profile__main .form');
        ValidatorForm.Initialize('.modal-profile__changePass .form');
    },
};

navbarEvent.init();
modalSignEvent.init();


const homeEvent = {
    slider() {
        let slides = $$('.slider-wrapper__slide');
        let sliderDots = $$('.slider-dot-item');
        let i = 0;
        let timeout = 5000;

        let btnNext = $('.btn-next');
        btnNext.onclick = function () {
            $('.slider-wrapper__slide.active').classList.remove('active');
            $('.slider-dot-item.active').classList.remove('active');

            i = (i + 1) % slides.length;
            slides[i].classList.add('active');
            sliderDots[i].classList.add('active');
        };

        let btnPrev = $('.btn-prev');
        btnPrev.onclick = function () {
            $('.slider-wrapper__slide.active').classList.remove('active');
            $('.slider-dot-item.active').classList.remove('active');

            i = (i - 1 + slides.length) % slides.length;
            slides[i].classList.add('active');
            sliderDots[i].classList.add('active');
        };
        auto();
        function auto() {
            var lap = setInterval(function () {
                btnNext.click();
            }, timeout);

            btnNext.addEventListener('click', function () {
                clearInterval(lap);
                lap = setInterval(function () {
                    btnNext.click();
                }, timeout);
            });

            btnPrev.addEventListener('click', function () {
                clearInterval(lap);
                lap = setInterval(function () {
                    btnNext.click();
                }, timeout);
            });
        }

        sliderDots.forEach((item) => {
            item.addEventListener('click', function (e) {
                i = e.target.dataset.index - 2;
                btnNext.click();
            });
        });

        $$('.btn.slide__btn').forEach((btn) => {
            btn.onclick = () => {
                window.location.href = '/shop.html';
            };
        });
    },

    btnItemCategory() {
        $$('.category-item').forEach((item) => {
            item.onclick = () => {
                let categoryName = item.querySelector('.category-content').innerText;
                window.location.href = `/shop.html?${categoryName}`;
            };
        });
    },

    btnLoad() {
        var btnLoad = $('.btn-load');
        btnLoad.style.display = 'block';

        let page = 1;
        btnLoad.onclick = function () {
            renderHome.products(++page);
            if (page == Math.floor(ProductModel.getTotalPage_Rate(8)))
                btnLoad.style.display = 'none';
        };
    },

    init() {
        this.slider();
        this.btnLoad();
        this.btnItemCategory();
    },
};

const eventOrderPage = {

    btnCancell() {
        $$('.btn-cancelled')?.forEach(btn => {
            btn.onclick = () => {
                $('.modal').classList.add('active');
                $('.modal__order').classList.add('active');
                $('.modal-noti__disc.warning').innerText = 'BẠN CÓ CHẮC CHẮN HỦY ĐƠN NÀY ???';
                eventOrderPage.btnWarningCancel(btn.dataset.id);
            }
        })
    },

    btnComplete() {
        $$('.btn-complete')?.forEach(btn => {
            btn.onclick = () => {
                $('.modal').classList.add('active');
                $('.modal__order').classList.add('active');
                $('.modal-noti__disc.warning').innerText = 'BẠN CÓ CHẮC ĐÃ NHẬN ĐƯỢC ĐƠN NÀY ???';
                eventOrderPage.btnWarningComp(btn.dataset.id);
            }
        })
    },

    btnFilter() {
        $$('.orderPage-filter__item').forEach((item) => {
            item.onclick = () => {
                $('.orderPage-filter__item.active').classList.remove('active');
                item.classList.add('active');

                let filter = item.dataset.filter;
                renderOrderPage.items(filter);
            };
        });
    },

    btnWarningCancel(id) {
        $('.btn-warning-ok').onclick = () => {
            let bills = BillModel.getAll();
            bills.forEach(bill => {
                if(bill.id == id) {
                    bill.status = 'CANCELLED';
                }
                BillModel.UpdateAll(bills);
                renderOrderPage.start();
                $('.orderPage-filter__item.ALL').click();
            })
            $('.modal').classList.remove('active');
            $('.modal__order').classList.remove('active');
        }
        $('.btn-warning-cancel').onclick = () => {
            $('.modal').classList.remove('active');
            $('.modal__order').classList.remove('active');
        }
    },

    btnWarningComp(id) {
        $('.btn-warning-ok').onclick = () => {
            let bills = BillModel.getAll();
            bills.forEach(bill => {
                if(bill.id == id) {
                    bill.status = 'COMPLETED';
                }
            })
            BillModel.UpdateAll(bills);
            renderOrderPage.start();

            $('.orderPage-filter__item.ALL').click();
            $('.modal').classList.remove('active');
            $('.modal__order').classList.remove('active');
        }
        $('.btn-warning-cancel').onclick = () => {
            $('.modal').classList.remove('active');
            $('.modal__order').classList.remove('active');
        }
    },

    init() {
        this.btnFilter();
        this.btnCancell();
        this.btnComplete();
    },
};

const shopEvent = {

    categoryItem() {
        $$('.collection-item').forEach(item => {
            item.onclick = (e) => {
                if(e.target.type != 'checkbox') {  
                    let check = item.querySelector('input').checked;
                    item.querySelector('input').checked = !check;
                }
                
                item.classList.toggle('active');
                shopEvent.filterProductAdvanced()
            }        
        })
    },

    rateItem() {
        $$('.filter-rate-items').forEach(item => {
            item.onclick = () => {
                if(item.classList.contains('active')) {
                    item.classList.remove('active')
                }
                else {
                    $('.filter-rate-items.active')?.classList.remove('active');
                    item.classList.add('active')
                }
                

                shopEvent.filterProductAdvanced()
            }
        })
    },

    pageItem() {
        let totalPage = ProductModel.getTotalPage(renderShop.configProducts);
        let pageItems = $$('.page-item')

        pageItems.forEach(item => {
            item.onclick = () => {
                let page = Number(item.innerText);
                renderShop.pageItem(page);
                renderShop.products(page);       
            }
        }) 
        
        let btnPrev =  $('.btn-page-prev')
        if(btnPrev)
        btnPrev.onclick = () => {
            let page = Number(btnPrev.dataset.page);
            renderShop.pageItem(page);
            renderShop.products(page);    
        }

        let btnNext =  $('.btn-page-next')
        if(btnNext)
        btnNext.onclick = () => {
            let page = Number(btnNext.dataset.page);
            renderShop.pageItem(page);
            renderShop.products(page);    
        }

    },

    btnFilterPrice() {
        $('.btn-filter-price').onclick = () => {
            shopEvent.filterProductAdvanced();
        }
    },

    btnFitlerName() {
        $('.btn-filter-name').onclick = () => {
            shopEvent.filterProductAdvanced();
            $('.shop-products__filter input').value = "";
        }
    },

    btnDeleteFilter() {
        $('.btn-delete-filter').onclick = () => {
            let checkboxCategorys = $$('input:checked');
            checkboxCategorys.forEach(checkbox => {
               checkbox.click();
            })
    
            $('input.price-from').value = "";
            $('input.price-to').value = "";
            $('.filter-rate-items.active')?.classList.remove('active')
            $('.shop-products__filter input').value = "";

            shopEvent.filterProductAdvanced();
        }
    },

    filterProductAdvanced() {
        let checkboxCategorys = $$('input:checked');
        let filterCategorys = [];

        if(checkboxCategorys.length != 0) 
            checkboxCategorys.forEach(checkbox => {
                filterCategorys.push(checkbox.value );
            })

        let form = +$('input.price-from').value || 0;
        let to = +$('input.price-to').value || 999999;

        let rate = +$('.filter-rate-items.active')?.dataset.rate || 1;
        let name = $('.shop-products__filter input').value

        //Category
        let productFiletered
        if(filterCategorys != "") 
            productFiletered = ProductModel.getAll()
            .filter(product => 
                filterCategorys.includes(product.category) &&
                product.sale >= form && product.sale <= to               &&
                product.rate >= rate                                     &&
                product.name.toUpperCase().includes(name.toUpperCase())
            )

        else  //Lay tat ca loai san pham
            productFiletered = ProductModel.getAll()
            .filter(product =>               
                product.sale >= form && product.sale <= to               &&
                product.rate >= rate                                     &&
                product.name.toUpperCase().includes(name.toUpperCase())
            )
        
        renderShop.configProducts = productFiletered;
        renderShop.products();
        renderShop.pageItem();
        renderShop.resultFilter();

    },

    init() {
        this.categoryItem()
        this.rateItem();
        this.btnFilterPrice();
        this.btnFitlerName();
        this.btnDeleteFilter();
    }
}