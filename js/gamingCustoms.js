//PHONE CHECKER
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'yellow'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

//MAPS
const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()


let tabIndex = 0
const tabCount = tabContentItems.length

const scrollTabContent = () => {
    hideTabContent()
    if (tabIndex < tabCount - 1) {
        tabIndex++
    }
    showTabContent(tabIndex)
}

const interval = setInterval(scrollTabContent, 3000)
tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
    clearInterval(interval)
}

//Convertor

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const ucInput = document.querySelector('#uc')
const convertor = (element, targetElement, targetElement2) => {
    element.oninput = async () => {
        try {
            const response = await fetch("../data/converter.json")
            const data = await response.json()
            if (element.id === 'som') {
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.ucToSom).toFixed(2)
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = (element.value / data.uc).toFixed(2)
            }
            if (element.id === 'uc') {
                targetElement.value = (element.value * data.ucToSom).toFixed(2)
                targetElement2.value = (element.value * data.ucToDollar).toFixed(2)
            }
            (element.value === '') && (targetElement.value = '', targetElement2.value = '')
        } catch (error) {
            console.log(error)
        }
    }
}
convertor(somInput, usdInput, ucInput)
convertor(usdInput, somInput, ucInput)
convertor(ucInput, somInput, usdInput)

//Card switcher
const card = document.querySelector('.card')
const btnContainer = document.querySelector('.inner_card_switcher')

let cardId = 1
const firstCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        const data = await response.json()
        card.innerHTML = `
            <p>${data.title}</p>   
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>   
            <span>${data.id}</span>   
            `
    } catch (error) {
        console.error(error)
    }
}
firstCard(cardId)
btnContainer.onclick = (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        if (event.target.id === 'btn-next') {
            cardId < 200 ? cardId++ : cardId = 1
        } else if (event.target.id === 'btn-prev') {
            cardId > 1 ? cardId-- : cardId = 200
        }
        firstCard(cardId)
    }
}

const citySearchInput = document.querySelector('.cityName')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')


const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_ID = 'e417df62e04d3b1b111abeab19cea714'
const citySearch = () => {
    citySearchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_ID}`)
            const data = await response.json()
            cityName.innerHTML = data.name || 'City is not defined'
            cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '///'
        } catch (error) {
            console.log(error)
        }
    }
}

citySearch()
