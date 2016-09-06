/* TODO 本来把计时对象放在了startPlay函数里，重玩的时候直接调用startPlay。这样会导致重新绑定一遍拖动事件。
	这在语义上就是错误的：startPlay从名字看就不应该包括绑定事件和创建计时器对象。绑定事件明显应该是在玩之外和之前要做的
	事情。玩应该只包括拖动逻辑和计时。如果这样写，则重玩的时候直接调用startPlay就没问题。但现在startPlay的写法并不对
*/

//可选内容的设置。包括背景音乐、背景音乐图标、提示下滑箭头--------------------------------------------------------------
//初始化修改。以下五行可选修改
var bBgMusciOn = true,//若要启用背景音乐，修改为true。启用后默认不播放，需要播放时：bgMusicPlay();  需要暂停时：bgMusicPause();
	bMusicIconOn = true,//若要启用音乐图标，修改为true。启用后默认不显示，需要显示时 oMusicIcon.style.display = "block";
	bSlideUpArrowOn = false;//若要启用上搓提示箭头，修改为true。
var bgMusicSrc = "audio/bg.mp3";//默认背景音乐路径
var musicIconbgImageSrc = "url(image/music.svg)";//默认音乐图标背景路径

//可选内容自动设置
var oWrapper = document.getElementById("wrapper"),
	oBgMusic = document.getElementById("bgMusic"),
	oMusicIcon = document.getElementById("music_icon"),
	oSlideUpArrow = document.getElementById("slideUpArrow"),
	oNoHorizontal = document.getElementById("noHorizontal");
oBgMusic.src = bBgMusciOn ? bgMusicSrc : "";
oSlideUpArrow.style.display = (bSlideUpArrowOn) ? "block" : "none";
oMusicIcon.style.display = (bMusicIconOn) ? "block" : "none";
oMusicIcon.style.backgroundImage = bMusicIconOn ? musicIconbgImageSrc : "";





//以下为当前项目独立代码------------------------------------------------------------------------------------------------
var oStartPage = document.querySelector("#startPage"),
	oGamePage = document.querySelector("#gamePage"),
	oResultPage = document.querySelector("#resultPage"),
	oRulePage = document.querySelector("#rulePage"),
	oRankPage = document.querySelector("#rankPage");

//后续加载的资源------------------------------------
//初始化修改。由于要让首屏和靠前的内容尽快建在，之后几屏的图片等资源不应在HTML和CSS中加载，应在页面加载完之再加载
//在启用加载页的情况下，可以在整个页面加载完成之后立刻让加载页消失。这在用户第二次带缓存打开的时候很有必要
window.addEventListener("load", function()
{
	setTimeout(function()
	{
		bgMusicPlay();
	}, 5000);
	oMusicIcon.style.display = "block";

	//后续资源加载代码
	aPreloadImages = [
		'image/cakes/0/cake.png', 'image/cakes/0/material0.png',  'image/cakes/0/material1.png',  'image/cakes/0/material2.png',  'image/cakes/0/material3.png',  'image/cakes/0/material4.png',
		'image/cakes/1/cake.png', 'image/cakes/1/material0.png',  'image/cakes/1/material1.png',  'image/cakes/1/material2.png',  'image/cakes/1/material3.png',  'image/cakes/1/material4.png',
		'image/cakes/2/cake.png', 'image/cakes/2/material0.png',  'image/cakes/2/material1.png',  'image/cakes/2/material2.png',  'image/cakes/2/material3.png',  'image/cakes/2/material4.png',
		'image/cakes/3/cake.png', 'image/cakes/3/material0.png',  'image/cakes/3/material1.png',  'image/cakes/3/material2.png',  'image/cakes/3/material3.png',  'image/cakes/3/material4.png',
		'image/cakes/4/cake.png', 'image/cakes/4/material0.png',  'image/cakes/4/material1.png',  'image/cakes/4/material2.png',  'image/cakes/4/material3.png',  'image/cakes/4/material4.png',
		'image/cakes/rectanglePlate.png'
	];
	preloadImages( aPreloadImages );
}, false);
function preloadImages(arr)//图片预加载
{
	var newImages=[];
	for (var i=0; i<arr.length; i++)
	{
		newImages[i]=new Image();
		newImages[i].src=arr[i];
	}
}




