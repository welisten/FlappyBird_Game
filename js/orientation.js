
const flappyContainer = document.querySelector('[wm-flappy]')
const titleContainer = document.querySelector('.title')
const modalContainer = document.querySelector('#fade')
const conteudo = document.querySelector('.conteudo')
// const conteudo = document.querySelector('.conteudo')

const screenWidth  = document.documentElement.clientWidth 
const screenHeight = document.documentElement.clientHeight


console.log(flappyContainer, titleContainer, modalContainer)
function adjustScreen(){
    if(window.innerHeight > window.innerWidth){

        const styleTag = document.createElement('link')
        styleTag.setAttribute('href', './css/orientation.css')
        styleTag.setAttribute('rel', 'stylesheet') 
        document.head.appendChild(styleTag)

        flappyContainer.style.transform = `rotate(90deg)`
        flappyContainer.style.width  = `${screenHeight}px` 
        flappyContainer.style.height = `${screenWidth}px`
        modalContainer.style.width  = `${screenHeight}px` 
        modalContainer.style.height = `${screenWidth}px`

    }else{
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