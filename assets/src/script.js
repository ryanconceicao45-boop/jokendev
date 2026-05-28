const barra = document.querySelector('.load-barra')
const LoadTela = document.querySelector('.Load-tela')
const HomeTela = document.querySelector('.tela-home')
const textInfos = document.querySelector('.text-infos')

let dados = await fetch('./assets/src/config.json').then(r => r.json())

const devSom = (som) => {
    if (som === 'loadsom') {
        const somLoad = new Audio('./assets/sound/inicio.mp3')
        somLoad.play()
    }
}

const mainInfo = () => {
    LoadTela.style.display = `none`
    HomeTela.style.display = `flex`
    textInfos.innerHTML = dados.Main.TextInfo
    devSom('loadsom')
}

function loadScreen() {
    barra.style.animation = `loadbar ${dados.Main.timeScrenn}s linear`
    setTimeout(() => {
        LoadTela.style.opacity = `0`
        setTimeout(mainInfo, 3000)
    }, dados.Main.timeScrenn * 1000);
}
loadScreen()

const bntIniciar = document.querySelector('.btn-iniciar')

bntIniciar.addEventListener('click', function() {
    console.log('Click')
})
