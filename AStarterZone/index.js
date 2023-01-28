const robot = require("robotjs")

var compass = [1652, 567]
var target1 = [1266, 684]
var target2 = [1537, 675]
var target3 = [1471, 613]
var target4 = [1265, 685]

var test = [1232, 671]
var test2 = [1496, 667]

function attack2() {
  // clickCompass()
  robot.moveMouseSmooth(test[0], test[1])
  sleep(600)
  click()
  sleep(7500)
  robot.moveMouseSmooth(test2[0], test2[1])
  sleep(600)
  click()
  sleep(7500)
}

function attack() {
  clickCompass()
  robot.moveMouse(target1[0], target1[1])
  sleep(600)
  click()
  sleep(7000)
  robot.moveMouse(target2[0], target2[1])
  sleep(600)
  click()
  sleep(7000)
  robot.moveMouse(target3[0], target3[1])
  sleep(600)
  click()
  sleep(7000)
  robot.moveMouse(target4[0], target4[1])
  sleep(600)
  click()
  sleep(7000)
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
    // attack()
    attack2()
    if (x % 10 === 0) {
      test[0] -= 5
      test2[0] -= 5
    }
  }
}
main()
