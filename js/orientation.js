
const flappyContainer = document.querySelector('[wm-flappy]')
const titleContainer = document.querySelector('.title')
const modalContainer = document.querySelector('#fade')
const conteudo = document.querySelector('.conteudo')

const screenWidth  = document.documentElement.clientWidth 
const screenHeight = document.documentElement.clientHeight


console.log(flappyContainer, titleContainer, modalContainer)
function adjustScreen(){
    if(window.innerHeight > window.innerWidth){
        const styleTag = document.createElement('link')
        const modalPlay = document.querySelector('#modal-play')

        styleTag.setAttribute('href', './css/orientation.css')
        styleTag.setAttribute('rel', 'stylesheet') 
        document.head.appendChild(styleTag)
        
        const modal = document.createElement('div')
        modal.classList.add('modal')
        modal.id = 'modal-warning'

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
        modal.appendChild(modalHeader)
        modal.appendChild(modalBody)
        modalBody.appendChild(modalWarningSpan)
        modalContainer.appendChild(modal)

        flappyContainer.style.transform = `rotate(90deg)`
        flappyContainer.style.width  = `${screenHeight - 40}px` 
        flappyContainer.style.height = `${screenWidth - 40}px`

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
function lockPortraitOrientation(){
    adjustScreen()
    window.addEventListener('resize', adjustScreen)
}

lockPortraitOrientation()