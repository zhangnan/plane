import Sprite from '../interfaces/sprite'

const iconPath = 'images'
const scallingRadio = 1.98

const Arrow = class {
  constructor(index, arrow) {
    this.button = new Sprite({
      imgSrc: `${iconPath}/arrow-${arrow}.png`,
      x: (screenWidth - 360) + index * 70,
      y: -screenHeight + 340,
      width: 79 / scallingRadio,
      height: 79 / scallingRadio
    })
    this.x = this.button.x
    this.y = this.button.y
    this.arrow = arrow
    this.index = index
  }
}

export default class Clover {
  constructor(ctx) {
    this.ctx = ctx
    this.arrowList = ['up', 'right', 'down', 'left'].map((arrow, index) => {
      return new Arrow(index, arrow)
    })
  }
  draw(ctx = this.ctx) {
    this.arrowList.forEach((arrow, index) => {
      arrow.button.draw(ctx)
    })
  }
}
