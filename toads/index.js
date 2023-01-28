const robot = require("robotjs")
const compass = [1695, 567]

function clickCompass() {
  robot.moveMouse(compass[0], compass[1])
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

function getRand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function findVasa() {
  var x = 1150,
    y = 552,
    width = 511,
    height = 328
  let img = robot.screen.capture(x, y, width, height)
  var wolfColors = [
    "a15f8e",
    "925681",
    "9d5c8a",
    "935782",
    "90557f",
    "8e547d",
    "a2608f",
    "875077",
    "985a86",
    "8e547d",
    "a05f8d",
  ]
  // var wolfColors = ["f3ae1e", "ca6f49"]
  for (var i = 0; i < 1000000; i++) {
    let randomX = getRand(0, width - 1)
    let randomY = getRand(0, height - 1)
    let sample = img.colorAt(randomX, randomY)

    if (wolfColors.includes(sample)) {
      var screenX = randomX + x
      var screenY = randomY + y
      console.log(`Found vasa at: ${(screenX, screenY)} color at: ${sample}`)
      return { x: screenX, y: screenY }
    }
  }
  //didnt find color in screenshot
  return false
}
function attack() {}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  while (true) {
    var wolf = findVasa()
    if (wolf == false) {
      console.log("Couldnt find a wolf")
      break
    }
    robot.moveMouse(wolf.x, wolf.y)
    sleep(300)
    click()
    // sleep(6000)
  }
}

main()
