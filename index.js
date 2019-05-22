const game = () => {
    let name = document.querySelector('.name')
    const userNameFill = document.querySelector('.user-name')
    const playScore = document.querySelector('.player-score')
    const bossScore = document.querySelector('.boss-score')
    const userChoice = document.querySelector('.player-choice')
    const bossChoice = document.querySelector('.computer-choice')
    const winner = document.querySelector('.winner')
    let playerpoint = 0
    let bosspoint = 0
    const startGame = () => {
        const playButton = document.querySelector('.play-button')

        const introSection = document.querySelector('.intro')
        playButton.addEventListener('click', function () {
            introSection.style.display = 'none'
            userNameFill.style.display = 'flex'
        })
    }


    const userFillname = () => {
        const okButton = document.querySelector('.submit')
        const inputName = document.querySelector('#input')
        const playerSections = document.querySelectorAll('.display-none')
     
               
        okButton.addEventListener('click', function () {
            if (inputName.value) {
                   let audio = new Audio('./sound/startgame.mp3')
                   
                   winner.innerHTML = `Welcome ${inputName.value} !!`
                 audio.play()
                name.innerHTML = inputName.value
                userNameFill.style.display = 'none'
                
                playerSections.forEach(section => {
                    section.style.display = 'flex'
                })

            }

        })


    }

    const bossChoose = (options) => {
        const randomNumberChoice = Math.floor(Math.random() * 3)


        bossChoice.src = `image/${options[randomNumberChoice].textContent}.png`
        return options[randomNumberChoice].textContent.toLowerCase()

    }
    const whoWin = (player, boss) => {
        const userName = name.textContent
        const lose = 'You Lose'
        const win = 'You Win'
        switch (player) {
            case "rock":
                if (boss === 'paper') {
                    bosspoint++
                    return `${userName}, ${lose}!!`

                } else {
                    playerpoint++
                    return `${userName}, ${win}!!`
                }

                case "paper":
                    if (boss === 'rock') {
                        playerpoint++
                        return `${userName}, ${win}!!`
                    } else {
                        bosspoint++
                        return `${userName}, ${lose}!!`
                    }

                    case "scissor":
                        if (boss === 'rock') {
                            bosspoint++
                            return `${userName}, ${lose}!!`
                        } else {
                            playerpoint++
                            return `${userName}, ${win}!!`
                        }
                        default:
                            return ''

        }
    }
    const animationend = () => {
        const images = document.querySelectorAll('.choice img')

        images.forEach(img => {
            img.addEventListener('animationend', function () {
                this.style.animation = ''

            })
        })
    }
    const chooseOption = () => {

        const options = document.querySelectorAll('.options div')

        let winner = document.querySelector('.winner')
        options.forEach(option => {
            option.addEventListener('click', function () {
                resestImg()
                let audio = new Audio('./sound/shake.wav')
                audio.play()
                setTimeout(function () {
                    const player = option.textContent.toLowerCase()
                    userChoice.src = `image/${player}.png`
                    const boss = bossChoose(options)
                    winner.innerHTML = player === boss ? "It's tied!!" : whoWin(player, boss)
                    playScore.innerHTML = playerpoint
                    bossScore.innerHTML = bosspoint
                }, 1800)

                userChoice.style.animation = 'PlayerAni 2s ease'
                bossChoice.style.animation = 'BossAni 2s ease'
            })
        })
    }
    const restart = () => {

        const rsButton = document.querySelector('.rs-button')
        rsButton.addEventListener('click', function () {
            resestImg()
            playerpoint = 0
            bosspoint = 0
            playScore.innerHTML = 0
            bossScore.innerHTML = 0 
            winner.innerHTML = `Welcome ${name.innerHTML} !!`
        })
    }
    resestImg = () => {
        const url = 'image/rock.png'
        userChoice.src = url
        bossChoice.src = url
    }






    startGame()
    userFillname()
    chooseOption()
    restart()
    animationend()




}

game()