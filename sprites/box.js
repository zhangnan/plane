import Sprite from '../interfaces/sprite'
const iconPath = 'images'

const scallingRadio = 1.98 / screenWidth * 375
let boxConfig = {
  width: 50 / scallingRadio,
  height: 50 / scallingRadio,
  startX: 40,
  startY: 40
}

const BoxItem = class {
  constructor(config = {}) {
    [this.boxX, this.boxY] = [config.boxX, config.boxY]
    this.box = config.box
  }
  switchBox(isSelected) {
    if (typeof isSelected === 'boolean') {
      this.isSelected = isSelected
    } else {
      this.isSelected = !this.isSelected
    }
    this.box = new Sprite({
      imgSrc: this.isSelected ? `${iconPath}/box-dark.png` : `${iconPath}/box.png`,
      width: boxConfig.width,
      height: boxConfig.height,
      x: this.box.x,
      y: this.box.y
    })
  }
}

let boxArr = [[...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)]].map((el_, index_) => {
  return el_.map((el, index) => {
    return new BoxItem({
      boxX: index_,
      boxY: index,
      isSelected: false,
      box: new Sprite({
        imgSrc: `${iconPath}/box.png`,
        width: boxConfig.width,
        height: boxConfig.height,
        x: (boxConfig.width * index_) + boxConfig.startX,
        y: (-screenHeight + boxConfig.startY) + index * boxConfig.height
      })
    })
  })
});
let selectBoxArr = [[...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)]].map((el_, index_) => {
  return el_.map((el, index) => {
    return new BoxItem({
      boxX: index_,
      boxY: index,
      isSelected: false,
      die: false,
      box: new Sprite({
        imgSrc: `${iconPath}/box.png`,
        width: boxConfig.width,
        height: boxConfig.height,
        x: (boxConfig.width * index) + boxConfig.startX,
        y: (-screenHeight + 400) + index_ * boxConfig.height
      })
    })
  })
})

const boxList = new Proxy(boxArr, {
  get (target, key) {
    if (typeof key === 'string') {
      let index_ = key.split('.')[0],
          index = key.split('.')[1];
      if (!target[index_] || !target[index_][index]) {
        return
      }
      return target[index_][index]
    }
    return target[key]
  }
})

export default class Box {
  constructor(ctx) {
    this.ctx = ctx
    this.boxList = boxList
    this.boxArr = boxArr
    this.selectBoxArr = selectBoxArr
    this.plane = (centerBox) => {
      return [
        {
          boxX: centerBox.boxX,
          boxY: centerBox.boxY - 1,
          die: true
        }, {
          boxX: centerBox.boxX - 2,
          boxY: centerBox.boxY,
          die: false
        }, {
          boxX: centerBox.boxX - 1,
          boxY: centerBox.boxY,
          die: false
        }, {
          boxX: centerBox.boxX,
          boxY: centerBox.boxY,
          die: false
        }, {
          boxX: centerBox.boxX + 1,
          boxY: centerBox.boxY,
          die: false
        }, {
          boxX: centerBox.boxX + 2,
          boxY: centerBox.boxY,
          die: false
        }, {
          boxX: centerBox.boxX,
          boxY: centerBox.boxY + 1,
          die: false
        },
        {
          boxX: centerBox.boxX - 1,
          boxY: centerBox.boxY + 2,
          die: false
        }, {
          boxX: centerBox.boxX,
          boxY: centerBox.boxY + 2,
          die: false
        }, {
          boxX: centerBox.boxX + 1,
          boxY: centerBox.boxY + 2,
          die: false
        }
      ]
    }
  }
  drawBox(ctx = this.ctx) {
    boxArr.forEach((el_, index_) => {
      el_.forEach((el, index) => {
        el.box.draw(ctx)
      })
    })
    selectBoxArr.forEach((el_, index_) => {
      el_.forEach((el, index) => {
        el.box.draw(ctx)
      })
    })
  }
  drawPlane(boxX, boxY) {
    let centerBox = Object.assign({}, {boxX, boxY})
    this.plane(centerBox).forEach((box, index) => {
      if (this.boxArr[box.boxX] && this.boxArr[box.boxX][box.boxY]) {
        this.boxArr[box.boxX][box.boxY].die = box.die
        this.boxArr[box.boxX][box.boxY].plane = dataBus.isPlaneMove
        this.boxArr[box.boxX][box.boxY].switchBox(true)
      } else {
        box.inexist = true
      }
    })
  }
  cleanBoxList() {
    boxArr.forEach((el_, index_) => {
      el_.forEach((el, index) => {
        el.box.switchBox(false)
      })
    })
  }
}