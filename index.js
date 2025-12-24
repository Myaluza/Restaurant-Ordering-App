import { menuArray } from '/data.js'

const bodyEl = document.querySelector('body')
const orderSection = document.getElementById('order-items')
let isOrderPageVisible = false
let orderTotal = 0

function render() {
    bodyEl.innerHTML += `<header>
                            <h1>Thuthu's diner</h1>
                            <h2>The best burgers and pizza in town</h2>
                        </header>`
    menuArray.forEach(item => {
        bodyEl.innerHTML += `<section>
                                <div class='item data-${item.id}'>
                                    <p class='icon'>${item.emoji}</p>
                                    <div>
                                        <h2>${item.name}</h2>
                                        <p class="description">${[...item.ingredients]}</p>
                                        <p>$${item.price

                                        }</p>
                                    </div>
                                </div>
                                <button id="${item.id}">+</button>
                            </section>`
    });
    bodyEl.innerHTML += `<div id="modal"><form id="form"></form></div>`
}

render()

document.addEventListener('click', (e) => { 
    if (e.target.id) {
        const clickedEl = menuArray.find(item => item.id == e.target.id)
        if (!clickedEl) {
            return
        }
        if (isOrderPageVisible === false) {
        isOrderPageVisible = true
        renderOrderSection()
        
    }
    clickedEl.quantity += 1
    addOrderItems()
    }
    else if (e.target.dataset.remove) {
        menuArray.forEach( item => {
            if (e.target.dataset.remove == item.id) {
                item.quantity = 0
            }
        })
        addOrderItems()
    }
    else if (e.target.dataset.complete) {
        displayForm()
    }
    else if (e.target.dataset.button) {
        e.preventDefault()
        orderDone()
    }
})

function renderOrderSection() {
    bodyEl.innerHTML += `<section id="order-section">
                                <div id="order-heading">
                                    <h2>Your Order</h2>
                                </div>
                                <div id="order-items">
                                </div>
                                <div id="total-container">
                                </div>
                            </section>`
}

function addOrderItems() {
    const orderContainer = document.getElementById('order-section')
    const orderSection = document.getElementById('order-items')
    const totalSection = document.getElementById('total-container')
    orderSection.innerHTML = ""
    orderContainer.style.display = "flex"
    orderTotal = 0
    menuArray.forEach( item => {
        if (item.quantity > 0) {
            orderSection.innerHTML += `<div class="order-item-row">
                                            <div class="order-item-description">
                                            <h2>${item.name}</h2>
                                            <p>${item.quantity}</p>
                                            <p data-remove="${item.id}">remove</p>
                                            </div>
                                            <p>${item.price * item.quantity}</p>
                                        </div>` 
            orderTotal += (item.price * item.quantity)
        }
    })
    renderTotal()
    if (orderTotal == 0) {
        orderContainer.style.display = "none"
    }
}

function renderTotal() {
    const totalSection = document.getElementById('total-container')
    totalSection.innerHTML = `<div id="order-total">Total Price: $${orderTotal}</div>
                                <button class="order-button" data-complete="true">Complete Order</button>`
}

function displayForm() {
    const modalEl = document.getElementById('modal')
    const formEl = document.getElementById('form')
    formEl.innerHTML = `<h3>Enter card details</h3>
                        <input type="text" placeholder="Enter your name" required>
                        <input type="number" placeholder="Enter card number" required>
                        <input type="number" placeholder="Enter CVV" required>
                        <button class="order-button" data-button="pay">Pay</button>`
    modalEl.style.display = 'flex'
}

function orderDone() {
    const modalEl = document.getElementById('modal')
    const nameInput = document.querySelector('input[type="text"]')
    modalEl.style.display = 'none'
    menuArray.forEach( item => item.quantity = 0)
    const orderContainer = document.getElementById('order-section')
    orderContainer.innerHTML = `<div id="thankYouSection">Thanks, ${nameInput.value}! For this order</div>`
}