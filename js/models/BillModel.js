const BillModel = {
    Initialize: function () {
        localStorage.setItem('bills', JSON.stringify(BILLS));
    },
    getAll: function () {
        return JSON.parse(localStorage.getItem('bills'));
    },
    UpdateAll: function (data) {
        localStorage.setItem('bills', JSON.stringify(data));
    },
    AddBill(bill) {
        let bills = this.getAll();
        bills.push(bill);
        this.UpdateAll(bills);
    },
    AmountBillOfUser(username) {
        return this.getAll().filter(bill=> bill.username == username).length;
    }
};

if (BillModel.getAll() == null) BillModel.Initialize();
