
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
}

//                     TESTE
// const a = new Barreira(false)
// a.setAltura(300)
// document.querySelector('[wm-flappy]').appendChild(a.elemento)

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
}

//                     TESTE
// const b = new ParDeBarreira(480, 200, 500)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

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
}
//                     TESTE
// const b = new Barreiras(470, 1200, 200, 400)
// const areaDoJogo = document.querySelector('[wm-flappy]') 
// b.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(()=>{
//     b.animar()
// }, 20)

function Passaro(alturaJogo){
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = './imgs/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = (y) => this.elemento.style.bottom = `${y}px`

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
        this.elemento.innerHTML    = ponto
    }
    
    this.atualizarPontos(0)
}

//                     TESTE
// const areaDoJogo = document.querySelector('[wm-flappy]')
// const alturaJogo = areaDoJogo.clientHeight
// const larguraJogo = areaDoJogo.clientWidth

// const b = new Barreiras(alturaJogo, larguraJogo, 200, 400)
// const p = new Passaro(alturaJogo)
// areaDoJogo.appendChild(p.elemento)
// areaDoJogo.appendChild(new Progresso().elemento)

// b.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(()=>{
//     b.animar()
//     p.animar()
// }, 20)

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
                clearInterval(temporizador)
            }
        }, 20)
    }
}

new FlappyBird().start()
// FlappyBird()

//adicionar os elementos de fundo(chão, fundo e sol) dinamicamento no documento
// fazer uma tela de iniciação

//implementar fases(cor dos elemetos(barreiras, sol e background) e velocidade e abertura) 
// baseado na pontuação
