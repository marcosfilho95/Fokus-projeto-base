const html = document.querySelector('html');
const foco_botao = document.querySelector('.app__card-button--foco')
const descanso_curto_botao = document.querySelector('.app__card-button--curto')
const descanso_longo_botao = document.querySelector('.app__card-button--longo')
const banner_igm = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const botao_active = document.querySelectorAll('.app__card-button')
const botao_musica = document.querySelector('#alternar-musica')
const botao_start_pause = document.querySelector('#start-pause')
const iniciar_pausar_botao = document.querySelector('#start-pause span')
const iniciar_pausar_botao_imagem = document.querySelector('.app__card-primary-butto-icon')
const temporizador_tela = document.getElementById('timer')
const musica = new Audio('sons/pure-soul.mp3')
const musica_time_play = new Audio('sons/play.wav')
const musica_time_pause = new Audio('sons/pause.mp3')
const musica_time_end = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica_time_pause.volume = 0.3
musica_time_play.volume = 0.3
musica_time_end.volume = 0.3

botao_musica.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
        musica.loop = true
        musica.volume = 0.5
    }
    else {
        musica.pause()
    }
})

foco_botao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    foco_botao.classList.add('active')
})

descanso_curto_botao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    descanso_curto_botao.classList.add('active')
})

descanso_longo_botao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    descanso_longo_botao.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner_igm.setAttribute('src', `imagens/${contexto}.png`)
    botao_active.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    switch (contexto) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
            case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
            case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

            break;
        default:
            break;
    }

}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        musica_time_end.play()
        alert('Tempo Finalizado')
        zerar()
        return 
    }
    tempoDecorridoEmSegundos -= 1 // diminui o tempo
    mostrarTempo() // atualiza a tela com o novo tempo
}

botao_start_pause.addEventListener('click', iniciar_pausar)

function iniciar_pausar() {

    if(intervaloId) {
        musica_time_pause.play()
        zerar()
        return
    }
    
    musica_time_play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciar_pausar_botao.textContent = "Pausar"
    iniciar_pausar_botao_imagem.setAttribute('src', 'imagens/pause.png')
}


function zerar () {
     // Verifica o contexto atual e reinicia o tempo de acordo
     if (html.getAttribute('data-contexto') === 'foco') {
        tempoDecorridoEmSegundos = 1500
    } else if (html.getAttribute('data-contexto') === 'descanso-curto') {
        tempoDecorridoEmSegundos = 300
    } else if (html.getAttribute('data-contexto') === 'descanso-longo') {
        tempoDecorridoEmSegundos = 900
    }
    clearInterval(intervaloId)
    iniciar_pausar_botao.textContent = "Começar"
    iniciar_pausar_botao_imagem.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    // const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' }); outro  método de horario
    const tempoFormatado = tempo.toISOString().substring(14,19)
    temporizador_tela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() // mostra o tempo inicial