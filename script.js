//Primary
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const $gameBoard = document.getElementById('game-board')

let interval
let intervalEnemyAppears
let frames = 0
let frequencyEnemyAppears = 500
let enemies = []
let enemyWords = []
let playerWord = ''
const lifesText = 'Lifes:'
let lifes = 3
const scorePlayer1 = 'Score:'
let player1Score = 0
//let randomWords = 0
//let randomFrames = 0

const mainTheme = new Audio('./audio/001. Swarm (Intro).mp3')
const machinegun = new Audio('./audio/marineFire.wav')
const hydraliskDeath = new Audio('./audio/hydraDeath.wav')
const youWin = new Audio('./audio/youWin.wav')
const youLose = new Audio('./audio/youLose.wav')

const easyNames = ['zerg', 'ling', 'hydra', 'lisk', 'guard', 'over', 'mind', 'ultra', 'roach']
//const mediumNames = ['zergli', 'hydrali', 'liguard', 'overmi', 'ultrali', 'roachhy', 'ultrahy']
//const hardNames = ['zergling', 'hydralisk', 'roachling', 'overmind', 'ultralisk', 'hybridover', 'overlord']

const images = {
  bg: './Images/bgGame.jpg',
  commandCenter: './Images/SC Command Center.png',
  marine: './Images/player.png',
  hydralisk: './Images/hydralisk.png',
  gOver: './Images/gameOver.jpg'
}

//Classes for creating the game objects.
class Background {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.background = new Image()
    this.background.src = images.bg
    this.background.onload = () => {
      this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.background, this.x, this.y, canvas.width, canvas.height)
  }
}

//class YouWin {}

const gameOverScreen = new Image()
gameOverScreen.src = images.gOver

class CommandCenter {
  constructor() {
    this.x = 10
    this.y = 580
    this.width = 230
    this.height = 230
    this.commandC = new Image()
    this.commandC.src = images.commandCenter
  }
  draw() {
    ctx.drawImage(this.commandC, this.x, this.y, this.width, this.height)
  }
}

class Marine {
  constructor() {
    this.x = 230
    this.y = 700
    this.width = 70
    this.height = 70
    this.marine = new Image()
    this.marine.src = images.marine
  }
  draw() {
    ctx.drawImage(this.marine, this.x, this.y, this.width, this.height)
  }
}

class Zerg {
  constructor() {
    this.x = canvas.width
    this.y = 640
    this.width = 140
    this.height = 140
    this.zerg = new Image()
    this.zerg.src = images.hydralisk
    this.word = easyNames[Math.floor(Math.random() * 9)]
  }
  draw() {
    this.x--
    ctx.drawImage(this.zerg, this.x, this.y, this.width, this.height)
  }
  drawWord() {
    this.x--
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(this.word, this.x, this.y, this.width)
  }
}

//Instances of my classes.
const background = new Background()
const command = new CommandCenter()
const marine = new Marine()
const zerg = new Zerg()

//Generate Zerg.
function generateZerg() {
  if(frames % frequencyEnemyAppears === 0) {
    enemies.push(new Zerg())
    console.log(enemies)
  }
}

//Function to draw Zerg.
function drawZerg() {
  enemies.forEach(zergling => zergling.draw())
  enemies.forEach(word => word.drawWord())
}

//Function to reduce framesEnemyAppears
function reduceFrequencyEnemyAppears() {
  if (frequencyEnemyAppears > 100) {
    frequencyEnemyAppears -= 100
  }
}

//Function to draw life text
function showLifeText() {
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(lifesText, 50, 100, 300)
}

//Function to draw life number
function lifeNumber() {
  lifes.toString()
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(lifes, 150, 100, 300)
}

//Function to draw score word.
function scoreWord() {
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(scorePlayer1, 50, 150, 300)
}

//Function to draw score number.
function scoreNumber() {
  player1Score.toString()
  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(player1Score, 150, 150, 300)
}

function reduceLife() {
  if (enemies[0].x < 20) {
    lifes--
    enemies.splice(0,1)
  }

  if(lifes == 0) {
    return gameOver()
  }

}

//Functions to update the game.
function update() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  background.draw()
  generateZerg()
  command.draw()
  drawZerg()
  marine.draw()
  showLifeText()
  lifeNumber()
  scoreWord()
  scoreNumber()
  reduceLife()
  console.log(frames)
  //zerg.drawWord()
  //zerg.generateWord()
  //zerg.drawWord()
  //generateWord()
  //drawWord()
  //console.log(reduceFrequencyEnemyAppears)
  //console.log(randomFrames)
}

//Function to start the game.
function startGame() {
  interval = setInterval(update, 1000 / 60)
  intervalEnemyAppears = setInterval(reduceFrequencyEnemyAppears, 35000)
}

//Function for game over.
function gameOver() {
  clearInterval(interval)
  clearInterval(intervalEnemyAppears)
  ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0, canvas.width,canvas.height)
  ctx.drawImage(gameOverScreen,430,250,300,300)
  youLose.play()
}

//width="1150" height="800"



//Functions to make the sound. The main theme I need to put it in a button.
document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 32:
      mainTheme.play() //I have to pass this to a start button event.
  }
  if (keyCode >= 65 && keyCode <= 90) {
    machinegun.play()
  }
})

document.addEventListener('keydown', ({ keyCode }) => {

  let key = String.fromCharCode(keyCode)
  if (keyCode >= 65 && keyCode <= 90) {
    playerWord += key
    console.log(playerWord)
    }

  if (keyCode === 13) {
    if (playerWord.toLowerCase() != enemies[0].word) {
      playerWord = ''
    } else if (playerWord.toLowerCase() === enemies[0].word) {
      enemies.splice(0,1)
      hydraliskDeath.play()
      player1Score++
      playerWord = ''
      }
    }
  }
)




  /*if (keyCode >= 65 && keyCode <= 90) {
    playerWord.push(key).join('')
    }

  if(playerWord[0] === zerg.word[0]) {
    zerg.splice(0, 1)
    }
  }
  */


//startGame() //I have to past this to a start button