//show and display of the rule page ------------------------------------------------------------------------------------
(function()
{
	var oStartBtn = document.querySelector("#startBtn"),
		oRuleBtn = document.querySelector("#ruleBtn"),
		oCloseRulePageBtn = oRulePage.querySelector(".closeBtn");
	oStartBtn.addEventListener("touchend", function()
	{
		oStartPage.style.display = "none";
		oRulePage.style.display = "block";
	}, false);
	oRuleBtn.addEventListener("touchend", function()
	{
		oRulePage.style.display = "block";
	}, false);
	oCloseRulePageBtn.addEventListener("touchend", function()
	{
		oRulePage.style.display = "none";
		oStartPage.style.display = "block";
	}, false);
})();

//start game
(function()
{
	var oStartNowBtn = document.querySelector("#startNowBtn");
	oStartNowBtn.addEventListener("touchend", function()
	{
		oRulePage.style.display = "none";
		oGamePage.style.display = "block";
		startPlay();
	}, false);
})();

//初始尺寸和位置
var oCakeScroll = document.querySelector("#cakeScroll"),
	aMaterial = document.querySelectorAll(".material"),
	aPreWidth = [],
	aPreHeight = [],
	aPreTop = [],
	aPreLeft = [];

//game timer
var secondForDisplay = 0,
	clockTimer = null;
var gameTimer =
{
	timer : 0,
	timeBegin : function( clock )//调用这个方法开始计时
	{
		this.timer = (new Date()).getTime();

		clockTimer = setInterval(function()
		{
			clock.textContent = ++secondForDisplay/10 + '秒';
		}, 100);
	},
	timeEnd : function()//调用这个方法停止计时并返回时长
	{
		clearInterval( clockTimer );
		return (new Date).getTime() - this.timer;
	}
},
	nPlayTime = 0;

