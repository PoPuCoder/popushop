const CartModel = {
    AddProduct(product) {
        let cart = this.GetCart();
        let isExist = false;
        cart.forEach(proCart => {
            if(proCart.id == product.id) {
                proCart.quantity += product.quantity;
                isExist = true;
            }
        });

        if(!isExist) cart.push(product);
        this.UpdateCart(cart);
    },

    UpdateCart(cart) {
        localStorage.setItem('CART', JSON.stringify(cart));
    },

    DeleteProduct(id) {
        let cart = this.GetCart();
        let index = 0;
        cart.forEach((product, ind) => {
            if(product.id == id ) index = ind;
        });
        cart.splice(index, 1);
        this.UpdateCart(cart);
    },

    GetCart() {
        return JSON.parse(localStorage.getItem('CART'));
    },

    GetSubtotal() {
        let subtotal = 0;
        this.GetCart().forEach(product => {
            subtotal += product.quantity * product.sale;
        })
        return subtotal;
    }
}

if (CartModel.GetCart() == null) CartModel.UpdateCart([]);