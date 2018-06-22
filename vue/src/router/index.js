import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/main/UserLogin'
import Tab from '@/components/main/Tab'
/**
 * 商品管理 我的订单 我的评价 意见反馈 
 */
import Manage from '@/components/main/Manage/Manage'
import Order from '@/components/main/Order/Order'
import BuyerView from '@/components/main/BuyerView/BuyerView'
import Feedback from '@/components/main/Feedback/Feedback'
/**
 * 发布商品 首页商品 分类管理 我的商品 
 */
import Release from '@/components/main/Manage/Release/Release'
import Home from '@/components/main/Manage/Home/Home'
import Classify from '@/components/main/Manage/Classify/Classify'
import MyGoods from '@/components/main/Manage/MyGoods/MyGoods'
/**
 * 我的商品 商品展示表格 修改商品数据
 */
import myGoodsTable from '@/components/main/Manage/MyGoods/myGoodsTable/myGoodsTable'
import updateGoods from '@/components/main/Manage/MyGoods/updateGoods/updateGoods'
/**
 * 首页商品细则
 */
import homeMain from '@/components/main/Manage/Home/homeSet/homeMain'
import setCarousel from '@/components/main/Manage/Home/homeSet/setCarousel'
/**
 * 等待付款 等待发货 物流信息 售后订单 成功订单
 */
import WaitPay from '@/components/main/Order/WaitPay/WaitPay'
import OrderNum from '@/components/main/Order/WaitPay/OrderNum'
import OrderDetail from '@/components/main/Order/WaitPay/OrderDetail'
import Price from '@/components/main/Order/WaitPay/Price'
import LocationAlert from '@/components/main/Order/WaitPay/LocationAlert'
import DetailSmall from '@/components/main/Order/WaitPay/DetailSmall'
import GoodsTitle from '@/components/main/Order/WaitPay/GoodsTitle'
import WaitDeliver from '@/components/main/Order/WaitDeliver/WaitDeliver'
import SendMsg from '@/components/main/Order/SendMsg/SendMsg'
import AfterSale from '@/components/main/Order/AfterSale/AfterSale'
import SuccessSale from '@/components/main/Order/SuccessSale/SuccessSale'
/**
 * 待评价 好评 中评 差评
 */
import WaitView from '@/components/main/BuyerView/WaitView/WaitView'
import OrderSucc from '@/components/main/BuyerView/WaitView/OrderSucc'
import GoodView from '@/components/main/BuyerView/GoodView/GoodView'
import DetailL from '@/components/main/BuyerView/GoodView/DetailL'
import ViewAlert from '@/components/main/BuyerView/ViewAlert'
import DetailPrice from '@/components/main/BuyerView/GoodView/DetailPrice'
import DetailLeft from '@/components/main/BuyerView/GoodView/DetailLeft'
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
              path: '/',
              name: 'Home',
              component: Home,
              children: [
                {
                  path: '/Home',
                  name: 'homeMain',
                  component: homeMain,
                },
                {
                  path: '/setCarousel',
                  name: 'setCarousel',
                  component: setCarousel,
                }
              ]
            },
            {
              path: '/Classify',
              name: 'Classify',
              component: Classify
            },
            {
              path: '/MyGoods',
              name: 'MyGoods',
              component: MyGoods,
              children:[
                {
                  path: '/MyGoods',
                  name: 'myGoodsTable',
                  component:myGoodsTable
                },
                {
                path: '/updateGoods',
                name: 'updateGoods',
                component: updateGoods
              }]
            },
            
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
