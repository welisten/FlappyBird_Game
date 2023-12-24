
const flappyContainer = document.querySelector('[wm-flappy]')
const titleContainer = document.querySelector('.title')
const modalContainer = document.querySelector('#fade')

const screenWidth  = document.documentElement.clientWidth 
const screenHeight = document.documentElement.clientHeight


console.log(flappyContainer, titleContainer, modalContainer)
function adjustScreen(){
    if(window.innerHeight > window.innerWidth){
        flappyContainer.style.transform = `rotate(90deg)`
        // titleContainer.style.display = `none`
        // modalContainer.style.transform = `rotate(90deg)`

        flappyContainer.style.width  = `${screenHeight}px` 
        flappyContainer.style.height = `${screenWidth}px`
        modalContainer.style.width  = `${screenHeight}px` 
        modalContainer.style.height = `${screenWidth}px`

        console.log(screenHeight, screenWidth)
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