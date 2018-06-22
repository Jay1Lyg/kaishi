import service from '@/utils/require'
import { Message } from 'element-ui'
import  gloable  from '@/gloable'
import  { searchTotalClass , SearchPersonTotalClass } from '@/components/searchUtils/search'

function subImgData(firstClassName,_that,imgSrc){
    var formData = new FormData();
    formData.append('userid',  sessionStorage.getItem('user_id'));
    formData.append('totalclass_id', firstClassName);
    formData.append('images_upload',imgSrc);
    service.post(gloable.api.uploadTotalclassImage,formData)
    .then(function (res) {
        _that.dialogFormVisible = false; //关闭弹窗
        
        //刷新数据
        searchTotalClass(_that)
        SearchPersonTotalClass(_that)
    }, function (res) {
        Message({
            message: '请检查你得网络设置！',
            type: 'error',
            duration: 3 * 1000
        })
    });
}

export { searchTotalClass , subImgData } 