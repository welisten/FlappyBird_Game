
const flappyContainer = document.querySelector('[wm-flappy]')
const titleContainer = document.querySelector('.title')
const modalContainer = document.querySelector('#fade')
const conteudo = document.querySelector('.conteudo')

const screenOuterWidth  = window.outerWidth
const screenOuterHeight = window.outerHeight
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight


console.log(screenHeight, screenHeight, outerHeight, outerWidth)
function adjustScreen(){
    if(window.innerHeight > window.innerWidth){
        const styleTag = document.createElement('link')
        styleTag.setAttribute('href', './css/orientation.css')
        styleTag.setAttribute('rel', 'stylesheet')
        document.head.appendChild(styleTag)
        
        const modalPlay = document.querySelector('#modal-play')
        
        const newModal = document.createElement('div')
        newModal.classList.add('modal')
        newModal.id = 'modal-warning'

        const modalHeader = document.createElement('div')
        modalHeader.classList.add('modal-header')
        modalHeader.innerHTML = `
            <h1>
                <i class="fa-solid fa-triangle-exclamation"></i>
                ATENÇÃO
                <i class="fa-solid fa-triangle-exclamation"></i>
            </h1>
        `
        const modalBody = document.createElement('div')
        modalBody.classList.add('modal-body')
        modalBody.innerHTML = `
            <p>
                Utilise seu dispositivo na orientação horizontal para ter uma melhor experiência de jogo
            </p>
        `

        const modalWarningSpan = document.createElement('span')
        modalWarningSpan.classList.add('warning-span')
        modalWarningSpan.innerHTML = `<i class="fa-solid fa-mobile-screen-button"></i>`

        modalPlay.classList.toggle('hiden')
        newModal.appendChild(modalHeader)
        newModal.appendChild(modalBody)
        modalBody.appendChild(modalWarningSpan)
        modalContainer.appendChild(newModal)

        flappyContainer.style.transform = `rotate(90deg)`
        flappyContainer.style.width  = `${screenHeight}px` 
        flappyContainer.style.height = `${screenWidth}px`

        modalContainer.style.width  = `${screenHeight}px` 
        modalContainer.style.height = `${screenWidth}px`

    // } else if(window.innerWidth >= 768 && window.orientation != 0){
    //     const styleTag = document.createElement('link')
    //     styleTag.setAttribute('href', './css/orientation.css')
    //     styleTag.setAttribute('rel', 'stylesheet') 
    //     document.head.appendChild(styleTag)
    } else {
        flappyContainer.style.transform = `rotate(0deg)`
        // titleContainer.style.diplay = `contents`
        modalContainer.style.transform = `rotate(0deg)`
    }
}

window.addEventListener('orientationchange', (e) => {
    location.reload()
})

function lockPortraitOrientation(){
    adjustScreen()
    window.addEventListener('resize', adjustScreen)
}

lockPortraitOrientation()