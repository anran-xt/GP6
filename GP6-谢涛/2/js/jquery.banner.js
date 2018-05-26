/**
 * Created by lenovo1 on 2018/5/26.
 */
;
+function ($) {
    //添加jquery全局插件
    $.banner=function (bannerSelector,animate, autoPlay, nextBtn, prevBtn) {
        if(!bannerSelector||!animate||!autoPlay) return;
        // console.log(this);
        //生成轮播
        new Banner(bannerSelector,animate,autoPlay,nextBtn,prevBtn);
    }
    //轮播模块
    function Banner(bannerSelector,animate, autoPlay, nextBtn, prevBtn) {
        this.bannerList=$(bannerSelector);
        this.bannerItem=$(this.bannerList).children();
        // console.log(this.bannerItem);
        this.animate=animate;
        this.isAutoPlay=autoPlay;
        this.nowIndex=0;
        this.nextIndex=0;
        this.flag=true;
        if(nextBtn&&prevBtn){
            this.nextBtn=nextBtn;
            this.prevBtn=prevBtn;
        }
        this.init();
    }
    //轮播原型
    Banner.prototype={
        constructor:Banner,
        init:function () {
            if(this.flag){
                $(this.bannerItem).each(function (index, item) {
                    $(item).fadeIn();
                    $(item).slideDown();
                    console.log("in");
                })

            }
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
            console.log(this.nowIndex,this.nextIndex);

            $(this.bannerItem[this.nowIndex]).css("z-index",1);
            $(this.bannerItem[this.nextIndex]).css("z-index",1);
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