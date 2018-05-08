import { API_PORT, OPENID_PATH } from '../configs/options'

export default function userData() {
  // 获取用户信息，头像之类的
 wx.login({
   success(result) {
    console.log(result)
    wx.getUserInfo({
      success(res) {
        console.log(res)
      }
    })
   }
 })
}
