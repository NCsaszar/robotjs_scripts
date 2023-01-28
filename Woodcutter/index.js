const robot = require("robotjs")

var compassXmin = 1615
var compassXmax = 1640
var compassYmin = 190
var compassYmax = 216
var compassRange

var instanceTicketXmin = 1777
var instanceTicketXmax = 1800
var instanceTicketYmin = 400
var instanceTicketYmax = 420
var instanceTicketRange

var monsterXmin = 1306
var monsterXmax = 1370
var monsterYmin = 252
var monsterYmax = 315
var monsterBoxRange

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
  robot.moveMouseSmooth(compassRange[0], compassRange[1])
  sleep(randSleep(1000))
  console.log(`Clicking compass...`)
  robot.mouseClick()
}

function newInstance() {
  instanceTicketRange = getRandInstanceTicketLocation()
  let instanceRangeY = generateRandom(
    instanceTicketRange[1] + 39,
    instanceTicketRange[1] + 41
  )
  let instanceRangeX = generateRandom(
    instanceTicketRange[0] + 39,
    instanceTicketRange[0] - 165
  )

  robot.moveMouseSmooth(instanceTicketRange[0], instanceTicketRange[1])
  sleep(randSleep(600))
  robot.mouseClick("right")
  sleep(randSleep(800))
  robot.moveMouseSmooth(instanceRangeX, instanceRangeY)
  sleep(randSleep(800))
  robot.mouseClick()
}

function clickMonster() {
  monsterBoxRange = getRandMonsterBox()
  robot.moveMouseSmooth(monsterBoxRange[0], monsterBoxRange[1])
  sleep(randSleep(700))
  console.log(`Attacking monsters...`)
  robot.mouseClick()
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  // console.log(performance.now())

  while (true) {
    newInstance()
    sleep(randSleep(1000))
    clickCompass()
    sleep(randSleep(1000))
    clickMonster()
    sleep(randSleep(60000))
  }
}

main()
