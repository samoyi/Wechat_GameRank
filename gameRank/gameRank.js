//本页包含两个函数。一个用来向数据库发送游戏分数，另一个用来从数据库请求排名前几位的信息
//sendScoreByAjax函数中的请求地址为'index.php'，如果需要则修改
//sendScoreByAjax实际代码有执行时限，即超过游戏活动时间就不在提交，并且在用户提交时给出提醒。时限和提醒在函数内部具体修改
//getRankTable要将返回的文本插入到<table>的innerHTML,这里<table>使用的id是rank_table




// 游戏结束后调用sendScoreByAjax并传入分数

function sendScoreByAjax( nPlayScore )
{
	var oDate = new Date();
	if( Date.parse("10 Sep 2016 18:00:00") > oDate.getTime() )//结束日期（当日零点）
	{
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function()
		{
			if (xhr.readyState == 4)
			{
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
				{
					getRankTable();//获取排名表格。
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
		alert('游戏分数统计已于2016年9月10日18时结束，您的成绩不再进入排名。');
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
				document.querySelector("#rank_table").innerHTML = xhr.responseText; // 将表格内容放进table标签中
			}
			else
			{
				throw new Error( xhr.status +" when get rankTable" );
			}
		}
	}, false);
	xhr.open("get", "gameRank/rankTable.php", true);
	xhr.send(null);
}
