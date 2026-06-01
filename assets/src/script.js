const barra = document.querySelector('.load-barra')
const LoadTela = document.querySelector('.Load-tela')
const textInfos = document.querySelector('.text-infos')

import { carregarDados } from './config.js'
const dados = await carregarDados()

const somLoad = new Audio('./assets/sound/inicio.mp3') //somLoad.play()

const mainInfo = () => {
    LoadTela.style.display = `none`
    HomeTela.style.display = `flex`
    textInfos.innerHTML = dados['Main'].TextInfo
}

function loadScreen() {
    barra.style.animation = `loadbar ${dados['Main'].timeScrenn}s linear`
    setTimeout(() => {
        LoadTela.style.opacity = `0`
        setTimeout(mainInfo, 3000)
    }, dados['Main'].timeScrenn * 1000);
}

loadScreen()
// -----// FUNCAO PARA INICAR A PARTIDA
const bntIniciar = document.querySelector('.btn-iniciar')
const HomeTela = document.querySelector('.tela-home')
const mainPartida = document.querySelector('.bg-main')

bntIniciar.addEventListener('click', function () {
    HomeTela.style.display = `none`
    mainPartida.style.display = `block`
})

// -----// START DA FUNÇÃO

const boxUser = document.querySelector('.box-funcions-user')
const boxMachine = document.querySelector('.box-funcions-mach')

let elmChooseUser = ''
let elmChooseMachine = ''
let allPonto = {
    user: 0,
    machine: 0
}

// -----// ESCOLHER O ELEMENTO PARA ENTRA NA CAIXA
function LoadbntElem() {
    document.querySelectorAll('.choose-elm').forEach(img => {
        img.addEventListener('click', () => {
            chooseElm(img.dataset.elm)
        })
    })
}
LoadbntElem()

const chooseMachine = (receive) => {
    const random = Math.floor(Math.random() * dados['Main'].cuntElement.length)
    return receive = dados['Main'].cuntElement[random]
}

const chooseElm = (elm) => { // Funcao para escolher o elemento
    if (elmChooseUser === '') {
        elmChooseUser = elm
        elmChooseMachine = chooseMachine()
        console.log(elmChooseUser, elmChooseMachine)
        boxUser.innerHTML = `
        <p>Aguarde a escolha do seu oponente.</p>
        `
        boxMachine.innerHTML = `
        <p>Oponente preparando jogada...</p>
        <div class="CircleLoad"></div>
        `
        setTimeout(thechooseMachine, dados['Main'].timeOponenteEscolher * 1000)
    }
}
// -----// MOMENTO DA MAQUINA ESCOLHER
const boxTime = document.querySelector('.center-partida-stat')
const thechooseMachine = () => {
    let numero = 3
    const contagem = setInterval(() => {
        boxUser.innerHTML = `
        <p>Aguarde a contagem...</p>
        <div class="CircleLoad"></div>
        `
        boxMachine.innerHTML = `
        <p>Aguarde a contagem...</p>
        <div class="CircleLoad"></div>    
        `
        boxTime.innerHTML = `<p>${numero--}</p>`
        if (numero < 0) {
            clearInterval(contagem)
            winnerfuc()
        }
    }, 1000)
}

// -----// FUNCAO QUE DEFINE O GANHADOR

const pontoUser = document.querySelector('.pontos-user')
const pontoMachine = document.querySelector('.pontos-machine')

const winnerfuc = () => {

    if (elmChooseUser === 'pedra' && elmChooseMachine === 'tesoura') {
        sumpoint('User', 'PEDRA ESMAGA TESOURA!')

    } else if (elmChooseUser === 'pedra' && elmChooseMachine === 'papel') {
        sumpoint('Machine', 'PAPEL ENGOLE PEDRA!')

    } else if (elmChooseUser === 'papel' && elmChooseMachine === 'pedra') {
        sumpoint('User', 'PAPEL DOMINA PEDRA!')

    } else if (elmChooseUser === 'papel' && elmChooseMachine === 'tesoura') {
        sumpoint('Machine', 'TESOURA CORTA PAPEL!')

    } else if (elmChooseUser === 'tesoura' && elmChooseMachine === 'papel') {
        sumpoint('User', 'TESOURA FATIÁ PAPEL!')

    } else if (elmChooseUser === 'tesoura' && elmChooseMachine === 'pedra') {
        sumpoint('Machine', 'PEDRA QUEBRA TESOURA!')

    } else {
        sumpoint('Nenhum', 'EMPATE É GUERRA!')
    }

}

const sumpoint = (who, caption) => {
    if (who === 'User') {
        allPonto.user++
        pontoUser.innerHTML = `${allPonto.user}`
        boxUser.innerHTML = `
        <p>VOCÊ <span style="color: #6dff8b;">GANHOUUUU!</span></p>
        <img class="choose-elm" src="./assets/img/${elmChooseUser}.png" alt="${elmChooseUser}">
        `
        boxMachine.innerHTML = `
        <p>OPONENTE <span style="color: #ff7b7b;">PERDEU!</span></p>
        <img class="choose-elm" src="./assets/img/${elmChooseMachine}.png" alt="${elmChooseMachine}">
        `
    } else if (who === 'Machine') {
        allPonto.machine++
        pontoMachine.innerHTML = `${allPonto.machine}`
        boxMachine.innerHTML = `
        <p>MAQUINA <span style="color: #6dff8b;">VENCEU!</span></p>
        <img class="choose-elm" src="./assets/img/${elmChooseMachine}.png" alt="${elmChooseMachine}">
        `
        boxUser.innerHTML = `
        <p>VOCÊ <span style="color: #ff7b7b;">PERDEU :(</span></p>
        <img class="choose-elm" src="./assets/img/${elmChooseUser}.png" alt="${elmChooseUser}">
        `
    } else {
        boxMachine.innerHTML = `<p>Nenhum ganhador!</p>`
        boxUser.innerHTML = `<p>Nenhum ganhador!</p>`
    }
    closeLoad(caption)
}

const closeLoad = (caption) => {
    boxTime.innerHTML = `
        <h6>${caption}</h6>
        <button class="bnt-load">REINICIAR</button>
    `
    const btnLoads = document.querySelector('.bnt-load')
    btnLoads.addEventListener('click', function () {
        restart()
    }, { once: true })
}

const restart = () => {
    boxUser.innerHTML = `
        <p>Qual será sua escolha?</p>
        <div class="box-escolhas-elm">
            <img class="choose-elm" data-elm="pedra" src="./assets/img/pedra.png" alt="pedra">
            |
            <img class="choose-elm" data-elm="papel" src="./assets/img/papel.png" alt="papel">
            |
            <img class="choose-elm" data-elm="tesoura" src="./assets/img/tesoura.png" alt="tesoura">
        </div>
    `
    boxMachine.innerHTML = `
        <p>Seu oponente aguarda sua decisão.</p>  
    `
    boxTime.innerHTML = `
        <img class="img-partida" src="./assets/img/logo.png" alt="logo-meio">
    `
    elmChooseUser = ''
    elmChooseMachine = ''
    LoadbntElem()
}

