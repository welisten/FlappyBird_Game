const flappyContainer = document.querySelector('[wm-flappy]')
const titleContainer = document.querySelector('.title')
const modalContainer = document.querySelector('#fade')


console.log(flappyContainer, titleContainer, modalContainer)
function adjustScreen(){
    if(window.innerHeight > window.innerWidth){
        flappyContainer.style.transform = `rotate(90deg)`
        titleContainer.style.transform = `rotate(90deg)`
        modalContainer.style.transform = `rotate(90deg)`
    }else{
        flappyContainer.style.transform = `rotate(0deg)`
        titleContainer.style.transform = `rotate(0deg)`
        modalContainer.style.transform = `rotate(0deg)`
    }
}
function lockPortraitOrientation(){
    adjustScreen()
    window.addEventListener('resize', adjustScreen)
}

lockPortraitOrientation()