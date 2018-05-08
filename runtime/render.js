let funcs = {
  ctxAssociateRender() {
    this.background.drawBg()
    this.box.drawBox()
    this.plane.draw()
  }
}

let eventFuncs = function(){
  if (!dataBus.touchEndPoint) { return}
  this.box.boxArr.forEach((el_, index_) => {
    el_.forEach((el, index) => {
      if(el.box.isCollideWith(
        dataBus.touchEndPoint.pageX || 0,
        dataBus.touchEndPoint.pageY - screenHeight || 0
      )) {
        this.box.boxArr[index_][index].switchBox()
      }
    })
  })
  this.box.selectBoxArr.forEach((el_, index_) => {
    el_.forEach((el, index) => {
      if (el.box.isCollideWith(
        dataBus.touchEndPoint.pageX || 0,
        dataBus.touchEndPoint.pageY - screenHeight || 0
      )) {
        this.box.selectBoxArr[index_][index].switchBox()
      }
    })
  })
  if (this.plane.cleanBtn.isCollideWith(
    dataBus.touchEndPoint.pageX || 0,
    dataBus.touchEndPoint.pageY - screenHeight || 0
  )) {
    this.box.boxArr.forEach((el_, index_) => {
      el_.forEach((el, index) => {
        this.box.boxArr[index_][index].switchBox(false)
      })
    })
  }
  dataBus.touchEndPoint = {}
}

/**
 * 渲染函数
 * ctx的层级永远在ctxAssociate之上
 */
export default function render() {
  funcs.ctxAssociateRender.call(this)
  eventFuncs.call(this)
  // this.ctx.drawImage(canvasAssociate, 0, -canvas.height)
}
