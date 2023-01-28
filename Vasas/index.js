const robot = require("robotjs")

const compass = [1695, 567]

var vasa1 = [1302, 736]
var vasa2 = [1513, 741]
var vasa3 = [1501, 620]
var vasa4 = [1315, 620]

var overload = [1853, 992]
var food = [1815, 987]
var prayer = [1871, 612]

function click() {
  return robot.mouseClick()
}

function clickCompass() {
  robot.moveMouse(compass[0], compass[1])
  click()
  sleep(400)
}
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function clickCompass() {
  robot.moveMouse(compass[0], compass[1])
  sleep(400)
  click()
  console.log(`Clicking compass...`)
  sleep(400)
}

function attackVasas() {
  clickCompass()
  robot.moveMouse(vasa1[0], vasa1[1])
  sleep(300)
  click()
  sleep(6000)
  robot.moveMouse(vasa2[0], vasa2[1])
  sleep(300)
  click()
  sleep(6000)
  robot.moveMouse(vasa3[0], vasa3[1])
  sleep(300)
  click()
  sleep(6000)
  // robot.moveMouse(vasa4[0], vasa4[1])
  // sleep(300)
  // click()
  // sleep(8000)
}

function drinkOverload() {
  robot.moveMouse(overload[0], overload[1])
  sleep(500)
  robot.mouseClick()
  sleep(200)
}

function eat() {
  robot.moveMouse(food[0], food[1])
  sleep(500)
  robot.mouseClick()
}

function activatePrayer() {
  robot.moveMouse(prayer[0], prayer[1])
  sleep(500)
  robot.mouseClick()
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  let runs = 0
  while (true) {
    attackVasas()
    sleep(1000)
    activatePrayer()
    sleep(500)
    if (runs % 15 === 0) {
      drinkOverload()
      sleep(500)
      eat()
      sleep(500)
    }
    runs++
    console.log(`Kill Count: ${runs * 3}`)
  }
}

main()