//drag play ------------------------------------------------------------------------------------------------------------
function startPlay()
{
	var aCake = document.querySelectorAll(".cake"),
		nCakeIndex = 0,
		nMaterialNums = 5,
		nInPlaceNum = 0,
		aTargetPosLeft = [ 21, 38, 24, 30, 54,      50, 66, 30, 54, 20,      23, 72, 32, 28, 50,      20, 26, 52, 62, 28,      31, 66, 44, 24, 40],
		aTargetPosTop = [-308, -370, -270, -242, -228,   -292, -212, -262, -242, -262,    -138, -160, -180, -290, -300,    -320, -370, -285, -246, -266,     -273, -183, -183, -187, -118],
		aTargetWidth = [114*0.7, 257*0.6, 303*0.6, 121*0.7, 83*0.8,   230*0.5, 54*0.6, 145*0.6, 63*0.6, 97*0.6,    63*0.7, 62*0.7, 176*0.7, 141*0.65, 158*0.6,    334*0.6, 156*0.6, 69*0.7, 117*0.7, 176*0.7,    327*0.5, 99*0.5, 97*0.5, 83*0.5, 184*0.5],
		aTargetHeight = [116*0.7, 226*0.6, 101*0.6, 81*0.7, 45*0.8,    208*0.5, 62*0.6, 163*0.6, 115*0.6, 167*0.6,    63*0.7, 62*0.7, 95*0.7, 125*0.65, 160*0.6,    168*0.6, 244*0.6, 90*0.7, 60*0.7, 95*0.7,    122*0.5, 105*0.5, 111*0.5, 116*0.5, 92*0.5];

		for(var i=0; i<25; i++)
		{
			aMaterial[i].index = i;
			dragInPlace(aMaterial[i], [-200, 140], dragInPlaceCallback, 120);
			aPreWidth.push( getComputedStyle(aMaterial[i], null).width );
			aPreHeight.push( getComputedStyle(aMaterial[i], null).height );
			aPreTop.push( getComputedStyle(aMaterial[i], null).top );
			aPreLeft.push( getComputedStyle(aMaterial[i], null).left );
		}



	var oClock = document.querySelector("#clock");
	gameTimer.timeBegin( oClock );


//TODO why the last material's touchend will be triggered twice ? here i use the bTouchended to prevent it;
	var bTouchended = false;
	dragInPlace(aMaterial[24], [-200, 140], dragInPlaceCallback, 120);


//drag function
//第一个参数为被拖动对象；第二个参数为目标对象，如果没有对象，则需要传入一个两项数组，分别为目标位置的top、left像素值；
//第三个参数为拖到之后松开手后要执行的函数；第四个参数为距离目标的差距小于多少就算是拖到，如果不写默认30
	function dragInPlace(oDragged, oTarget, callback, deviation)
	{
		var aInnerDis = [],//touchstart时距离被拖动元素左上角的距离,用移动时的坐标减去这个坐标就是元素的位置
			deviation = deviation?deviation:30,
			oDraggedTop = 0,
			oDraggedLeft = 0,
			oTargetTop = 0,
			oTargetLeft = 0;

		if( getComputedStyle(oDragged,null).position === "static" || getComputedStyle(oDragged,null).position === "relative" )
		{
			throw new Error("被拖动对象必须设置绝对或固定定位");
			return;
		}
		oDragged.addEventListener("touchstart",function(ev)//记录开始触摸时触摸点在元素内部的坐标
		{
			oDraggedTop = oDragged.offsetTop,//只有显示出来才有offset值
				oDraggedLeft = oDragged.offsetLeft;
			if( Array.isArray(oTarget) )
			{
				oTargetTop = oTarget[0],
					oTargetLeft = oTarget[1];
			}
			else
			{
				oTargetTop = oTarget.offsetTop,
					oTargetLeft = oTarget.offsetLeft;
			}
			var	touchStart = ev.targetTouches[0];
			aInnerDis = [touchStart.pageX - oDragged.offsetLeft, touchStart.pageY - oDragged.offsetTop];//距离被拖动元素左上角的距离
		},false);
		oDragged.addEventListener("touchmove", function(ev)
		{
			ev.preventDefault();
			if ( ev.targetTouches.length == 1 ) // 如果这个元素的位置内只有一个手指的话
			{
				// 把元素放在手指所在的位置
				var touch = ev.targetTouches[0];
				oDragged.style.left = touch.pageX - aInnerDis[0] + 'px';
				oDragged.style.top = touch.pageY - aInnerDis[1] + 'px';
			
			}
		}, false);

		oDragged.addEventListener("touchend",function(ev)
		{
			if( !bTouchended )
			{
				bTouchended = true;
				if( Math.abs(oDragged.offsetLeft-oTargetLeft)<deviation && Math.abs(oDragged.offsetLeft-oTargetLeft)<deviation )//拖到了凹槽附近
				{

					callback(oDragged);
				}
				else
				{
					oDragged.style.top = oDraggedTop + "px";
					oDragged.style.left = oDraggedLeft + "px";
				}
				setTimeout(function()
				{
					bTouchended = false;
				}, 50);
			}
		},false);
	}

//drag callback
	function dragInPlaceCallback(oDragged)
	{
		oDragged.style.left = aTargetPosLeft[oDragged.index] + "%";
		oDragged.style.top = aTargetPosTop[oDragged.index] + "%";
		oDragged.style.width = aTargetWidth[oDragged.index] + "px";
		oDragged.style.height = aTargetHeight[oDragged.index] + "px";
		nInPlaceNum++;

		if( nInPlaceNum === nMaterialNums )//当前蛋糕已完成
		{
			nInPlaceNum = 0;//单个蛋糕配件数清零
			if( ++nCakeIndex !== 5 )//后面还有蛋糕
			{
				setTimeout(function()//看一眼成品再切换
				{
					oCakeScroll.style.transform = "translate3d(" + nCakeIndex*-20 + "%, 0, 0)";
					oCakeScroll.style.webkitTransform = "translate3d(" + nCakeIndex*-20 + "%, 0, 0)";
				}, 400);
			}
			else//所有蛋糕已完成s
			{
				setTimeout(function()
				{
					nPlayTime = gameTimer.timeEnd();
					document.querySelector("#resultTime").textContent = nPlayTime/1000 + "秒";
					oResultPage.style.display = "block";
					oGamePage.style.display = "none";
					nCakeIndex = 0;
				}, 400);
			}
		}
	}

};


// result page ---------------------------------------------------------------------------------------------------------
(function()
{
	/*function showResultPage()
	{
		oGamePage.style.display = "none";
		oResultPage.style.display = "block";
	}*/


	//replay
	var oReplayBtn = document.querySelector("#replayBtn");
	oReplayBtn.addEventListener("touchend", function()
	{
		oResultPage.style.display = "none";
		oGamePage.style.display = "block";
		for(var i=0; i<25; i++)//维持和尺寸复原
		{
			aMaterial[i].style.width = aPreWidth[i];
			aMaterial[i].style.height = aPreHeight[i];
			aMaterial[i].style.top = aPreTop[i];
			aMaterial[i].style.left = aPreLeft[i];
		}
		oCakeScroll.style.transform = "translate3d(0, 0, 0)";
		oCakeScroll.style.webkitTransform = "translate3d(0, 0, 0)";

		secondForDisplay = 0;
		document.querySelector("#clock").textContent = "0秒";
		var oClock = document.querySelector("#clock");
		gameTimer.timeBegin( oClock );

		document.querySelector("#rank_table").style.display = "none";
		document.querySelector("#dataLoading").style.display = "block";
	}, false);


	//see rank
	var oSeeRankBtn = document.querySelector("#seeRankBtn");
	oSeeRankBtn.addEventListener("touchend", function()
	{
		sendTimeByAjax( nPlayTime );
		oResultPage.style.display = "none";
		getRankTable( );
		oRankPage.style.display = "block";
	}, false);

})();


