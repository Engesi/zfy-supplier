/* var zfyurl = "http://192.168.1.202"; */
/* var zfyurl = "http://218.26.2.254:8082"; */
/* var zfyurl = "http://222.128.20.226:8083"; */
var zfyurl = "http://www.zhufuc.com";

function isIPhoneX(){
	if(plus.device.model.indexOf('iPhone') >-1 && screen.height >=812){
		return true;
	}else {
		return false;
	}
}

//判断手机是安卓还是苹果，安卓是2，苹果是4
function setPhoneType () { 
  let ua = navigator.userAgent.toLowerCase();
  let type = ua.includes('iphone') ? '4' : '2';
	localStorage.setItem('phoneType', type);
}

//查看或修改操作
function statis (method, htmlName, content){ //method:1为查看,2为修改
	let userInfo = JSON.parse(localStorage.getItem('loginUser')) || {};
	let phoneType = localStorage.getItem('phoneType');
	$.ajax({
		url: zfyurl+'/app/api/userSet/saveAppLog',
		data: {
			userId: userInfo.id,
			userName: userInfo.userName,
			companyId: userInfo.comId,
			companyName: userInfo.companyName,
			orgId: userInfo.orgId,
			orgName: userInfo.orgName,
			type: phoneType,
			method: method,
			htmlName: htmlName,
			content: content
		},
		type: 'POST',
		dataType: 'jsonp',
		success: res=>{
			
		},
		error: error=>{
			console.log(error);
		}
	})
}


function addPhone(phone){
	let phoneListBuyer = JSON.parse(localStorage.getItem('phoneListBuyer')) || [];
	phoneListBuyer.push(phone);
	let set = [...(new Set(phoneListBuyer))];//生成一个set对象给数组去重,把set对象转成数组
	localStorage.setItem('phoneListBuyer', JSON.stringify(set));
}

(function($, window) {  
    //显示加载框  
    $.showLoading = function(message,type) {  
        if ($.os.plus && type !== 'div') {  
            $.plusReady(function() {  
                plus.nativeUI.showWaiting(message);  
            });  
        } else {  
            var html = '';  
            html += '<i class="mui-spinner mui-spinner-white"></i>';  
            html += '<p class="text">' + (message || "数据加载中") + '</p>';  

            //遮罩层  
            var mask=document.getElementsByClassName("mui-show-loading-mask");  
            if(mask.length==0){  
                mask = document.createElement('div');  
                mask.classList.add("mui-show-loading-mask");  
                document.body.appendChild(mask);  
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{
                mask[0].classList.remove("mui-show-loading-mask-hidden");  
            }  
            //加载框  
            var toast=document.getElementsByClassName("mui-show-loading");  
            if(toast.length==0){  
                toast = document.createElement('div');  
                toast.classList.add("mui-show-loading");  
                toast.classList.add('loading-visible');  
                document.body.appendChild(toast);  
                toast.innerHTML = html;  
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{  
                toast[0].innerHTML = html;  
                toast[0].classList.add("loading-visible");  
            }  
        }     
    };  

    //隐藏加载框  
      $.hideLoading = function(callback) {  
        if ($.os.plus) {  
            $.plusReady(function() {  
                plus.nativeUI.closeWaiting();  
            });  
        }   
        var mask=document.getElementsByClassName("mui-show-loading-mask");  
        var toast=document.getElementsByClassName("mui-show-loading");  
        if(mask.length>0){  
            mask[0].classList.add("mui-show-loading-mask-hidden");  
        }  
        if(toast.length>0){  
            toast[0].classList.remove("loading-visible");  
            callback && callback();  
        }  
      }  
})(mui, window);

mui('body').on('tap','a',function(e){
	var href = this.getAttribute('href');
	var title = this.getAttribute('title');
	var backgroundColor = "";
	var state = localStorage.getItem('state');
	var withtitle = this.getAttribute('withtitle');
	var wait = this.getAttribute('wait');
	if(state == 1){
		backgroundColor = "#0295fc";
	}else if(state == 2){
		backgroundColor = "#ff8555";
	}else{
		backgroundColor = "#0295fc";
	}
	if(href.indexOf("javascript") == -1){
		console.log('未匹配到javascript字符窜');
		if(withtitle!='false'){
			console.log
			mui.openWindow({
				id : href,
				url: href,
				styles: {
					"render": "always",
					"popGesture": "hide",
					"bounce": "vertical",
					"titleNView": { //详情页原生导航配置
										backgroundColor: backgroundColor, //导航栏背景色
										titleText: title, //导航栏标题
										titleColor: '#fff', //文字颜色
										type: '', //透明渐变样式
										autoBackButton: true, //自动绘制返回箭头
									}
				}
			})
		}else {
			
				mui.openWindow({
					id : href,
					url: href,
					styles: {
						"render": "always",
						"popGesture": "hide",
						"bounce": "vertical",
					},
				})
			
			
		}
		
	}
});

function openWindow(href){
	mui.openWindow({
		id : href,
		url: href
	})
}

function openWindow_nav(href,title){
	var state = localStorage.getItem('state');
	var backgroundColor = "";
	if(state == 1){
		backgroundColor = "#0295fc";
	}else if(state == 2){
		backgroundColor = "#ff8555";
	}
	if(href.indexOf("javascript") == -1){
		mui.openWindow({
			id : href,
			url: href,
			styles: {
				"render": "always",
				"popGesture": "hide",
				"bounce": "vertical",
				"titleNView": { //详情页原生导航配置
					backgroundColor: backgroundColor, //导航栏背景色
					titleText: title, //导航栏标题
					titleColor: '#fff', //文字颜色
					type: '', //透明渐变样式
					autoBackButton: true, //自动绘制返回箭头
				}
			}
		})
	}
}

function hideBtn(){
	var h = $(window).height();
	window.onresize = function() {
		if($(window).height() < h) {
			$(".hideBtn").hide();
		} else {
			$(".hideBtn").show();
		}
	};
}
hideBtn();
function pc_tab() {
	$(".item").eq(0).show(); //为每个BOX的第一个元素显示
	$(".tab li").on("click", function() {
		var index = $(this).index();
		$(".item").hide().eq(index).show(); //返回上一层，在下面查找css名为box隐藏，然后选中的显示  
		$(this).addClass("active").siblings().removeClass("active"); //a标签显示，同辈元素隐藏  
	})
}
function list(name){
	var href = window.location.href;
	var id=href.split("?id=")[1];
	$(name).each(function(i){
		if(i==id){
			$(this).show();
		}else{
			$(this).hide();
		}
	})
}

mui('body').on('tap', '.net', function(e) {
	mui.plusReady(function(){
		var supplier = plus.webview.getWebviewById('../index-supplier.html');
		var buyer = plus.webview.getWebviewById('index-buyer.html');
		var supplier1 = plus.webview.getWebviewById('index-supplier.html');
		if(supplier != null){
			plus.webview.close(supplier);
		};
		if(buyer != null){
			plus.webview.close(buyer);
		};
		if(supplier1 != null){
			plus.webview.close(supplier1);
		};
	})
	
})