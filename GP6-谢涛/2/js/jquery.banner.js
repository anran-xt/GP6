/**
 * Created by lenovo1 on 2018/5/26.
 */
;

// 轮播图插件
// 参数：bannerSelector:轮播图的容器选择器，必选
//      animate:slide/fade，轮播的方式，必选
//      autoPlay:true/false，是否自动轮播，必选
//      prevBtn:向前翻页的选择器，可选参数
//      nextBtn:向后翻页的选择器，可选参数


+function ($) {
    //添加jquery全局插件
    $.banner=function (bannerSelector,animate, autoPlay, nextBtn, prevBtn) {
        if(!bannerSelector||!animate||!autoPlay) return;
        //生成轮播
        new Banner(bannerSelector,animate,autoPlay,nextBtn,prevBtn);
    }
    //轮播模块
    function Banner(bannerSelector,animate, autoPlay, nextBtn, prevBtn) {
        //接收传入参数
        this.bannerList=$(bannerSelector);
        this.bannerItem=$(this.bannerList).children();
        this.animate=animate;
        this.isAutoPlay=autoPlay;
        this.nowIndex=0;
        this.nextIndex=0;
        //判断可选参数是否存在
        if(nextBtn&&prevBtn){
            this.nextBtn=$(nextBtn);
            this.prevBtn=$(prevBtn);
        }
        this.init();
    }
    //轮播原型
    Banner.prototype={
        constructor:Banner,
        //初始化
        init:function () {
            if(this.isAutoPlay){
                this.autoPlay();
            }
            this.prevBtn.on("click",function () {
                // clearInterval(this.timer);
                this.nowIndex=this.nextIndex;
                if(this.nowIndex==0){
                    this.nextIndex=this.bannerItem.length-1;
                }else{
                    this.nextIndex--;
                }
                this.startMove();
            }.bind(this));
            //为button添加事件，移入清除定时器，移除重新开始定时器，点击切换
            this.prevBtn.on("mouseenter",function () {
                clearInterval(this.timer);
            }.bind(this));
            this.prevBtn.on("mouseleave",function () {
                this.autoPlay();
            }.bind(this));
            this.nextBtn.on("click",function () {
                // clearInterval(this.timer);
                this.nowIndex=this.nextIndex;
                if(this.nowIndex==this.bannerItem.length-1){
                    this.nextIndex=0;
                }else{
                    this.nextIndex++;
                }
                this.startMove();
            }.bind(this));
            this.nextBtn.on("mouseenter",function () {
                console.log("yes");
                clearInterval(this.timer);
            }.bind(this));
            this.nextBtn.on("mouseleave",function () {
                console.log("ok");
                this.autoPlay();
            }.bind(this));
        },
        //自动轮播
        autoPlay:function () {
            this.timer=setInterval(function () {
                this.mutiIndex();
            }.bind(this),2000);
        },
        //计算下标
        mutiIndex:function () {
            this.nowIndex=this.nextIndex;
            if(this.nowIndex==this.bannerItem.length-1){
                this.nextIndex=0;
            }else{
                this.nextIndex++;
            }
            this.startMove();
        },
        //按照下标轮播
        startMove:function () {
            $(this.bannerItem).each(function(index,item){
                $(item).css("z-index",0);
            });

            $(this.bannerItem[this.nowIndex]).css("z-index",1);
            $(this.bannerItem[this.nextIndex]).css("z-index",1);

            //判断动画方式
            if(this.animate=="slide"){
                $(this.bannerItem[this.nextIndex])
                    .stop()
                    .slideDown("slow",function () {
                    console.log("slideDown");
                });
                $(this.bannerItem[this.nowIndex])
                    .stop()
                    .slideUp("slow",function () {
                    console.log("slideUp");
                });

            }else if(this.animate=="fade"){
                $(this.bannerItem[this.nowIndex])
                    .stop()
                    .fadeOut("slow");
                $(this.bannerItem[this.nextIndex])
                    .stop()
                    .fadeIn("slow");
            }
        }
    }
}(jQuery);