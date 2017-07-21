$(function (){
    //city
    (function (){
        $('.city a').click(function (){
            $('.city a').removeClass('active');
            $(this).addClass('active');
        });
    })();
    //搜索
    (function (){
        var $aLi = $('#search .menu').find('li');
        var $oTxt = $('#search .text');
        var arrText = ['例如：荷棠鱼坊烤鱼 或 樱花日本料理','例如：厦门市思明区罗宾森4楼某处','例如：万达影院情侣观影券','例如；东莞出事儿，大老虎是谁？','例如；北京初春降雪，天气变换莫测'];
        var iNow = 0;
        $oTxt.val(arrText[iNow]);
        $aLi.click(
            function (){
                $aLi.prop('class','gradient');
                $(this).prop('class','active');
                $oTxt.val(arrText[$(this).index()]);
                iNow = $(this).index();
            });
        $oTxt.on({'focus':function (){
            if($(this).val() == arrText[iNow])
            {
                $(this).val('');
            }
        },'blur':function (){
            if($(this).val() == '')
            {
                $(this).val(arrText[iNow]);
            }
        }});
        $('#text').on({'focus':function (){
            
            if($(this).val() == this.defaultValue)
            {
                $(this).val('');
            }
        },'blur':function (){
            if($(this).val() == '')
            {
                $(this).val(this.defaultValue);
            }
        }});
    })();
    //大轮播图 原生写
    (function (){
        var oCar = id('carousel');
        var oBtn1 = byClass(oCar,'a','carbtn1')[0];
        var oBtn2 = byClass(oCar,'a','carbtn2')[0];
        var oUl = byClass(oCar,'ul','carul')[0];
        var aLi = tag(oUl,'li');
        var oDiv = byClass(oCar,'div','dotbtn')[0];
        var aBtn = tag(oDiv,'span');
        var liWidth = aLi[0].offsetWidth;
        var iNow = 0;
        var iNow2 = 0;
        var onOff = true;
        var onOff1 = true;
        var timer = null;var num = 0;
        oUl.style.width = liWidth * aLi.length + 'px';
        for(var i = 0;i < aBtn.length;i++)
        {
            aBtn[i].index = i;
            aBtn[i].onclick = function ()
            {
                if(!onOff1)return;
                onOff = false;
                showBtn(aBtn,this);
                iNow = this.index;
                iNow2 = this.index;
                doMove(oUl,{'left':-(this.index * liWidth)},1000,'bounceOut',function (){
                    onOff = true;
                });
            };
        }
        oBtn1.onclick = function ()
        {
            carousel(-1,-1,aLi.length - 1,oUl.offsetWidth - liWidth);
        };
        oBtn2.onclick = function ()
        {
            carousel(1,aLi.length,0,0);
        };
        function showBtn(obj,_this)
        {
            for(var i = 0;i < obj.length;i++)
            {
                removeClass(obj[i],'active');
            }
            addClass(_this,'active');
        }   
        function carousel(num,final,change,left)
        {
            if(!onOff)return;
            onOff1 = onOff = false;
            iNow += num;
            iNow2 += num;
            if(iNow == final)
            {
                iNow = change;
                aLi[change].style.position = 'relative';
                aLi[change].style.left = oUl.offsetWidth * num + 'px';
            }
            doMove(oUl,{'left':-iNow2*liWidth},1000,'bounceOut',function (){
                if(iNow == change)
                {
                    aLi[change].style.position = '';
                    aLi[change].style.left = -left*num + 'px';
                    oUl.style.left = left*num + 'px';
                    iNow2 = change;
                }
                onOff1 = onOff = true;
            });
            showBtn(aBtn,aBtn[iNow]);
        }    
        autoPlay();
        function autoPlay()
        {
            timer = setInterval(function (){
                carousel(1,aLi.length,0,0);
            },2500);
        }
       oCar.onmouseover = function () 
       {
        clearInterval(timer);
        oBtn1.style.display = oBtn2.style.display = 'block';
       };
       oCar.onmouseout = function ()
       {
        autoPlay();
        oBtn1.style.display = oBtn2.style.display = 'none';
       };
       oBtn1.onmouseover = oBtn2.onmouseover = function ()
       {
        this.style.filter = 'alpha(opacity=' + 60 + ')';
        this.style.opacity = 0.6;
       };
       oBtn1.onmouseout = oBtn2.onmouseout = function ()
       {
        this.style.filter = 'alpha(opacity=' + 30 + ')';
        this.style.opacity = 0.3;
       };
    })();
    
    //照片墙 原生写
    (function (){
        var oPtWall = byClass(document,'div','photowall')[0];
        var oUl = tag(oPtWall,'ul')[0];
        var aLi = tag(oUl,'li');
        var liPos = [];
        var zIndexMin = 5;
        for(var i = 0;i < aLi.length;i++)
        {
            aLi[i].index = i;
            liPos[i] = {'left':aLi[i].offsetLeft,'top':aLi[i].offsetTop};
            aLi[i].style.left = liPos[i].left + 'px';
            aLi[i].style.top = liPos[i].top + 'px';
        }
        for(i = 0;i < aLi.length;i++)
        {
            aLi[i].style.position = 'absolute';
            aLi[i].style.margin = 0;
        }
        for(i = 0;i < aLi.length;i++)
        {
            drag(aLi[i]);
        }
        function drag(obj)
        {
            obj.onmousedown = function (ev)
            {
                this.style.zIndex = zIndexMin++;
                var _this = this;
                var iEvent = ev || event;
                var disX = iEvent.clientX - obj.offsetLeft;
                var disY = iEvent.clientY - obj.offsetTop;
                obj.setCapture && obj.setCapture();
                document.onmousemove = function (ev)
                {
                    var iEvent = ev || event;
                    obj.style.left = iEvent.clientX - disX + 'px';
                    obj.style.top = iEvent.clientY - disY + 'px';
                    var iNear = getNearest(obj,aLi);
                    for(var i = 0;i < aLi.length;i++)
                    {
                        removeClass(aLi[i],'active');
                    }
                    if(iNear)
                    {
                        addClass(iNear,'active');
                    }
                };
                document.onmouseup = function ()
                {
                    document.onmousemove = document.onmouseup = null;
                    obj.releaseCapture && obj.releaseCapture();
                    var iNear = getNearest(obj,aLi);
                    if(iNear)
                    {
                        removeClass(iNear,'active');
                        iNear.style.zIndex = zIndexMin++;
                        obj.style.zIndex = zIndexMin++;
                        doMove(obj,liPos[iNear.index],2000,'elasticOut');
                        doMove(iNear,liPos[obj.index],2000,'elasticOut',function (){
                        });
                        var tmp = obj.index;
                        obj.index = iNear.index;
                        iNear.index = tmp;
                    }
                    else {
                        doMove(obj,liPos[obj.index],2000,'elasticOut');
                    }
                };
                clearInterval(obj.timer);
                return false;
            };
        }
        function collTest(obj1,obj2)
        {
            var l1 = obj1.offsetLeft;
            var r1 = obj1.offsetLeft + obj1.offsetWidth;
            var t1 = obj1.offsetTop;
            var b1 = obj1.offsetTop + obj1.offsetHeight;
            var l2 = obj2.offsetLeft;
            var r2 = obj2.offsetLeft + obj2.offsetWidth;
            var t2 = obj2.offsetTop;
            var b2 = obj2.offsetTop + obj2.offsetHeight;
            if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2)
            {
                return false;
            }
            else {
                return true;
            }
        }
        function getNearest(obj1,obj2)
        {
            var valueMin = 999999999;
            var indexMin = -1;
            for(var i = 0;i < obj2.length;i++)
            {
                if(obj1 == obj2[i])continue;
                if(collTest(obj1,obj2[i]))
                {
                    if(getDis(obj1,obj2[i]) < valueMin)
                    {
                        valueMin = getDis(obj1,obj2[i]);
                        indexMin = i;
                    }
                }
            }
            return indexMin == -1? false: obj2[indexMin];
        }
        function getDis(obj1,obj2)
        {
            var a = obj1.offsetLeft - obj2.offsetLeft;
            var b = obj1.offsetTop - obj2.offsetTop;
            return Math.sqrt(a * a + b * b);
        }
    })();
    //update文字滚动
    (function (){
        var arrData = [
        {'name':'萱萱','time':4,'title':'那些灿烂华美的瞬间','url':'javascript:;'},
        {'name':'康康','time':5,'title':'广东三天抓获涉黄疑犯','url':'javascript:;'},
        {'name':'红红','time':6,'title':'国台办回应这件事','url':'javascript:;'},
        {'name':'君君','time':7,'title':'最美十大中国人','url':'javascript:;'},
        {'name':'小王','time':8,'title':'那些灿烂华美的瞬间','url':'javascript:;'},
        {'name':'老刘','time':9,'title':'广东三天抓获涉黄疑犯','url':'javascript:;'},
        {'name':'张三','time':10,'title':'国台办回应这件事','url':'javascript:;'},
        {'name':'李四','time':11,'title':'那些灿烂华美的瞬间','url':'javascript:;'},
        {'name':'王五','time':12,'title':'如果煮好鸡蛋的重要步骤','url':'javascript:;'},
        {'name':'赵六','time':13,'title':'那些灿烂华美的瞬间','url':'javascript:;'},
        {'name':'钱七','time':14,'title':'国台办回应这件事','url':'javascript:;'},
        {'name':'大大','time':15,'title':'那些灿烂华美的瞬间','url':'javascript:;'},
        {'name':'小小','time':16,'title':'如果煮好鸡蛋的重要步骤','url':'javascript:;'}
        ];
        var str = '';
        var timer = null;
        var num = 0;
        for(var i=0;i < arrData.length;i++)
        {
            str += '<li><a href="'+ arrData[i].url +'""><strong>'+ arrData[i].name +'</strong></a><span>'+ arrData[i].time +'分钟前</span><a href="'+ arrData[i].url +'">写了一篇新文章：'+ arrData[i].title +'</a></li>';
        }
        var $oUl = $('.update ul');
        $oUl.html(str);
        var iHeight = $oUl.find('li').outerHeight();
        timer = setInterval(function (){
            autoPlay(-1);
        },3000);
        var $oUp = $('.update .triangle_up');
        var $oDown = $('.update .triangle_down');
        $oUp.click(function (){
            autoPlay(1);
        });
        $oDown.click(function (){
            autoPlay(-1);
        });
        function autoPlay(iNow){
            num += iNow;
            if(Math.abs(num) == arrData.length)
            {
                num = 0;
            }
            else if(num == 1)
            {
                num = -(arrData.length - 1);
            }
            $oUl.stop().animate({'top':iHeight*num},'slow');
        }
        $('.update').hover(function (){
            clearInterval(timer);
        },function (){
            timer = setInterval(function (){
            autoPlay(-1);
        },3000);
        });
    })();
    //选项卡
    (function (){
        tabFn($('.con1'),$('#tab1 li'),'ul');
        function tabFn(parent,element,name) {
            var $aUl = parent.find(name);
        $aUl.hide().eq(0).show();
        element.click(function (){
            element.removeClass('active').addClass('gradient')
                .find('div').prop('class','triangle_gray');
            $(this).addClass('active').removeClass('gradient')
                .find('div').prop('class','triangle_down');
            $aUl.hide().eq($(this).index()).show();
        });
        }
    })();
    //选项卡2 
    (function (){
        tabFn($('.advice'),$('.adviceli'));
        tabFn($('.coupons'),$('.couponsli'));
        function tabFn(parent,element){    
            parent.hide().eq(0).show();
            element.mouseover(function (){
               element.removeClass('active').addClass('gradient')
                    .find('div').prop('class','triangle_gray');
               $(this).removeClass('gradient').addClass('active')
                    .find('div').prop('class','triangle_down');
                    parent.hide().eq($(this).index()).show();
            });
        }
    })();
    //小轮播图
    (function (){
        var $oUl = $('.slideshow ul');
        var $oOl = $('.slideshow ol');
        var $oUlLi = $oUl.find('li');
        var $oOlLi = $oOl.find('li');
        var timer = null;
        var arrText = ['美味的西点','娜塔莉波特曼','火影忍者'];
        var num = 0;
        $('.slideshow').find('h3').eq(0).html(arrText[0]);
        $oUlLi.hide().eq(0).show();
        $oOlLi.eq(0).addClass('active');
        $oOlLi.click(function (){
            num = $(this).index();
            slideshow();
        });
        function slideshow() {
            $oOlLi.each(function (index){
                if(index != num)
                {
                    $oOlLi.eq(index).removeClass('active');
                    $oUlLi.eq(index).fadeOut();
                }
                else {
                    $oOlLi.eq(index).addClass('active');
                    $oUlLi.eq(index).fadeIn();
                    $('.slideshow').find('h3').html(arrText[index]);
                }
            });
        }
      timer = setInterval(function (){
            slideshow();
            num++;
            if(num == $oUlLi.length)
            {
                num = 0;
            }
        },2000);
      $('.slideshow').hover(function (){
        clearInterval(timer);
      },function (){
        timer = setInterval(function (){
            slideshow();
            num++;
            if(num == $oUlLi.length)
            {
                num = 0;
            }
        },2000);
      });
    })();
    //BBS高亮
    (function (){
        $('.bbs li').mouseover(function (){
            $('.bbs li').prop('class','');
            if($(this).index() % 2 == 0)
            {
                $(this).prop('class','active');
            }
            else {
                $(this).prop('class','active2');
            }
        });
    })();
});
function id(id) { return document.getElementById(id); }
function tag(parent,tagName) { return (parent || document).getElementsByTagName(tagName); }
function doMove(obj,json,times,fx,endFn)
        {
            var iCur = {};
            var startTime = new Date().getTime();
            for(var attr in json)
            {
                iCur[attr] = attr == 'opacity'? parseInt(getStyle(obj,attr) * 100): parseInt(getStyle(obj,attr));
            }
            clearInterval(obj.timer);
            obj.timer = setInterval(function (){
                var changeTime = new Date().getTime();
                var time = changeTime - startTime;
                if(time > times)time = times;
                for(var attr in json)
                {
                    var value = Tween[fx](time,iCur[attr],json[attr] - iCur[attr],times);
                    if(attr == 'opacity')
                    {
                        obj.style.filter = 'alpha(opacity=' + value + ')';
                        obj.style.opacity = value / 100;
                    }
                    else {
                        obj.style[attr] = value + 'px';
                    }
                }
                if(time == times)
                {
                    clearInterval(obj.timer);
                    endFn && endFn();
                }
                },13);     
        }
