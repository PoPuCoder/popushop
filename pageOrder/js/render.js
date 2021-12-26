const renderOrderPage = {
    items(filter = 'ALL') {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let bills;
        if (userCurrent)
            bills = BillModel.getAll().filter((bill) => bill.username == userCurrent.username);

        if (!bills) {
            $('.orderPage__items').innerHTML = OrderItemEmpty();
            return;
        }

        let items = '';
        if (filter == 'ALL') {
            items = bills.map((bill) => OrderItem(bill)).join('');
        } else {
            items = bills
                .filter((bill) => bill.status == filter)
                .map((bill) => OrderItem(bill))
                .join('');
        }

        if (items == '') $('.orderPage__items').innerHTML = OrderItemEmpty();
        else $('.orderPage__items').innerHTML = items;
        eventOrderPage.init();
    },

    start() {
        this.items();
        eventOrderPage.init();
    },
};

renderOrderPage.start();
