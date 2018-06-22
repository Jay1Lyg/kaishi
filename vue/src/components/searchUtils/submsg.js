import service from '@/utils/require'
import { Message } from 'element-ui'
import  gloable  from '@/gloable'

function alertError(){
  Message({
      message: '上传失败，请检查你的网络',
      type: 'error',
      duration: 3 * 1000
  })
}

//上传商品图片
function uploadproductionImage(production_id,production_images_upload){
  let promise = new Promise ((resolve,reject)=>{
      var formData = new FormData();
      formData.append('production_id', production_id);
      formData.append('production_images_upload', production_images_upload);
      service.post(gloable.api.uploadproductionImage,formData).then(function (res) {
          resolve(res.data)
      }, function (res) {
          alertError()
          reject(res)
      });
  });
  return promise;
}

//上传详情图片
function uploaddescribeImage(production_id,describe_images_upload){
    let promise = new Promise ((resolve,reject)=>{
        var formData = new FormData();
        formData.append('production_id', production_id);
        formData.append('describe_images_upload', describe_images_upload);
        service.post(gloable.api.uploaddescribeImage,formData).then(function (res) {
            resolve(res.data)
        }, function (res) {
            alertError()
            reject(res)
        });
    });
    return promise;
}

//删除商品图片
function deleteproductionImage(production_id,index){
    let promise = new Promise ((resolve,reject)=>{
        var formData = new FormData();
        formData.append('production_id', production_id);
        
        formData.append('index', index);
        service.post(gloable.api.deleteproductionImage,formData).then(function (res) {
            resolve(res.data)
        }, function (res) {
            alertError()
            reject(res)
        });
    });
    return promise;
}

//删除详情图片
function deletedescribeImage(production_id,index){
    let promise = new Promise ((resolve,reject)=>{
        var formData = new FormData();
        formData.append('production_id', production_id);
        
        formData.append('index', index);
        service.post(gloable.api.deletedescribeImage,formData).then(function (res) {
            resolve(res.data)
        }, function (res) {
            alertError()
            reject(res)
        });
    });
    return promise;
}

//确认上传
function confirmPublishProduction(production_id){
    let promise = new Promise ((resolve,reject)=>{
        var formData = new FormData();
        formData.append('production_id', production_id);
        service.post(gloable.api.confirmPublishProduction,formData).then(function (res) {
            resolve(res)
        }, function (res) {
            alertError()
            reject(res)
        });
    });
    return promise;
}

export { uploadproductionImage , uploaddescribeImage , deleteproductionImage , deletedescribeImage , confirmPublishProduction }