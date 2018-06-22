
<script>
const host = 'http://www.kaishi.net.cn';
const api = {
    // 用户登录接口 post
    login:'/program/signin',
    //登出接口 get
    logout:'/program/signout',

    /*****************分类管理******************/
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

        //重传一级分类图片
        uploadfirstclassImage:"/program/uploadfirstclassImage",
            // 请求参数：firstclass_id
            //       images_upload

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
        searchCategoryUderTotalById:'/program/searchCategoryUderTotalById',

    /*****************发布商品*******************/
        //发布商品保存第一步基本信息
        saveproductionbasicinfo:'/program/saveproductionbasicinfo',
            //  请求参数:totalclass_id  商品类目id
            //           title  标题
            //           present_price  现价
            //           original_price 原价
            //           freight  运费

            //           personaltotalclass_id
            //           firstclass_id
            //           secondclass_id

        //查询商品规格
        searchAllSpecifications:'/program/searchAllSpecifications',

        //保存商品规格
        saveSpecifications:'/program/saveSpecifications',
            //  请求参数:	taste_name  ",
            //           	production_id
            //           	price
            //           	inventory
            //           	images_upload



        // 保存商品参数
        savegoodsparameters:"/program/savegoodsparameters",     //",
        // 请求参数:parameterName  参数名称
        //           parameterContent 参数内容
        //           production_id   商品id

        // 查询商品的所有参数
        searchAllgoodsparameters:'/program/searchAllgoodsparameters',
        // 请求参数:production_id   商品id


        //查询已上传的商品图片
        searchproductionImage:'/program/searchproductionImage',
        // 请求参数:production_id

        //查询已上传的商品描述图片
        searchdescribeImage:'/program/searchdescribeImage',
        // 请求参数:production_id

            //上传商品图片   				",
        uploadproductionImage:'/program/uploadproductionImage',
            // 请求参数:production_id
            //           production_images_upload

        //上传详情图片
        uploaddescribeImage:'/program/uploaddescribeImage',

        //删除商品图片
        deleteproductionImage:"/program/deleteproductionImage",
            // 请求参数:production_id
            //           index(删第一张传0，删第二张传1...)
            //           production_images_upload

        //删除宝贝描述图片
        deletedescribeImage:"/program/deletedescribeImage",
            // 请求参数:production_id
            //           index(删第一张传0，删第二张传1...)
            //           describe_images_upload

        //确认发布
        confirmPublishProduction:"/program/confirmPublishProduction",
        // 请求参数:production_id
    /*****************我的商品******************/
        //  1.查询所有上架/下架商品
        searchAllShelfOrLowerGoods:"/program/searchAllShelfOrLowerGoods",
            // 请求参数:userid
            //           ifonshelves(上架---true 下架---false)
            //           page


        //   2.上架/下架商品
        ShelfOrLowerGoods:"/program/ShelfOrLowerGoods",
            // 请求参数:production_id
            //           ifonshelves(上架---true 下架---false)

        //3.根据价格排序
        sortProductionByPrice:"/program/sortProductionByPrice",
            // 请求参数:
            //           index(=1 升序，=2降序)
            //           userid
            //           page
            //           ifonshelves

        //   4.根据销量排序
        sortProductionBySales:"/program/sortProductionBySales",
            // 请求参数:
            //           index(=1 升序，=2降序)
            //           userid
            //           page
            //           ifonshelves

        //   5.根据分类排序
        sortProductionByCategory:"/program/sortProductionByCategory",
            // 请求参数:
            //           userid
            //           page
            //           ifonshelves
            //           personaltotalclass_id
            //           firstclass_id
            //           secondclass_id

        //   6.删除商品
        deleteProduction:"/program/deleteProduction",
            // 请求参数:productionid（数组）

        //   7.查询商品详情
        searchProductionDetails:"/program/searchProductionDetails",
            // 请求参数:productionid

        //   8.删除规格
        deleteSpecification:"/program/deleteSpecification",
            // 请求参数:specifications_id

        //   9.删除商品参数
        deleteGoodsparameter:"/program/deleteGoodsparameter",
            // 请求参数:goodsParameters_id

        //   10.查询单条商品规格
        searchSingleSpecification:"/program/searchSingleSpecification",
            // 请求参数:specifications_id

        //   11.编辑商品规格
        editSpecification:"/program/editSpecification",
            // 请求参数: specification_id;
            //            taste_name;
            //            production_id
            //            price;
            //            inventory;

        //   12.重新上传商品规格图片
        reuploadSpecificationImage:"/program/reuploadSpecificationImage",
            // 请求参数:specification_id

        //   13.查询单条商品参数
        searchSingleGoodsparameter:"/program/searchSingleGoodsparameter",
            // 请求参数:parameter_id

        //   14.编辑商品参数
        editgoodsparameters:"/program/editgoodsparameters",
            // 请求参数:parameter_id;
            //           parameterName;
            //           parameterContent;

        //   15.编辑商品文本信息
        editBasicProductionInfo:"/program/editBasicProductionInfo",
            // 请求参数: title;
            //            present_price;
            //            original_price;
            //            freight;
            //            personaltotalclass_id;
            //            firstclass_id;
            //            secondclass_id;

        //查询用户创建的所有分类
        searchallCategoryCreateByUser:"/program/searchallCategoryCreateByUser",
            //user_id

}

export default{ host , api }

</script>
