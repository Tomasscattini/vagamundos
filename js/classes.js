class Map {
    constructor(mapa) {
        this.x = countries[0].x
        this.y = countries[0].y
        this.width = 2398
        this.height = 1799
        this.img = new Image()
        this.img.src = mapa
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    scrollRight() {
        if (this.x <= $canvas.width - this.width) return
        this.x -= 10
        traveller.x -= 10
    }
    scrollLeft() {
        if (this.x >= 0) return
        this.x += 10
        traveller.x += 10
    }
    scrollUp() {
        if (this.y >= 0) return
        this.y += 10
        traveller.y += 10

    }
    scrollDown() {
        if (this.y <= -this.height + $canvas.height) return
        this.y -= 10
        traveller.y -= 10

    }
}


class Traveller {
    constructor(player) {
        this.x = 475
        this.y = 250
        this.width = 67
        this.height = 100
        this.img = new Image()
        this.img.src = player
        this.img.onload = () => {
            this.draw()
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    levelUp() {

        let destinationX
        let destinationY
        countries.forEach(c => {
            if (c.name === nextDestination) {
                destinationX = c.x
                destinationY = c.y
            }
        })
        if (destinationX === background.x && destinationY === background.y) {
            if (locationTraveller === 'Estados Unidos') {
                if (traveller.y > 420) {
                    hideArrowNext()
                    clearInterval(intervalLevel)
                    intervalLevel = null
                    locationTraveller = nextDestination
                }
                return traveller.y += 2
            }
            hideArrowNext()
            clearInterval(intervalLevel)
            intervalLevel = null
            locationTraveller = nextDestination
        }
        if (destinationX === background.x) {
            background.x += 0

        }
        if (destinationY === background.y) {
            background.y += 0
        }
        if (destinationX < background.x) {
            background.x -= 2
        }
        if (destinationY < background.y) {
            background.y -= 2
        }
        if (destinationX > background.x) {
            background.x += 2
        }
        if (destinationY > background.y) {
            background.y += 2
        }
    }
}

class Card {
    constructor(country) {
        this.country = country.name
        this.answer = country.capital
        this.level = country.level
    }
    show() {
        if (this.level === 1) {
            let random = Math.floor(Math.random() * 3)

            function random2() {
                if (random === 0) return 1
                return 0
            }

            function random3() {
                if (random === 2) return 1
                return 2
            }
            $country.innerHTML = this.country
            $answer[random].innerHTML = this.answer
            randomArray()
            $answer[random2()].innerHTML = wrongAnswers[0]
            $answer[random3()].innerHTML = wrongAnswers[1]
            $card.style.display = 'flex'
            $buttonsLevel1.style.display = 'flex'
            $buttonsLevel2.style.display = 'none'
            $answerLevel3.style.display = 'none'
            $answer[random].onclick = () => {
                countriesGuessed.unshift(this.country)
                next()
                hideClock()
            }
            $answer[random2()].onclick = looseLife
            $answer[random3()].onclick = looseLife
        } else if (this.level === 2) {
            let random = Math.floor(Math.random() * 6)

            function random2() {
                if (random === 1) return 0
                return 1
            }

            function random3() {
                if (random === 2) return 0
                return 2
            }

            function random4() {
                if (random === 3) return 0
                return 3
            }

            function random5() {
                if (random === 4) return 0
                return 4
            }

            function random6() {
                if (random === 5) return 0
                return 5
            }
            $country.innerHTML = this.country
            $answerLevel2[random].innerHTML = this.answer
            randomArray()
            $answerLevel2[random2()].innerHTML = wrongAnswers[0]
            $answerLevel2[random3()].innerHTML = wrongAnswers[1]
            $answerLevel2[random4()].innerHTML = wrongAnswers[2]
            $answerLevel2[random5()].innerHTML = wrongAnswers[3]
            $answerLevel2[random6()].innerHTML = wrongAnswers[4]
            $card.style.display = 'flex'
            $buttonsLevel1.style.display = 'none'
            $buttonsLevel2.style.display = 'flex'
            $answerLevel2[random].onclick = () => {
                countriesGuessed.unshift(this.country)
                next()
                hideClock()
            }
            $answerLevel2[random2()].onclick = looseLife
            $answerLevel2[random3()].onclick = looseLife
            $answerLevel2[random4()].onclick = looseLife
            $answerLevel2[random5()].onclick = looseLife
            $answerLevel2[random6()].onclick = looseLife
        } else if (this.level === 3 || this.level === 4) {
            $card.style.display = 'flex'
            $country.innerHTML = this.country
            $buttonsLevel1.style.display = 'none'
            $buttonsLevel2.style.display = 'none'
            $answerLevel3.style.display = 'flex'
            $inputLevel3.focus()
            $inputLevel3.placeholder = ''

            for (let i = 0; i < this.answer.length; i++) {
                $inputLevel3.placeholder += '_'
            }

            let correctAnswer = removeAccents(this.answer).toLowerCase()


            $buttonLevel3.onclick = (e) => {
                    e.prenventDefault()
                    let givenAnswer = removeAccents($inputLevel3.value).toLowerCase()
                    if (givenAnswer === correctAnswer && this.level === 4) {
                        countriesGuessed.unshift(this.country)
                        hideClock()
                        $inputLevel3.value = ''
                        win()
                    } else if (givenAnswer === correctAnswer) {
                        countriesGuessed.unshift(this.country)
                        next()
                        hideClock()
                        $inputLevel3.value = ''
                    } else {
                        looseLife()
                        $inputLevel3.value = ''
                    }
                }
              
        }
    }
    hide() {
        $card.style.display = 'none'
    }
}