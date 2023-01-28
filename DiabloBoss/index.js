const robot = require("robotjs")

var compass = [1652, 567]

var target1 = [1516, 673]
var target2 = [1534, 773]
var target3 = [1463, 835]
var target4 = [1395, 756]
var target5 = [1258, 705]
var target6 = [1271, 637]
var target7 = [1216, 659]

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
  sleep(1000)
  robot.moveMouse(target5[0], target5[1])
  sleep(600)
  click()
  sleep(1000)
  robot.moveMouse(target6[0], target6[1])
  sleep(600)
  click()
  sleep(1000)
  robot.moveMouse(target7[0], target7[1])
  sleep(600)
  click()
  sleep(12000)
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
