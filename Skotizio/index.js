const robot = require("robotjs")

var compass = [1652, 567]

function attack() {}

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
function getRand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function findWolf() {
  var x = 1120,
    y = 552,
    width = 511,
    height = 328
  let img = robot.screen.capture(x, y, width, height)
  var wolfColors = [
    "7629a0",
    "72289d",
    "7733a9",
    "8320aa",
    "602d8a",
    "8535bb",
    "7f1fac",
    "7533a8",
    "7b1fa1",
    "502b74",
    "872cb8",
    "612484",
    "7f2cad",
    "7b28a8",
    "8f1fc1",
    "882eb8",
    "67258c",
    "862db5",
    "872eb8",
  ]
  for (var i = 0; i < 1000000; i++) {
    let randomX = getRand(0, width - 1)
    let randomY = getRand(0, height - 1)
    let sample = img.colorAt(randomX, randomY)

    if (wolfColors.includes(sample)) {
      var screenX = randomX + x
      var screenY = randomY + y
      console.log(`Found wolf at: ${(screenX, screenY)} color at: ${sample}`)
      return { x: screenX, y: screenY }
    }
  }
  //didnt find color in screenshot
  return false
}

const main = () => {
  console.log(`Starting script...`)
  sleep(3000)
  while (true) {
    var wolf = findWolf()
    if (wolf == false) {
      console.log("Couldnt find a wolf")
      break
    }
    robot.moveMouse(wolf.x, wolf.y)
    click()
    sleep(3000)
  }
}
main()
