import Sprite from '../interfaces/sprite'

const iconPath = 'images'

let bg = new Sprite({
  imgSrc: `${iconPath}/02.jpg`,
  x: 0,
  y: -screenHeight,
  height: screenHeight,
  width: screenWidth
})

export default class Clover {
  constructor(ctx) {
    this.ctx = ctx

    this.bg = bg
  }

  drawBg(ctx = this.ctx) {
    this.bg.draw(ctx)
  }
}
