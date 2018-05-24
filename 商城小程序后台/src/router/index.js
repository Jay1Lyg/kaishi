import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/UserLogin'
import Tab from '@/components/main/Tab'

//商品管理 我的订单 我的评价 意见反馈
import Manage from '@/components/main/Manage/Manage'
import Order from '@/components/main/Order/Order'
import BuyerView from '@/components/main/BuyerView/BuyerView'
import Feedback from '@/components/main/Feedback/Feedback'

//发布商品 首页商品 分类管理 我的商品
import Release from '@/components/main/Manage/Release/Release'
import Home from '@/components/main/Manage/Home/Home'
import Classify from '@/components/main/Manage/Classify/Classify'
import MyGoods from '@/components/main/Manage/MyGoods/MyGoods'



//等待付款 等待发货 物流信息 售后订单 成功订单
import WaitPay from '@/components/main/Order/WaitPay/WaitPay'
import WaitDeliver from '@/components/main/Order/WaitDeliver/WaitDeliver'
import SendMsg from '@/components/main/Order/SendMsg/SendMsg'
import AfterSale from '@/components/main/Order/AfterSale/AfterSale'
import SuccessSale from '@/components/main/Order/SuccessSale/SuccessSale'

//待评价 好评 中评 差评
import WaitView from '@/components/main/BuyerView/WaitView/WaitView'
import GoodView from '@/components/main/BuyerView/GoodView/GoodView'
import MidView from '@/components/main/BuyerView/MidView/MidView'
import BadView from '@/components/main/BuyerView/BadView/BadView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:"Tab",
      component:Tab,
      children: [
        {
          path: '/',
          name: 'Manage',
          component: Manage,
          children:[
            {
              path: '/Release',
              name: 'Release',
              component: Release 
            }, 
            {
              path: '/Home',
              name: 'Home',
              component: Home,
            },
            {
              path: '/Classify',
              name: 'Classify',
              component: Classify
            },
            {
              path: '/MyGoods',
              name: 'MyGoods',
              component: MyGoods
            }
          ]
        },
        {
          path: '/Order',
          name: 'Order',
          component: Order,
          children:[
            {
              path: '/WaitPay',
              name: 'WaitPay',
              component: WaitPay 
            }, 
            {
              path: '/WaitDeliver',
              name: 'WaitDeliver',
              component: WaitDeliver
            },
            {
              path: '/SendMsg',
              name: 'SendMsg',
              component: SendMsg
            },
            {
              path: '/AfterSale',
              name: 'AfterSale',
              component: AfterSale
            },
            {
              path: '/SuccessSale',
              name: 'SuccessSale',
              component: SuccessSale
            }
          ]
        },
        {
          path: '/BuyerView',
          name: 'BuyerView',
          component: BuyerView,
          children:[
            { 
              path: '/WaitView',
              name: 'WaitView',
              component: WaitView
            },
            {
              path: '/GoodView',
              name: 'GoodView',
              component: GoodView 
            }, 
            {
              path: '/MidView',
              name: 'MidView',
              component: MidView
            },
            {
              path: '/BadView',
              name: 'BadView',
              component: BadView
            }
          ]
        },
        {
          path: '/Feedback',
          name: 'Feedback',
          component: Feedback
        },
        
       
       
      ]
    },
    {
      path:'/login',
      name:"UserLogin",
      component:UserLogin
    }
  ]
})