//rank page ------------------------------------------------------------------------------------------------------------
(function()
{
	//back to result page
	document.querySelector("#rankPage .closeBtn").addEventListener("touchend", function()
	{
		oRankPage.style.display = "none";
		oResultPage.style.display = "block";
	}, false);

	//shareTip
	var oShareTip = document.querySelector("#shareTip"),
		oShareBtn = document.querySelector("#rankPage #shareBtn");
	oShareBtn.addEventListener("touchend", function()
	{
		oShareTip.style.display = "block";
	}, false);
	oRankPage.addEventListener("touchend", function(ev)
	{
		if( ev.target !== oShareTip && ev.target !== oShareBtn )
		{
			oShareTip.style.display = "none";
		}
	}, false);


})();



//get user info --------------------------------------------------------------------------------------------------------

function sendTimeByAjax( nPlayTime )
{
	var oDate = new Date();
	if( Date.parse("Jun 12, 2016") > oDate.getTime() )
	{
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function()
		{
			if (xhr.readyState == 4)
			{
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
				{
				}
				else
				{
					throw new Error( xhr.status +" when post playtime" );
				}
			}
		}, false);
		xhr.open("post", "index.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var data = "time=" + nPlayTime + "&openid=" + sOpenID + "&nickname=" + sNickname + "&headimgurl=" + sHeadimgurl;
		xhr.send(data);
	}
	else
	{
		alert('游戏分数统计已于2016年6月12日零时结束，您的成绩不再进入排名。');
	}
};

function getRankTable( )
{
	var xhr = new XMLHttpRequest();
	xhr.addEventListener('readystatechange', function()
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
			{
				document.querySelector("#dataLoading").style.display = "none";
				document.querySelector("#rank_table").style.display = "table";
				document.querySelector("#rank_table").innerHTML = xhr.responseText;
			}
			else
			{
				throw new Error( xhr.status +" when get rankTable" );
			}
		}
	}, false);
	xhr.open("get", "rankTable.php", true);

	xhr.send(null);
};



















//以下为背景音乐、背景音乐图标、提示下滑箭头和提示下滑箭头的代码--------------------------------------------------------
//如果不需要改变则不用管
//提示箭头
(function() {
	if (bSlideUpArrowOn)
	{
		var ctxArrow = oSlideUpArrow.getContext("2d");
		ctxArrow.save();
		ctxArrow.beginPath();
		ctxArrow.strokeStyle = "white";
		ctxArrow.lineWidth = 1;
		ctxArrow.moveTo(0, 7);
		ctxArrow.lineTo(8, 0);
		ctxArrow.lineTo(16, 7);
		ctxArrow.moveTo(0, 12);
		ctxArrow.lineTo(8, 5);
		ctxArrow.lineTo(16, 12);
		ctxArrow.stroke();
		ctxArrow.restore();
	}
})();
//禁止横屏
(function() {
	if (window.innerWidth > window.innerHeight) {
		oNoHorizontal.style.display = "block";
	}
	window.addEventListener("resize", function () {
		if (window.innerWidth > window.innerHeight) {
			oNoHorizontal.style.display = "block";
			oWrapper.style.display = "none";
		}
		else {
			oNoHorizontal.style.display = "none";
			oWrapper.style.display = "block";
		}
	}, false);
})();
//背景音乐
if (bBgMusciOn) {
	function bgMusicPlay() {
		oBgMusic.play();
		if (bMusicIconOn) {
			oMusicIcon.classList.toggle("musicPlayAni");
		}
	}

	function bgMusicPause() {
		oBgMusic.pause();

		if (bMusicIconOn) {
			oMusicIcon.classList.toggle("musicPlayAni");
		}
	}

	if (bMusicIconOn) {
		oMusicIcon.addEventListener("touchend", function () {
			if (oBgMusic.paused === true) {
				bgMusicPlay();
			}
			else {
				bgMusicPause();
			}
		}, false);
	}
}




//其他通用功能----------------------------------------------------------------------------------------------------------
//防止滑动过程拖动页面
document.addEventListener('touchmove',function(ev)
{
	ev.stopPropagation();
	ev.preventDefault();
});