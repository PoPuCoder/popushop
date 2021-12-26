function OrderItem(orderBill) {
    return html`
    <div class="order__item">
        <div class="order__products">
            <div class="order-products__header">
                <h2>${
                    orderBill.status == 'PENDING'   &&  'ĐANG XỬ LÝ' ||
                    orderBill.status == 'COMPLETED' &&  'THÀNH CÔNG' ||
                    orderBill.status == 'CANCELLED' &&  'ĐÃ HỦY'
                }</h2>
            </div>
            <div class="order-products__box">
                ${orderBill.products.map(product => OrderProduct(product))}
            </div>
        </div>
        <div class="order__subtotal">
            <p>Ngày đặt: ${dateTime(orderBill.created_at)}</p>
            <div class="order-subtotal__util">
                <h2>TỔNG ĐƠN: &emsp; ${formatMoney(orderBill.subtotal,'$')}</h2>
                ${
                    orderBill.status == 'PENDING' && `
                    <button class="btn btn-complete" data-id = "${orderBill.id}"> ĐÃ NHẬN HÀNG </button>
                    <button class="btn btn-cancelled" data-id = "${orderBill.id}"> HỦY ĐƠN </button>
                    `
                }
            </div>
        </div>
    </div>
    `;
}

function dateTime(date) {
    let d = new Date(date)
    return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + " " 
}

function OrderItemEmpty() {
    return html`
        <div class="order__itemEmpty">
            <i class="fas fa-file-invoice-dollar"></i>
            <h2>Chưa có đơn hàng nào</h2>
        </div>
    `
}

function OrderProduct(product) {
    return html`
    <div class="order-product">
        <div class="order-product__info">
            <div class="order-product__imgBox">
                <img
                    src="${product.imgList[0]}"
                    alt=""
                />
            </div>
            <div class="order-product__content">
                <h2 class="order-product__name">
                    ${product.name}
                </h2>
                <p class="order-product__quantity">Số lượng: ${product.quantity}</p>
                <p class="order-product__price">Giá tiền: ${formatMoney(product.sale,'$')} / sản phẩm</p>
            </div>
        </div>
        <div class="order-products__priceTotal">
            <p>${formatMoney(product.sale * product.quantity, '$')}</p>
        </div>
    </div>
    `
}
