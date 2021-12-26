function CategoryItemFilter(category) {
    return`
    <li class="collection-item">
        <input type="checkbox" class="checkbox-${category.name}" value="${category.name}"/>
        <span>${category.name} (${AmountProductOfCategory(category.name)})</span>
    </li>
    `
}

function AmountProductOfCategory(category) {
    return ProductModel.getAll().filter(product => product.category == category).length;
}

function PageItem(number, page) {
    return `
        <li class="page-item ${number == page && 'active'}">${number}</li>
    `
}