const robot = require('robotjs')

var compassXmin = 1680
var compassXmax = 1700
var compassYmin = 550
var compassYmax = 580
var compassRange

var overload = [1853, 992]
var food = [1815, 989]
var prayer = [1871, 612]

function click() {
  return robot.mouseClick()
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
  sleep(randSleep(200))
  console.log(`Clicking compass...`)
  click()
}

function drinkOverload() {
  robot.moveMouseSmooth(overload[0], overload[1])
  sleep(randSleep(500))
  click()
  sleep(randSleep(200))
}

function eat() {
  robot.moveMouseSmooth(food[0], food[1])
  sleep(randSleep(500))
  click()
}

function activatePrayer() {
  robot.moveMouseSmooth(prayer[0], prayer[1])
  sleep(randSleep(500))
  click()
}
function rotateCamera() {
  robot.moveMouseSmooth(firstTile[0], firstTile[1])
  sleep(100)
  click()
  sleep(400)
  robot.moveMouseSmooth(tileEntrance[0], tileEntrance[1])
  sleep(100)
  click()
  sleep(200)
  robot.keyToggle('right', 'down')
  sleep(800)
  robot.keyToggle('right', 'up')
  robot.moveMouseSmooth(gateEntrance[0], gateEntrance[1])
  sleep(4000)
  click()
}
function enterPortal() {
  drinkOverload()
  clickCompass()
  sleep(300)
  robot.moveMouse(portal[0], portal[1])
  sleep(500)
  click()
  sleep(1800)
  robot.moveMouse(easy[0], easy[1])
  sleep(1000)
  click()
}
function roomSequenceOne() {
  enterPortal()
  sleep(400)
  activatePrayer()
  sleep(200)
  rotateCamera()
  clickCompass()
}
function roomSequenceTwo() {
  robot.moveMouseSmooth(room1t1[0], room1t1[1])
  sleep(1200)
  click()
  sleep(3600)
  robot.moveMouseSmooth(bossClick1[0], bossClick1[1])
  click()
  sleep(9000)
  robot.moveMouseSmooth(room1t2[0], room1t2[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t3[0], room1t3[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t4[0], room1t4[1])
  click()
  sleep(300)
  eat()
  sleep(400)
  eat()
  sleep(400)
  robot.moveMouse(bossClick2[0], bossClick2[1])
  sleep(600)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t2[0], room1t2[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t3[0], room1t3[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t4[0], room1t4[1])
  click()
  sleep(300)
  eat()
  sleep(400)
  eat()
  sleep(400)
  robot.moveMouse(bossClick2[0], bossClick2[1])
  sleep(600)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t2[0], room1t2[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t3[0], room1t3[1])
  sleep(400)
  click()
  sleep(3000)
  robot.moveMouseSmooth(room1t4[0], room1t4[1])
  click()
  sleep(300)
  eat()
  sleep(400)
  eat()
  sleep(400)
  robot.moveMouse(bossClick2[0], bossClick2[1])
  sleep(600)
  click()
  sleep(3000)
}
var firstTile = [1407, 718]
var portal = [1400, 565]
var easy = [1381, 934]
var tileEntrance = [1715, 625]
var gateEntrance = [1410, 697]
var room1t1 = [1276, 734]
var bossClick1 = [1269, 694]
var room1t2 = [1363, 720]
var room1t3 = [1405, 662]
var room1t4 = [1449, 772]
var bossClick2 = [1264, 695]

function roomOne() {
  roomSequenceOne()
  roomSequenceTwo()
  sleep(4000)
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  roomOne()
}

main()
