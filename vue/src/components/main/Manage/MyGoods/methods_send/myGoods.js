import service from '@/utils/require'
import { Message } from 'element-ui'
import  gloable  from '@/gloable'


function constSearch(api_url,canshu){
    let promise = new Promise ((resolve,reject)=>{
        var formData = new FormData();
        for(let m in canshu){
            formData.append(m,canshu[m]);
        }
        service.post(gloable.api[api_url],formData)
        .then(function (res) {
          resolve(res)
        }, function (res) {
            Message({
                message: '亲，请求失败了！请检查你的网络！',
                type: 'error',
                duration: 3 * 1000
            })
        });
      });
      return promise;
}
var func = constSearch()


//上架下架商品 
            // 请求参数:production_id
            //           ifonshelves(上架---true 下架---false)  
  function ShelfOrLowerGoods(production_id,ifonshelves){
    let promise = new Promise ((resolve,reject)=>{
      var formData = new FormData();
      formData.append('production_id',production_id);
      formData.append('ifonshelves', ifonshelves);
      service.post(gloable.api.ShelfOrLowerGoods,formData)
      .then(function (res) {
        resolve(res)          
      }, function (res) {
          Message({
              message: '上架失败！',
              type: 'error',
              duration: 3 * 1000
          })
      });
    });
    return promise;
  }

//根据价格排序
  // 请求参数:
  //           index(=1 升序，=2降序)
  function sortProductionByPrice(index,page,ifonshelves){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('userid', sessionStorage.getItem('user_id'));
      params.append('ifonshelves', ifonshelves);
      params.append('page', page);
      params.append('index', index);
      service.post(gloable.api.sortProductionByPrice,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }


  // 4.根据销量排序
  //   接口：/program/sortProductionBySales（post）
  //   请求参数：
  //             index(=1 升序，=2降序)
  //             userid
  //             page
  //             ifonshelves

  function sortProductionBySales(index,page,ifonshelves){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('userid', sessionStorage.getItem('user_id'));
      params.append('ifonshelves', ifonshelves);
      params.append('page', page);
      params.append('index', index);
      service.post(gloable.api.sortProductionBySales,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }

  
  // 5.根据分类排序
  //   接口：/program/sortProductionByCategory（post）
  //   请求参数：
  //             userid
  //             page
  //             ifonshelves
  //             personaltotalclass_id
  //             firstclass_id
  //             secondclass_id
  function sortProductionByCategory(data){
    let promise = new Promise ((resolve,reject)=>{
    let params = new FormData();
      params.append('userid', sessionStorage.getItem('user_id'));
      params.append('ifonshelves', data.ifonshelves);
      params.append('page', data.page);
      params.append('personaltotalclass_id', data.personaltotalclass_id);
      params.append('firstclass_id', data.firstclass_id);
      params.append('secondclass_id', data.secondclass_id);
      service.post(gloable.api.sortProductionByCategory,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }

  
  // 6.删除商品
  //   接口：/program/deleteProduction（post）
  //   请求参数：productionid（数组）
  function deleteProductio(productionid){
    let promise = new Promise ((resolve,reject)=>{
    let params = new FormData();
      params.append('productionid', productionid);
      service.post(gloable.api.deleteProductio,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }

  // 7.查询商品详情
  //   接口：/program/searchProductionDetails（post）
  //   请求参数：productionid
  function searchProductionDetails(productionid){
    let promise = new Promise ((resolve,reject)=>{
    let params = new FormData();
      params.append('productionid', productionid);
      service.post(gloable.api.searchProductionDetails,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }

  // 8.删除规格
  //   接口：/program/deleteSpecification（post）
  //   请求参数：specifications_id
  function deleteSpecification(specifications_id){
    let promise = new Promise ((resolve,reject)=>{
    let params = new FormData();
      params.append('specifications_id', specifications_id);
      service.post(gloable.api.deleteSpecification,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }

  // 9.删除商品参数
  //   接口：/program/deleteGoodsparameter（post）
  //   请求参数：goodsParameters_id
  function deleteGoodsparameter(goodsParameters_id){
    let promise = new Promise ((resolve,reject)=>{
    let params = new FormData();
      params.append('goodsParameters_id', goodsParameters_id);
      service.post(gloable.api.deleteGoodsparameter,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }


export { ShelfOrLowerGoods , sortProductionByPrice , sortProductionBySales , sortProductionByCategory , deleteProductio , searchProductionDetails , deleteSpecification , deleteGoodsparameter , }