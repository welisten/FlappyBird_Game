const playButton =  document.querySelector('#play')
const replayButton =  document.querySelector('#replay')
const modalPlay  =  document.querySelector('#modal-play')
const modalReplay  =  document.querySelector('#modal-replay')
const fadeEl     =  document.querySelector('#fade')
const scoreEl    = modalReplay.querySelector('h2')

// compartimentar
function novoElemento(tagName, className){
    const elemento = document.createElement(tagName);
    elemento.className = className

    return elemento
}


function Barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira') 

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')

    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)
    
    this.setAltura = altura => corpo.style.height = `${altura}px`
    
    this.killElement = function() {
            this.elemento.parentNode.removeChild(this.elemento)
            this.elemento = null
    }
}

function ParDeBarreira(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior

        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth
    
    this.sortearAbertura()
    this.setX(x)

    
    this.killElement = () => {
        if(this.elemento !== null){
            this.elemento.parentNode.removeChild(this.elemento)
            this.superior.killElement()
            this.inferior.killElement()
            this.elemento = null
        }
    }
    
}

function Barreiras(altura, largura, abertura, espaco, notificarPonto){
   
    this.pares = [
        new ParDeBarreira(altura, abertura, largura),
        new ParDeBarreira(altura, abertura, largura + espaco),
        new ParDeBarreira(altura, abertura, largura + espaco * 2),
        new ParDeBarreira(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3   

    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            //  quando o elemento sair da área do jogo
            if(par.getX() < -par.getLargura()) {
                par.sortearAbertura()
                par.setX(par.getX() + espaco * this.pares.length)
            }
                const meio = largura / 2
                const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio

                cruzouOMeio && notificarPonto()
        })
    }

    this.killElement = () => {
        this.pares.forEach(par => {
            if( par !== null){
                par.superior.killElement()
                par.inferior.killElement()
                par.elemento.parentNode.removeChild(par.elemento)
                par.elemento = null
                par = null
            }
        })
    }
}

function Passaro(alturaJogo){
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = './imgs/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (y) => this.elemento.style.bottom = `${y}px`

    this.killElement = () => {
            this.elemento.parentNode.removeChild(this.elemento)
            this.elemento = null
    }

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.elemento.clientHeight

        if(novoY < 20){
            this.setY(20     )
        }else if(novoY >= alturaMaxima){
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

function Progresso() {
    this.elemento = novoElemento('span', 'progresso')

    this.atualizarPontos = ponto => {
        this.elemento.innerHTML = ponto
        scoreEl.innerHTML = `Score: ${ponto}`
    }

    this.killElement = function () {
        if( this.elemento !== null){
            this.elemento.parentNode.removeChild(this.elemento)
            this.elemento = null
        }
        
    }
    
    this.atualizarPontos(0)
}


function estaoSobrepostos(elementoA, elementoB){
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}   

function colidiu(passaro, barreiras){
    let colidiu = false
    barreiras.pares.forEach(par => {
        if(!colidiu){
            const superior = par.superior.elemento
            const inferior = par.inferior.elemento

            colidiu = estaoSobrepostos(passaro.elemento, superior) || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu
}

function FlappyBird() {
    let pontos = 0

    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth
    
    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 250, 400, ()=>progresso.atualizarPontos(++pontos))
    const passaro = new Passaro(altura)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
    
    this.start = () => {
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()

            if(colidiu(passaro, barreiras)){
                //alterar
                clearInterval(temporizador)
                fadeEl.classList.toggle('hiden')
                modalReplay.classList.toggle('hiden')
            }
        }, 20)
    }

    this.killAllElements = () => {
        barreiras.killElement()
        passaro.killElement()
        progresso.killElement()
    }
}

function initialize() {
    currentGamePlay = new FlappyBird()
    currentGamePlay.start()
}

let currentGamePlay = new FlappyBird()

replayButton.addEventListener('click', (e) => {
    currentGamePlay.killAllElements()
    modalReplay.classList.toggle('hiden')
    fadeEl.classList.toggle('hiden')
    currentGamePlay = null
    initialize()

})

playButton.addEventListener('click', (el) => {
    modalPlay.classList.add('hiden')
    fadeEl.classList.toggle('hiden')
    currentGamePlay.start()
})

// FlappyBird()

//adicionar os elementos de fundo(chão, fundo e sol) dinamicamento no documento
// fazer uma tela de iniciação

//implementar fases(cor dos elemetos(barreiras, sol e background) e velocidade e abertura) 
// baseado na pontuação