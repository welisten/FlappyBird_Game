const body = document.querySelector('body')

function lockPortraitOrientation() {
    function adjustScreen() {
        if( window.innerWidth < window.innerHeight){
            body.style.transform = 'rotate(90deg)'
            body.style.transform = 'translateY(1)'

        }else(
            body.style.transform  = 'rotate(0deg)'
        )
    }

    window.addEventListener('resize', adjustScreen())

    adjustScreen()
}

lockPortraitOrientation()

console.log(window.innerWidth)