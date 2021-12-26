const renderHome = {
    slider: function () {
        $('.slider-wrapper').innerHTML = SliderModel.getAll()
            .map((slide) => SliderItem(slide))
            .join('');

        $('.slider-dots').innerHTML = SliderModel.getAll()
            .map((slide) => SliderDots(slide))
            .join('');
    },

    categories: function () {
        $('.category-box').innerHTML = CategoryModel.getAll()
            .map((category) => CategoryItem(category))
            .join('');
    },

    products: function (page = 1) {
        let products = ProductModel.getDocumentsByPage_Rate(page, 8);

        let productBox = $('.product .product-box');
        if (!productBox) return;

        if (page == 1) {
            productBox.innerHTML = products.map((product) => ProductItem(product)).join('');
            homeEvent.btnLoad();
        } else {
            productBox.insertAdjacentHTML(
                'beforeend',
                products.map((product) => ProductItem(product)).join('')
            );
        }

        itemProductEvent.init();
    },

    start: function () {
        this.slider();
        this.categories();
        this.products();
        homeEvent.init();
    },
};

renderHome.start();




