const robot = require("robotjs")

var compass = [1652, 567]

var target1 = [1281, 676]
var target2 = [1327, 773]
var target3 = [1419, 772]
var target4 = [1431, 657]

function attack() {
  robot.moveMouse(target1[0], target1[1])
  sleep(600)
  click()
  sleep(1000)
  robot.moveMouse(target2[0], target2[1])
  sleep(600)
  click()
  sleep(1000)
  robot.moveMouse(target3[0], target3[1])
  sleep(600)
  click()
  sleep(1000)
  robot.moveMouse(target4[0], target4[1])
  sleep(600)
  click()
  sleep(16000)
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
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  let x = 0
  while (true) {
    attack()
  }
}
main()
