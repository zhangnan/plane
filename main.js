import BackGround from 'sprites/background'
import Box from 'sprites/box'
import plane from 'sprites/plane'

import render from 'runtime/render';
import touchEvent from 'runtime/touch-event'
import userData from 'runtime/user-data'

canvas.width = canvas.width * pixelRatio
canvas.height = canvas.height * pixelRatio
canvasAssociate.height = canvasAssociate.height * pixelRatio
canvasAssociate.width = canvasAssociate.width * pixelRatio

// 创建ctx，更改坐标原点到左下角
let ctx = canvas.getContext('2d')
ctx.translate(0, canvas.height)

let ctxAssociate = canvasAssociate.getContext('2d')
ctxAssociate.translate(0, canvasAssociate.height)

export default class Main {
  constructor() {
    this.ctx = ctx
    this.ctxAssociate = ctxAssociate
    this.aniID = 0

    this.background = new BackGround(ctx)
    this.box = new Box(ctx)
    this.plane = new plane(ctx)

    this.render = render.bind(this)

    this.touchEvent = touchEvent.bind(this)
    this.userData = userData.bind(this)

    this.touchEvent()
    this.userData()
    this.loop()
    console.log(this)
  }
  loop() {
    this.render()
    this.aniID = window.requestAnimationFrame(this.loop.bind(this))
  }
}
