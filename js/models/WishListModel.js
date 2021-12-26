const WishListModel = {

    GetWish() {
        return JSON.parse(localStorage.getItem('WISHLIST'));
    },

    ChangeStatusWish(idProduct, wish) {
        let wishList = this.GetWish();
        if(wish == 1) wishList.push(idProduct);
        else {
            let index = wishList.indexOf(idProduct);
            wishList.splice(index, 1);
        }
        this.UpdateWish(wishList);
    },

    UpdateWish(wishList) {
        localStorage.setItem('WISHLIST', JSON.stringify(wishList));
    },

}

if (WishListModel.GetWish() == null) WishListModel.UpdateWish([]);