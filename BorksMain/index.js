const robot = require("robotjs")

var compassXmin = 1680
var compassXmax = 1700
var compassYmin = 550
var compassYmax = 580
var compassRange

var overload = [1853, 992]
var food = [1815, 989]

var borks = [1375, 583]
var borks2 = [1396, 687]

function drinkOverload() {
  robot.moveMouse(overload[0], overload[1])
  sleep(randSleep(500))
  robot.mouseClick()
  sleep(randSleep(200))
}
function eat() {
  robot.moveMouse(food[0], food[1])
  sleep(randSleep(500))
  robot.mouseClick()
}
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
function randSleep(averageMS) {
  return generateRandom(averageMS - 100, averageMS + 100)
}
const getRandCompassLocation = () => {
  let randomX = generateRandom(compassXmin, compassXmax)
  let randomY = generateRandom(compassYmin, compassYmax)
  return [randomX, randomY]
}
const getRandInstanceTicketLocation = () => {
  let randomX = generateRandom(instanceTicketXmin, instanceTicketXmax)
  let randomY = generateRandom(instanceTicketYmin, instanceTicketYmax)
  return [randomX, randomY]
}

const getRandMonsterBox = () => {
  let randomX = generateRandom(monsterXmin, monsterXmax)
  let randomY = generateRandom(monsterYmin, monsterYmax)
  return [randomX, randomY]
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function clickCompass() {
  compassRange = getRandCompassLocation()
  robot.moveMouse(compassRange[0], compassRange[1])
  sleep(randSleep(200))
  robot.mouseClick()
}

var instanceTicket = [1853, 770]
function newInstance() {
  robot.moveMouse(instanceTicket[0], instanceTicket[1])
  sleep(400)
  robot.mouseClick("right")
  sleep(500)
  robot.moveMouse(instanceTicket[0], instanceTicket[1] + 40)
  sleep(500)
  robot.mouseClick()
}

function attackBorks() {
  newInstance()
  clickCompass()
  sleep(1000)
  robot.moveMouse(borks[0], borks[1])
  sleep(randSleep(800))
  robot.mouseClick()
  sleep(15000)
}
function attackBorks2() {
  for (let i = 0; i < 6; i++) {
    clickCompass()
    robot.moveMouse(borks2[0], borks2[1])
    sleep(randSleep(500))
    robot.mouseClick()
    sleep(17000)
  }
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)

  while (true) {
    drinkOverload()
    sleep(500)
    eat()
    attackBorks()
    attackBorks2()
  }
}

main()
