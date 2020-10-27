let intervalId
let intervalLevel
let timerMaquina
let frames = 0
let keys = []
let countriesGuessed = []
let locationTraveller = 'Canadá'
let nextDestination
let lives = 5
let level = 1
const background = new Map()
let card
let imgTraveller1 = '../images/traveller1.png'
const traveller = new Traveller(imgTraveller1)

$button.onclick = changeSection
$instructionsButton.onclick = showInstructions
$secondButton.onclick = changeSection2
$thirdButton.onclick = changeSection3

function changeSection() {
    $cover.style.display = `none`
    $rules.style.display = `flex`
    maquina("#maquina-de-escribir", texto, 50);
}

function showInstructions() {
    $instructionsButton.style.display = 'none'
    $secondButton.style.display = 'block'
    clearInterval(timerMaquina)
    maquina("#maquina-de-escribir", texto2, 50)
}

function changeSection2() {
    $rules.style.display = `none`
    $players.style.display = `flex`
}

function changeSection3() {
    $players.style.display = `none`
    $containerGame.style.display = 'flex'

}

function maquina(contenedor, texto, intervalo) {
    longitud = texto.length;
    cnt = document.querySelector(contenedor);
    cnt.innerHTML = ''
    var i = 0;
    timerMaquina = setInterval(function() {
        cnt.innerHTML = cnt.innerHTML.substr(0, cnt.innerHTML.length - 1) + texto.charAt(i) + "_";
        if (i >= longitud) {
            return clearInterval(timer);
            cnt.innerHTML = cnt.innerHTML.substr(0, longitud);
            return true;
        } else {
            i++;
        }
    }, intervalo);
};

function update() {
    frames += 1
    checkKeys()
    checkNextDestination()
    checkProgress()
    clearCanvas()
    background.draw()
    traveller.draw()
}

function clearCanvas() {
    ctx.fillStyle = '#6db3d7'
    ctx.fillRect(-$canvas.width, -$canvas.height * 2, $canvas.width * 3, $canvas.height * 5)
}

function start() {
    if (intervalId) return
    intervalId = setInterval(update, 1000 / 60)
}

function next() {
    if (intervalLevel) return
    intervalLevel = setInterval(nextCountry, 1000 / 60)
    card.hide()
    showArrowNext()
}

function nextCountry() {
    checkNextLevel()
}

function newCard(country) {
    card = new Card(country)
    card.show()
}

function looseLife() {
    if (lives === 1) gameOver()
    lives -= 1
    if (lives < 5 && lives >= 0) {
        $hearts[lives].style.display = 'none'
    }
}

function gameOver() {
    $gameOver.style.display = 'flex'
    clearInterval(intervalId)
}

function checkNextDestination() {
    countries.forEach((c, index) => {
        if (c.name === locationTraveller) {
            nextDestination = countries[index + 1].name
        }
    })
}

function showArrowNext() {
    $arrowNext.style.display = 'block'
}

function hideArrowNext() {
    $arrowNext.style.display = 'none'
    $nextQuestion.style.display = 'block'
}

function hideNextQuestion() {
    $nextQuestion.style.display = 'none'
}

function checkProgress() {
    if (countriesGuessed[0] === 'México' && level !== 2) {
        background.img.src = '../images/americacentral.png'
        background.x = -40
        background.y = -400
        traveller.x = 475
        traveller.y = 150
        level = 2
    }
}

newCard(countries[0])

window.onload = start