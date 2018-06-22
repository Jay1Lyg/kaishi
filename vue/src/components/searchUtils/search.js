import service from '@/utils/require'
import { Message } from 'element-ui'
import  gloable  from '@/gloable'

function alertError(){
  Message({
    message: '请检查你得网络设置！',
    type: 'error',
    duration: 3 * 1000
  })
}


/*******************分类管理*********************/
  /** 
   * 查询所有总分类
   */ 
  function searchTotalClass (_that){ 
    let promise = new Promise ((resolve,reject)=>{
      var params = new URLSearchParams();
      params.append('user_id', sessionStorage.getItem('user_id'));
      service.post(gloable.api.searchCategory,params).then(function (res) {
        _that.totalClass = res.data;
        resolve(res.data)
      }, function (res) {
          alertError()
        reject(res)
      });
    });
    return promise;
  }
  /**
   * 查询该用户总分类
   */
  function SearchPersonTotalClass(_that){ 
    let promise = new Promise ((resolve,reject)=>{
      var params = new URLSearchParams();
      params.append('user_id', sessionStorage.getItem('user_id'));
      service.post(gloable.api.searchallTotalCategory,params).then(function (res) {
          _that.personTotalClass=res.data;
          resolve(res.data)
      }, function (res) {
          alertError()
          reject(res)
      });
    });
    return promise;
  }
  /**
   * 查询总分类下一级分类
   */
  function searchFirstCategory(_that,personaltotalclass_id){
    let promise = new Promise ((resolve,reject)=>{
      var formData = new FormData();
      formData.append('personaltotalclass_id', personaltotalclass_id);
      service.post(gloable.api.searchFirstCategory,formData).then(function (res) {
          _that.firstClass=res.data;
        resolve(res.data)
      }, function (res) {
          alertError()
          reject(res)
      });
    });
    return promise;
  }
  /**
   * 查询总分类一级分类下 二级分类
   */
  function searchSecondCategory(firstclass_id){
    let promise = new Promise ((resolve,reject)=>{
      var formData = new FormData();
      formData.append('firstclass_id', firstclass_id);
      service.post(gloable.api.searchSecondCategory,formData).then(function (res) {
        resolve(res.data)
      }, function (res) {
        alertError()
        reject(res)
      });
      });
    return promise;
  }
  /**
   * 查询总分类总分类下所有1，2级分类
   */
  function searchCategoryUderTotalById(totalclass_id){
    let promise = new Promise ((resolve,reject)=>{
    var params = new FormData();
    params.append('user_id', sessionStorage.getItem('user_id'));
    params.append('totalclass_id', totalclass_id);
    service.post(gloable.api.searchCategoryUderTotalById,params).then(function (res) {
      resolve(res.data)
    }, function (res) {
      alertError()
      reject(res)
    });

    });
    return promise;
  }

/*******************上传商品*********************/
  /**
   * 查询商品规格
   */
  function searchAllSpecifications(_id){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('production_id', _id);
      service.post(gloable.api.searchAllSpecifications,params).then(function (res) {
        resolve(res.data)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }
  /**
   * 查询所有产品参数
   */
  function searchAllgoodsparameters(_id){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('production_id', _id);
      service.post(gloable.api.searchAllgoodsparameters,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }
  /**
   * 商品图片
   */
  function searchproductionImage(_id){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('production_id', _id);
      service.post(gloable.api.searchproductionImage,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }
  /**
   * 商品描述
   */
  function searchdescribeImage(_id){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('production_id', _id);
      service.post(gloable.api.searchdescribeImage,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }
/*******************我的商品********************/
  /**
   * 查询上下架商品
   * 请求参数:  ifonshelves(上架---true 下架---false)  page
   */
  function searchAllShelfOrLowerGoods(ifonshelves,page){
    let promise = new Promise ((resolve,reject)=>{
      var params = new FormData();
      params.append('userid', sessionStorage.getItem('user_id'));
      params.append('ifonshelves', ifonshelves);
      params.append('page', page);
      service.post(gloable.api.searchAllShelfOrLowerGoods,params).then(function (res) {
        resolve(res)
      }, function (res) {
        alertError()
        reject(res)
      });
    });
    return promise;
  }


export { searchTotalClass , SearchPersonTotalClass , searchFirstCategory , searchSecondCategory ,searchCategoryUderTotalById , searchAllSpecifications , searchAllgoodsparameters , searchproductionImage , searchdescribeImage , searchAllShelfOrLowerGoods }