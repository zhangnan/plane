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
      boxX: index,
      boxY: index_,
      isSelected: false,
      box: new Sprite({
        imgSrc: `${iconPath}/box.png`,
        width: boxConfig.width,
        height: boxConfig.height,
        x: (boxConfig.width * index) + boxConfig.startX,
        y: (-screenHeight + boxConfig.startY) + index_ * boxConfig.height
      })
    })
  })
});
let selectBoxArr = [[...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)], [...Array(10)]].map((el_, index_) => {
  return el_.map((el, index) => {
    return new BoxItem({
      boxX: index,
      boxY: index_,
      isSelected: false,
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
  cleanBoxList() {
    boxArr.forEach((el_, index_) => {
      el_.forEach((el, index) => {
        el.box.switchBox(false)
      })
    })
  }
}