/*        function byClass(parent,tagName,name)
        {
            var aEls = tag(parent,tagName);
            var arr = [];
            for(var i = 0;i < aEls.length;i++)
            {
                var aClass = aEls[i].className.split(' ');
                for(var j = 0;j < aClass.length;j++)
                {
                    if(aClass[j] == name)
                    {
                        arr.push(aEls[i]);
                        break;
                    }
                }
            }
            return arr;
        }*/
function byClass(parent,tagName,name)
{
    var arr = [];
    var aEls = tag(parent,tagName);
    var re = new RegExp('\\b' + name + '\\b','i');
    for(var i = 0;i < aEls.length;i++)
    {
        if(re.test(aEls[i].className))
        {
            arr.push(aEls[i]);
        }
    }
    return arr;
}
function getStyle(obj,attr)
{
    return obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj,false)[attr];
}
function removeClass(obj,name)
{
    var re = new RegExp('(\\s|^)' + name + '(\\s|$)');
    if(re.test(obj.className))obj.className = obj.className.replace(re,' ').replace(/^\s|\s$/,'');
}
function addClass(obj,name)
{
    var re = new RegExp('\\b' + name + '\\b');
    if(!re.test(obj.className))obj.className = obj.className == ''? name: obj.className + ' ' + name;
}