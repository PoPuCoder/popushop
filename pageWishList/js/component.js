function ProductBox() {
    return html`
    <div class="product-box"></div>       
    `
}

function WishList__Empty() {
    return html`
    <div class="wishList__Empty">
        <div class="emty__logo">
            <i class="far fa-heart"></i>
        </div>
        <h2>DANH SÁCH YÊU THÍCH TRỐNG.</h2>
        <p>Bạn chưa có bất kỳ sản phẩm nào trong danh sách yêu thích.</p>
        
        <p>Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.</p>

        <button class="btn">RETURN TO SHOP</button>
    </div>
    `
}