const ProductModel = {
    Initialize: function (newData) {
        localStorage.setItem('products', JSON.stringify(PRODUCTS));
    },

    UpdateAll: function (data) {
        localStorage.setItem('products', JSON.stringify(data));
    },

    getAll: function () {
        return JSON.parse(localStorage.getItem('products'));
    },

    getById(id) {
        return this.getAll().filter(product => product.id == id)[0];
    },

    getTotalPage(document) {
        return Math.floor(
            totalPageUser =
            document.length % LIMIT == 0 ? document.length / LIMIT : document.length / LIMIT + 1);
    },

    getDocumentsByPage(page, document) {
        return document.slice((page - 1) * LIMIT, page * LIMIT);
    },

    getTotalPage_Rate: function (LIMIT) {
        return (totalPageUser =
            this.getAll().filter((product) => product.rate == 5).length % LIMIT == 0
                ? this.getAll().filter((product) => product.rate == 5).length / LIMIT
                : this.getAll().filter((product) => product.rate == 5).length / LIMIT + 1);
    },

    getDocumentsByPage_Rate: function (page, LIMIT) {
        return this.getAll()
            .filter((product) => product.rate == 5)
            .slice((page - 1) * LIMIT, page * LIMIT);
    },

    updateWish: function (id, wish) {
        const collection = this.getAll();
        for (let document of collection) {
            if (document.id == id) {
                document.wish = wish;
            }
        }
        this.UpdateAll(collection);
    }
};

if (ProductModel.getAll() == null) ProductModel.Initialize();
