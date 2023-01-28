const robot = require("robotjs")

var compass = [1713, 565]
var arcadeMachine = [1412, 642]
var middle = [1800, 581]
var move = [1407, 816]
var close = [1540, 641]

function runArcade() {
  clickCompass()
  robot.moveMouse(arcadeMachine[0], arcadeMachine[1])
  sleep(300)
  robot.mouseClick("right")
  sleep(500)
  robot.moveMouse(arcadeMachine[0], arcadeMachine[1] + 40)
  sleep(300)
  click()
  sleep(2000)
  robot.moveMouse(middle[0], middle[1])
  sleep(300)
  click()
  sleep(45000)
  robot.moveMouse(move[0], move[1])
  click()
  sleep(130000)
  robot.moveMouse(close[0], close[1])
  sleep(400)
  click()
  sleep(400)
}

function click() {
  return robot.mouseClick()
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function clickCompass() {
  robot.moveMouseSmooth(compass[0], compass[1])
  sleep(400)
  click()
  sleep(500)
}
function getRand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  while (true) {
    runArcade()
  }
}
main()
