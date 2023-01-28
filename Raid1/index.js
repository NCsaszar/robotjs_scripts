const robot = require("robotjs")
const Tesseract = require("node-tesseract-ocr")
const fs = require("fs")
const Jimp = require("jimp")
const screenshot = require("screenshot-desktop")

var compassXmin = 1680
var compassXmax = 1700
var compassYmin = 550
var compassYmax = 580
var compassRange

var overload = [1853, 992]
var food = [1815, 989]

var boat = [1308, 608]
var startButton = [1392, 941]
var prayer = [1871, 612]
var prayerTab = "f3"
var inventoryTab = "f1"
var meleePray = [1826, 884]
var rangePray = [1791, 884]
var weapon = [1726, 913]
var mapMiddle = [1775, 592]

async function startRaid() {
  robot.keyTap(inventoryTab)
  switchWeapon()
  eat()
  sleep(300)
  boost()
  eat()
  sleep(300)
  clickCompass()
  sleep(300)
  robot.moveMouse(boat[0], boat[1])
  sleep(600)
  click()
  robot.moveMouse(startButton[0], startButton[1])
  sleep(1000)
  click()
  sleep(800)
  activatePrayer()
  sleep(300)
  moveMiddle()
  sleep(52000)
  prayRange()
  sleep(20000)
  eat()
  switchWeapon()
  sleep(500)
  prayMelee()
  sleep(400)
  moveMiddle()
  sleep(20000)
}
function switchWeapon() {
  robot.moveMouse(weapon[0], weapon[1])
  sleep(400)
  click()
}

function prayRange() {
  robot.keyTap(prayerTab)
  sleep(400)
  robot.moveMouse(rangePray[0], rangePray[1])
  sleep(300)
  click()
  sleep(400)
  robot.keyTap(inventoryTab)
}
function prayMelee() {
  robot.keyTap(prayerTab)
  sleep(400)
  robot.moveMouse(meleePray[0], meleePray[1])
  sleep(300)
  click()
  sleep(400)
  robot.keyTap(inventoryTab)
}

function moveMiddle() {
  robot.moveMouse(mapMiddle[0], mapMiddle[1])
  sleep(300)
  click()
  sleep(4000)
}
function activatePrayer() {
  robot.moveMouse(prayer[0], prayer[1])
  sleep(400)
  click()
  sleep(300)
}

function boost() {
  drinkOverload()
  sleep(400)
  eat()
  sleep(300)
}
function click() {
  return robot.mouseClick()
}

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

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function clickCompass() {
  compassRange = getRandCompassLocation()
  robot.moveMouse(compassRange[0], compassRange[1])
  sleep(randSleep(400))
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

function getImage() {
  const x1 = 1157
  const y1 = 887
  const width = 489
  const height = 117
  let path = "chat.png"
  let screen = robot.screen.capture(x1, y1, width, height)
  var jimg = new Jimp(width, height)
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var index = y * screen.byteWidth + x * screen.bytesPerPixel
      var r = screen.image[index]
      var g = screen.image[index + 1]
      var b = screen.image[index + 2]
      var num = r * 256 + g * 256 * 256 + b * 256 * 256 * 256 + 255
      jimg.setPixelColor(num, x, y)
    }
  }
  jimg.scan(0, 0, jimg.bitmap.width, jimg.bitmap.height, function (x, y, idx) {
    var red = this.bitmap.data[idx + 0]
    var green = this.bitmap.data[idx + 1]
    var blue = this.bitmap.data[idx + 2]

    if (red !== 255 || green !== 0 || blue !== 0) {
      // not red, make it white
      this.bitmap.data[idx + 0] = 255
      this.bitmap.data[idx + 1] = 255
      this.bitmap.data[idx + 2] = 255
    }
  })
  jimg.write(path)
}
let textFound
async function getOcrText() {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }
  let ocrText = await Tesseract.recognize("chat.png", config)
  console.log(ocrText)
  if (ocrText.includes("The fourth wave")) {
    return true
  } else {
    return false
  }
}
async function check() {
  getImage()
  let test = await getOcrText()
  if (test) {
    return true
  } else {
    return false
  }
}

const main = async () => {
  console.log(`Starting script...`)
  sleep(3000)

  while (true) {
    startRaid()
  }
}
main()
