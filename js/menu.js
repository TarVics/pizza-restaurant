const filterLinksEl = document.getElementById('filter-links');
const listEl = document.querySelector('.list');
let menuItems = [];
const makeItems = type => {
    listEl.textContent = '';

    menuItems.forEach(menuItem => {
        if (type && menuItem.type !== type) return;

        const item = document.createElement('div');
        item.className = "price-item";

        const itemImage = document.createElement('div');
        itemImage.className = "item-image";

        const image = document.createElement('img');
        image.src = menuItem.img;
        image.alt = menuItem.name;

        itemImage.appendChild(image);

        const itemText = document.createElement('div');
        itemText.className = "item-text";

        const priceInfo = document.createElement('div');
        priceInfo.className = "price-info";

        const name = document.createElement('div');
        name.className = "name";
        name.textContent = menuItem.name;

        const price = document.createElement('div');
        price.className = "name";
        price.textContent = menuItem.price;

        priceInfo.append(name, price);

        const textInfo = document.createElement('div');
        textInfo.className = "text-info";
        textInfo.textContent = menuItem.info;

        itemText.append(priceInfo, textInfo);

        item.append(itemImage, itemText);

        listEl.appendChild(item);
    });
}

filterLinksEl.addEventListener('click', e => {
    if (!e.target.classList.contains('menu-item')) return;
    const parent = e.target.parentNode;
    [].forEach.call(parent.children, el => el.classList.remove('selected'));
    e.target.classList.add('selected');
    makeItems(e.target.dataset.type);
});

fetch('./menu.json')
    .then(response => response.json())
    .then(items => menuItems = [...items])
    .then(() => makeItems());
