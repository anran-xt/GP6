/**
 * Created by lenovo1 on 2018/5/26.
 */

//renderPage对象，将拿到的数据进行渲染
function renderPage(res) {
    this.res=res.data.list;
    // console.log(this.res);
    this.init();
}
//renderPage对象的原型
renderPage.prototype={
    constructor:renderPage,
    //init函数进行渲染功能
    init:function () {
        var resStr="";
        $(this.res).each(function (index, item) {
            var str=`<div class="box">
                        <div class="imgBox">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="price">￥${item.price}</div>
                        <div class="title">${item.title}</div>
                        <div class="btn" data-id="${item.userId}">立即购买</div>
                    </div>`;
            resStr+=str;
        })
        $(".main").html(resStr);
    }
}
