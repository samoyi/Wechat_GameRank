<meta charset="utf-8">
<?php
/*
 *   运行该文件共实现三个功能：
 *    1. 输出游戏用户信息授权页面地址（该地址也用于分享时的链接）
 *    2. 连接数据库建立表格   表模式： 自定义表名(entry_id, nickname, headimgurl, score, openid)
 */


require_once('initInfo.php');



echo '用户信息授权页面链接 : <br />' . 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . APPID . '&redirect_uri=' . urlencode($redirect_uri) . '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

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
