const renderShop = {

    configProducts: ProductModel.getAll(),

    categories() {
        let categories = CategoryModel.getAll();
        categories = categories.map(category => CategoryItemFilter(category));
        $('.filter-product__collections').innerHTML = categories.join('') ;
    },
    
    products(page = 1) {
        let products = ProductModel.getDocumentsByPage(page, this.configProducts);
        let productBox = $('#shop .product-box');
        productBox.innerHTML = products.map((product) => ProductItem(product)).join('');
        itemProductEvent.init()
    },

    pageItem(page = 1) {
        let TotalPage = ProductModel.getTotalPage(this.configProducts);

        if(TotalPage == 1) {
            $('.shop-products__pages').innerHTML = "";
            return;
        }

        let pagesHtml = "";
        let beforePage = page - 1;
        let afterPage = page + 1;
        
        if(page > 1) 
        pagesHtml = `<i class="fas fa-caret-square-left btn-page-prev" data-page="${page-1}"></i>`;
        if(page > 2) 
        pagesHtml += `<li class="page-item">1</li>`;
        if(page > 3) 
        pagesHtml += `<li class="page-dots">....</li>`;


        
        for(let i = beforePage; i <= afterPage; i ++)
        {
            if(i > TotalPage) continue;

            if(i != 0 && i != TotalPage + 1)
            pagesHtml += PageItem(i, page);
           
        }

        if(page < TotalPage - 2) 
        pagesHtml += `<li class="page-dots">....</li>`

        if(page < TotalPage - 1) 
        pagesHtml += `<li class="page-item">${TotalPage}</li>`

        if(page < TotalPage) 
        pagesHtml += `<i class="fas fa-caret-square-right btn-page-next" data-page="${page+1}"></i>`;


        $('.shop-products__pages').innerHTML = pagesHtml;

        shopEvent.pageItem();
    },

    resultFilter() {
        let amount = this.configProducts.length;
        if(amount == 0 )  $('.result-filter__title').innerText = `Không tìm thấy sản phẩm nào!!!`;
        else
        $('.result-filter__title').innerText = `Đã tìm thấy ${amount} sản phẩm !!!`
    },

    start() {
        this.products();
        this.categories();
        this.pageItem();
        shopEvent.init();

        if(window.location.href.includes('shop.html?'))
        {
            let category = window.location.href.split('?')[1];
            $(`.checkbox-${category}`).click();
        }
    },
};
renderShop.start()
