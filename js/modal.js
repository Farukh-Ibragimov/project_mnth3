//Modal
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal_close')
const modalTrigger = document.querySelector('#btn-get')

const openModal = ()=>{
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
modalTrigger.onclick = ()=>{
    openModal()
}

const closeModal =()=> {
    modal.style.display = 'none'
    document.body.style.overflow = 'scroll'
}
modalCloseBtn.onclick = ()=>{
    closeModal()
}
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}


setTimeout(()=>openModal(),10000)

// TELEGRAM BOT
const form = document.querySelector('form')
const token = '6978455756:AAENeBVOUjloVIf16MPxJWkPyluvfWPBGmk'
const chatID = '@farukh_lesson7'
const URL = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event)=> {
    event.preventDefault()
    const result = event.target
    const data = Object.fromEntries(new FormData(result).entries())
    const {name,enemy,complaint} = data
    const text = `Имя: ${name}\nВраг: ${enemy}\nЖалоба: ${complaint}`
    await fetch(URL,{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({chat_id: chatID,text})
    })
}