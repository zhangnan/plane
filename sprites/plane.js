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
    this.index = index
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

  draw(ctx = this.ctx) {
    this.planeList.forEach((plane, index) => {
      plane.button.draw(ctx)
    })
    this.cleanBtn.draw(ctx)
  }
}
