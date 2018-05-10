let funcs = {
  ctxAssociateRender() {
    this.background.drawBg()
    this.box.drawBox()
    this.plane.draw()
    this.arrow.draw()
  }
}

let eventFuncs = function(){
  // 点击阶段
  if (dataBus.touchStartPoint && !dataBus.touchMovePoint) {
    this.plane.planeList.forEach((plane, index) => {
      if (plane.button.isCollideWith(
        dataBus.touchStartPoint.pageX || 0,
        dataBus.touchStartPoint.pageY - screenHeight || 0
      )) {
        dataBus.isPlaneMove = index;
        this.plane.planeList[index].move(dataBus.touchStartPoint)
        dataBus.touchEndPoint = null
      } else {
        return false
      }
    })
  }
  // 移动阶段
  if (dataBus.touchMovePoint) {
    if(typeof dataBus.isPlaneMove === 'number') {
      this.plane.planeList[dataBus.isPlaneMove].move(dataBus.touchMovePoint)
      this.box.boxArr.forEach((el_, index_) => {
        el_.forEach((el, index) => {
          if (el.box.isCollideWith(
            dataBus.touchMovePoint.pageX || 0,
            dataBus.touchMovePoint.pageY - screenHeight || 0
          )) {
            this.box.drawPlane(index_, index)
            dataBus.centerBox = {boxX : el.boxX, boxY: el.boxY}
          } else {
            return
          }
          
        })
      })
    }
  }
  // 点击结束
  if (dataBus.touchEndPoint) {
    dataBus.touchStartPoint = null
    dataBus.touchMovePoint = null
    if(!dataBus.isPlaneMove) {
      // 清除飞机按钮
      if (this.plane.cleanBtn.isCollideWith(
        dataBus.touchEndPoint.pageX || 0,
        dataBus.touchEndPoint.pageY - screenHeight || 0
      )) {
        this.box.boxArr.forEach((el_, index_) => {
          el_.forEach((el, index) => {
            this.box.boxArr[index_][index].switchBox(false)
          })
        })
        this.plane.clean()
      }
      // 点击飞机
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

    }
    dataBus.touchEndPoint = null
    dataBus.isPlaneMove = false
  }
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
