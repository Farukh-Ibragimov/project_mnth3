const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#pubg_color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}


//Slider
const galleryContainer = document.querySelector('.gallery-container')
const galleryControlsContainer = document.querySelector('.gallery-controls')
const galleryControls = ['previous','next']
const galleryItems = document.querySelectorAll('.gallery-item')


class Carousel {

    constructor(container,items,controls){
        this.carouselContainer = container
        this.carouselArray = [...items]
        this.carouselControls = controls
    }

    updateGallery(){
        this.carouselArray.forEach(element =>{
            element.classList.remove('gallery-item-1')
            element.classList.remove('gallery-item-2')
            element.classList.remove('gallery-item-3')
            element.classList.remove('gallery-item-4')
            element.classList.remove('gallery-item-5')
        })
        this.carouselArray.slice(0,5).forEach((element , i) =>{
            element.classList.add(`gallery-item-${i+1}`)
        })
    }
    setCurrentState(direction){
        if(direction.className === 'gallery-controls-previous'){
        this.carouselArray.unshift(this.carouselArray.pop())
        }else {
            this.carouselArray.push(this.carouselArray.shift())
        }
        this.updateGallery()
    }
    setControls(){
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement("button")).className = `gallery-controls-${control}`
            document.querySelector(`.gallery-controls-${control}`).innerText = control
        })
    }
    useControls(){
        const triggers = [...galleryControlsContainer.childNodes]
        triggers.forEach(control =>{
            control.addEventListener('click', element =>{
                element.preventDefault()
                this.setCurrentState(control)
            })
        })
    }
}

const newCarousel = new Carousel(galleryContainer,galleryItems,galleryControls)

newCarousel.setControls()
newCarousel.useControls()