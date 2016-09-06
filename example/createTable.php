<meta charset="utf-8">
<?php
/*
 *   运行该文件共实现三个功能：
 *    1. 输出游戏用户信息授权页面地址（该地址也用于分享时的链接）
 *    2. 输出获奖用户联系信息授权页面地址（游戏活动结束后，发出该链接，供获奖用户填写联系方式）
 *    3. 连接数据库建立表格   表模式： 自定义表名(entry_id, nickname, headimgurl, score, openid)
 */

//参数设置区域----------------------------------------------------------------------------------------------------------

$appid = 'wx2e87611162aae7f4';
$redirect_uri = 'http://www.red-space.cn/test/index.php';//跳转回调地址。需要加http或者https
$getWinnerInfo_url = 'http://www.red-space.cn/test/winner.php';//获奖用户填写联系方式的页面

require_once('dbInfo.php');//引入数据库信息

//参数设置结束。如非必要，不要修改下面的代码----------------------------------------------------------------------------



echo '用户信息授权页面链接 : <br />' . 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $appid . '&redirect_uri=' . urlencode($redirect_uri) . '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
echo '<br /><br />';
echo '中奖用户验证并填写个人信息页面的授权页面地址 ： <br />' . 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $appid . '&redirect_uri=' . urlencode($getWinnerInfo_url) . '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

echo '<br /><br /><br />';


if( $dbr = @mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME))
{
	if( @mysqli_select_db( $dbr , DB_NAME ))
	{
		$query = 'CREATE TABLE ' . TABLE_NAME . '
		(
			entry_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
			nickname TEXT NOT NULL,
			headimgurl TEXT NOT NULL,
			score INT NOT NULL,
			openid TEXT NOT NULL
		)';
		if( mysqli_query( $dbr, $query))
		{
			echo 'the table has been created ';
		}
		else
		{
			echo 'could not create the table';
		}
	}
	else
	{
		echo 'could not select  database';
	}
	mysqli_close($dbr);
}
else
{
	echo 'could not connect to database';
}
?>
