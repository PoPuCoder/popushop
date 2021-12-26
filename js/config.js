const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const LIMIT = 6;

function formatMoney(n, currency) {
    if(typeof(n) != 'number') n = Number(n);
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function html([first,...string], ...value) {
    return value.reduce(
        (acc, cur) => acc.concat(cur, string.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}