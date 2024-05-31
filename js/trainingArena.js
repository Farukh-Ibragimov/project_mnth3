const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const innerGmail = document.querySelector('.inner_gmail_block')
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')

const regExp = /^[\w\d\а-я\А-Я]{6,30}@gmail\.com$/
gmailButton.onclick = () => createGmail()


const createGmail= async (event)=> {
    if (regExp.test(gmailInput.value)) {
        innerGmail.style.backgroundImage = "url(../images/winer.webp)"
    } else {

        innerGmail.style.backgroundImage = "url(../images/grenade.webp)"
    }
    gmailInput.value = ''
}
window.onkeydown = (event) => {
    if (event.code === 'Enter') {
        createGmail()
    }
}

let positionX = 0
let positionY = 0

const maxParentWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxParentHeight = parentBlock.offsetHeight - childBlock.offsetHeight

const animation = () => {
    if (positionX < maxParentWidth && positionY === 0) {
        positionX++
    } else if (positionX >= maxParentWidth && positionY < maxParentHeight) {
        positionY++
    } else if (positionX > 0 && positionY >= maxParentHeight) {
        positionX--
    } else if (positionX === 0 && positionY > 0) {
        positionY--
    }

    childBlock.style.left = `${positionX}px`
    childBlock.style.top = `${positionY}px`
    requestAnimationFrame(animation)
}

animation()
const clerarImg = ()=>{
    childBlock.innerHTML = `<img src="../images/target.webp">`
}
childBlock.onclick = ()=>{
    childBlock.innerHTML = `<img src="../images/bullet.webp">`
    setTimeout( clerarImg,1000)
}

const seconds = document.querySelector('#seconds')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')
let count = 0
let interval
start.addEventListener('click', ()=>{
    if(!interval){
        interval = setInterval(()=>{
            count++
            seconds.innerHTML = `${count}`
        },1000)
    }
})
const stopCounter= () => {
    clearInterval(interval)
    interval = null
}
stop.addEventListener('click',stopCounter)
reset.addEventListener('click', ()=> {
    stopCounter()
    count = 0
    seconds.innerHTML = `${count}`
})

