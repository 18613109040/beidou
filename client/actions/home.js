export const TEST_GET = "TEST_GET";
import {request} from './api'

export function testGet() {  
  
    request({
      url: "imadvert/list",
      data: {
        name: "111",
        hash: "66"
      }
    }).then(res=>{
      
    })
  
}

export function testAjax(options,cb=()=>{}){
  request({
    url: "imcampagin/listProduct/61",
    data:options
  }).then(res=>{
    cb(res)
  })
}

export function testPost() {
  request({
    url: "login/userLogin",
    method: "POST",
    type: "from",
    data: {
      phone: "13800138001",
      password: "f704c51b68805b14b9eb223026d333ca"
    }
  })
}
export function testPload() {
  request({
    url: "coupon/selectMemberProductCoupons",
    method: "POST",
    type: "payload",
    data: [
      {
        amount: 1,
        productId: "99b9911c-26df-4fe8-a887-80de45d7305f",
        productType: 1
      }]
  })
}

export function testAction(json){
  return {
    type:"ADD",
    json:json
  }
}

