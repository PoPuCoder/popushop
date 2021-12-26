function SliderItem( slide ) {
    return html`
        <div class="slider-wrapper__slide ${slide.id == 1 && 'active'}">
            <div class="slide__content">
                <span>${slide.title}</span>
                <h3>${slide.header}</h3>
                <p>${slide.desc}</p>
                <button class="btn slide__btn">CỬA HÀNG</button>
            </div>
            <div class="slide__imageBox">
                <img src="${slide.img}" alt="" class="slide__image">
            </div>
        </div>

    `
}

function SliderDots(slide) {
    return html`
        <li class="slider-dot-item ${slide.id == 1 && 'active'}" data-index="${slide.id}"></li>
    `
}

function CategoryItem( category ) {
    return html`
    <div class="category-item">
        <h2 class="category-content" data-text="${category.name}"> ${category.name} </h2>
        <div class="category-image__box">
            <img src="${category.img}" alt="unsplash" class="category-image"/>
        </div>
    </div>
    `
}
