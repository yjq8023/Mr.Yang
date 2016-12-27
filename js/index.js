//控制rem的函数
(function (doc,win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window);

window.onload=function(){
    //给导航添加点击事件
    $(".nav li").each(function(i,v){
        this.index=i;
    })
    $(".nav li").on("click",function(){
        $(".box>div").eq([this.index]).addClass("active").siblings().removeClass("active")
        switch (this.index){
            case 0:$(".box").css("transform", "rotateZ(0deg) translate3d(0px, 0px, 0px)");
                break;
            case 1:$(".box").css("transform", "rotateZ(-30deg) translate3d(-550px, 350px, 1200px)");
                break;
            case 2:$(".box").css("transform", "rotateY(0deg) rotateZ(0deg) translate3d(100px, 999px, 2400px)")
                break;
            case 3:$(".box").css("transform", "rotateY(-180deg) rotateZ(0deg) translate3d(100px, 999px, 2450px)")
                break;
        }

    })

    //项目列表
    /**
     * 给dom元素添加遮罩层的函数
     * @param dom需要添加遮罩的dom元素
     */
    function getFace(dom){
        $(dom).each(function(){
            var div=document.createElement("div");
            div=$(div);
            div.addClass("face")
            div.css({
                backgroundColor:"aqua",
                opacity:"0",
                width:"100%",
                height:"100%",
            })
            div.appendTo(this);
            $(this).on("mouseenter",function(e){
                var startX=e.pageX;
                var startY=e.pageY;
                var endX;
                var endY;
                $(this).on("mousemove",function(e){
                    endX=e.pageX;
                    endY=e.pageY;
                    if(Math.abs(endX-startX)+Math.abs(endY-startY)>2){
                        if(Math.abs(endX-startX)>Math.abs(endY-startY)){
                            var lor=endX>startX?"left":"right";
                        }else{
                            var lor=endY>startY?"top":"bottom";
                        }
                        tranlate(this,lor)
                        $(this).off("mousemove");
                    }
                })
            })
            $(this).on("mouseleave",function(e){
                var startX=e.pageX;
                var startY=e.pageY;
                var endX;
                var endY;
                var _this=this
                $(window).on("mousemove",function(e){
                    endX=e.pageX;
                    endY=e.pageY;
                    if(Math.abs(endX-startX)+Math.abs(endY-startY)>5){
                        if(Math.abs(endX-startX)>Math.abs(endY-startY)){
                            var lor=endX>startX?"right":"left";
                        }else{
                            var lor=endY>startY?"bottom":"top";
                        }
                        tranlate2(_this,lor)
                        $(this).off("mousemove");
                    }
                })
            })
        })
        var tranlate=function(dom,dire){
            var face=$(dom).find(".face");
            //var w=dom.offsetWidth+"px";
            var w=face.width();
            var h=face.height();
            face.css({
                opacity:"0",
                margin:"0",
                transform: "translate(0,0)"
            })
            switch (dire){
                case "left":face.css({
                    opacity:"1",
                    marginLeft:-w+"px"
                })
                break;
                case "right":face.css({
                    opacity:"1",
                    marginLeft:w+"px"
                });
                    break;
                case "top":face.css({
                    opacity:"1",
                    marginTop:-h+"px"
                });
                    break;
                case "bottom":face.css({
                    opacity:"1",
                    marginTop:h+"px"
                });
                    break;
            }
            face.animate({
                margin:0
            },200)
        }
        var tranlate2=function(dom,dire){
            var face=$(dom).find(".face");

            console.log(face,dire)
            //var w=dom.offsetWidth+"px";
            var w=face.width();
            var h=face.height();
            face.css({
                margin:"0",
            })
            switch (dire){
                case "left":face.animate({
                    marginLeft:-w+"px"
                },200)
                    break;
                case "right":face.animate({
                    marginLeft:w+"px"
                },200)
                    break;
                case "top":face.animate({
                    marginTop:-h+"px"
                },200)
                    break;
                case "bottom":face.animate({
                    marginTop:h+"px"
                },200)
                    break;
            }

        }
    }


    var lis=$(".box .showreel li");
    getFace(lis)
};

