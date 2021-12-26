const renderWishList = {
    start() {
        let products = ProductModel.getAll();
        let productWish = '';

        let wishList = WishListModel.GetWish();
        wishList.forEach((id) => {
            products.forEach((product) => {
                if (id == product.id) productWish += ProductItem(product);
            });
        });

        if (productWish) {
            $('.wishList__box').innerHTML = ProductBox();
            $('.product-box').innerHTML = productWish;

        } else {
            $('.wishList__box').innerHTML = WishList__Empty();
        }

        renderComponentNavbar.amountWishlist();
        wishListEvent.init();
    },
};

renderWishList.start()
