import data from './data.js';

const itemsContainer = document.querySelector('#items');

const itemList = document.getElementById('item-list');
itemList.innerHTML = '';
console.log(itemList);

const cartQty = document.getElementById('cart-qty');

console.log(cartQty);

const cartTotal = document.getElementById('cart-total');
console.log(cartTotal);


const cart = [];

// Handle change events on update input
itemList.onchange = function (e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const qty = parseInt(e.target.value);
		updateCart(name, qty);
	};
};

itemList.onclick = function (e) {
	
	if (e.target && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name;
		removeItem(name);
	} else if (e.target && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name;
		addItem(name);
	} else if (e.target && e.target.classList.contains('remove-one')) {
		const name = e.target.dataset.name;
		removeItem(name, 1);
	};
};


function addItem(name, price) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			cart[i].qty += 1;
			showItems();
			return;
		};
	};
	const item = { name, price, qty: 1 };
	cart.push(item);
};


// Show Items
function showItems() {
	const qty = getQty();
	//displays quantity of items on page
	cartQty.innerHTML = `You have ${qty} items in your cart`;

	let itemStr = '';

	for (let i = 0; i < cart.length; i += 1) {
		
		const { name, price, qty } = cart[i];
		const total = qty * price;

		itemStr += `<li> 
		${name} $${price} * ${qty} = $${total.toFixed(2)} 
		<button class="remove" data-name="${name}"> 
		Remove 
		</button>
		<button class="add-one" data-name="${name}"> 
		+
		</button>
		<button class="remove-one" data-name="${name}"> 
		- 
		</button>
		<input class="update" type="number" data-name="${name}">
		</li>`;
	};
	// displays item list on page
	itemList.innerHTML = itemStr;

	// displays cart total on page
	cartTotal.innerHTML = `Your total in cart: $${getTotal()}`;
};


function getQty() {
	let qty = 0;
	for (let i = 0; i < cart.length; i += 1) {
		qty += cart[i].qty;
	};
	return qty;
};


function getTotal() {
	let total = 0;
	for (let i = 0; i < cart.length; i += 1) {
		total += cart[i].price * cart[i].qty;
	};
	return total.toFixed(2);
};

// ---------------------------------------------
// Remove Item
function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty;
			};

			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1);
			};
			showItems();
			return;
		};
	};
};

function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty < 1) {
				removeItem(name);
			};
			cart[i].qty = qty;
			showItems();
			return;
		};
	};
};

for (let i = 0; i < data.length; i += 1) {
	const newDiv = document.createElement('div');
	newDiv.className = 'item';
	const img = document.createElement('img');
	img.src = data[i].image;
	img.width = 300;
	img.height = 300;
	newDiv.appendChild(img);
	itemsContainer.appendChild(newDiv);

	const desc = document.createElement('p');
	desc.innerText = data[i].desc;
	newDiv.appendChild(desc);

	const price = document.createElement('p');
	price.innerText = data[i].price;
	newDiv.appendChild(price);

	const button = document.createElement('button');
	button.id = data[i].name;

	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price;
	button.innerHTML = "Add to Cart";
	newDiv.appendChild(button);


	console.log(newDiv);

};

//creates array for all buttons on page
const all_items_button = Array.from(document.querySelectorAll("button"));
console.log(all_items_button);

all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems();
}));