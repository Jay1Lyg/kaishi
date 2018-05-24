<script>
const host='http://www.kaishi.net.cn';
const api={
    // 用户登录接口 post
    login:'/program/signin',
    //登出接口 get
    logout:'/program/signout',

    //分类管理  上传总分类照片post
    uploadTotalclassImage:'/program/uploadclassImage',
    

    //添加一级分类post
    addFirstCategory:'/program/addFirstCategory',

    //添加二级分类表  post
    addSecondCategory:'/program/addSecondCategory',

    //查询所有总分类post
    searchallTotalCategory:'/program/searchallTotalCategory',

    //查询某总分类下的所有一级分类分类post
    searchFirstCategory:'/program/searchFirstCategory',
    
    //查询某一级分类下的所有二级分类post
    searchSecondCategory:'/program/searchSecondCategory',
    //编辑时根据总分类id查询单个总分类
    searchSingleTotalCategory:'/program/searchSingleTotalCategory',
    //编辑时根据一级分类id查询单个一级分类
    searchSingleFirstCategory:'//program/searchSingleFirstCategory',
    //编辑时根据二级分类id查询单个二级分类
    searchSingleSecondCategory:'/program/searchSingleSecondCategory',
    //编辑一级分类
    editFirstCategory:'/program/editFirstCategory',
    //编辑二级分类
    editSecondCategory:'/program/editSecondCategory',
    //删除总分类
    deleteTotalCategory:'/program/deleteTotalCategory',
    //删除一级分类
    deleteFirstCategory:'/program/deleteFirstCategory',
    //删除二级分类
    deleteSecondCategory:'/program/deleteSecondCategory',


    // 发布商品 post user_id
    searchCategory:'/program/searchCategory',

    //根据商品类目id查询一级二级分类
    searchCategoryUderTotalById:'/program/searchCategoryUderTotalById'
}
export default{
    host,
    api
}

</script>
