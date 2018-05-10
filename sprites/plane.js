import Sprite from '../interfaces/sprite'

const iconPath = 'images'
const scallingRadio = 1.98

let cleanBtn = new Sprite({
  imgSrc: `${iconPath}/clean.png`,
  x: screenWidth - 65,
  y: -screenHeight + 265,
  width: 79 / scallingRadio,
  height: 79 / scallingRadio
})

const Plane = class {
  constructor(index) {
    this.button = new Sprite({
      imgSrc: `${iconPath}/plane-button.png`,
      x: screenWidth - 65,
      y: (-screenHeight + 65 * index) + 55,
      width: 79 / scallingRadio,
      height: 79 / scallingRadio
    })
    this.x = this.button.x
    this.y = this.button.y
    this.index = index
  }
  move(movePoint) {
    this.button = new Sprite({
      imgSrc: `${iconPath}/plane-button.png`,
      x: movePoint.pageX - 20 || 0,
      y: movePoint.pageY - screenHeight - 20 || 0,
      width: 79 / scallingRadio,
      height: 79 / scallingRadio
    })
  }
}

export default class Clover {
  constructor(ctx) {
    this.ctx = ctx
    this.planeList = [...Array(3)].map((plane, index) => {
      return new Plane(index)
    })
    this.cleanBtn = cleanBtn
  }
  clean() {
    this.planeList.forEach((plane, index) => {
      plane.button = new Sprite({
        imgSrc: `${iconPath}/plane-button.png`,
        x: plane.x,
        y: plane.y,
        width: 79 / scallingRadio,
        height: 79 / scallingRadio
      })
    })
  }
  draw(ctx = this.ctx) {
    this.planeList.forEach((plane, index) => {
      plane.button.draw(ctx)
    })
    this.cleanBtn.draw(ctx)
  }
}
