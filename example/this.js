//本页包含两个函数。一个用来向数据库发送游戏分数，另一个用来从数据库请求排名前几位的信息
//sendScoreByAjax函数中的请求地址为'index.php'，如果需要则修改
//sendScoreByAjax实际代码有执行时限，即超过游戏活动时间就不在提交，并且在用户提交时给出提醒。时限和提醒在函数内部具体修改
//getRankTable要将返回的文本插入到<table>的innerHTML,这里<table>使用的id是rank_table

sendScoreByAjax(9 );//发送游戏分数，参数为分数

setTimeout(function()
{
	getRankTable();//获取排名表格。该函数应在发送函数调用之后几秒再调用，为了等待将本次成绩发送到数据库之后再读取数据库。
}, 2000)




function sendScoreByAjax( nPlayScore )
{
	var oDate = new Date();
	if( Date.parse("Jun 12, 2026") > oDate.getTime() )//结束日期（当日零点）
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
					throw new Error( xhr.status +" when post score" );
				}
			}
		}, false);
		xhr.open("post", "index.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var data = "score=" + nPlayScore + "&openid=" + sOpenID + "&nickname=" + sNickname + "&headimgurl=" + sHeadimgurl;
		xhr.send(data);
	}
	else//如果超过了该日期
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
}
