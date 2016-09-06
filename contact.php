
<meta charset="utf-8">

<pre>
<?php

/*
这里使用巧乐美的账号
1. 回调域名是红房子的 “www.red-space.cn”
2. 跳转回调redirect_uri是“http://www.red-space.cn/jiezongzi/contact.php”
3. 获得用户授权的地址为：https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e87611162aae7f4&redirect_uri=http%3A%2F%2Fwww.red-space.cn%2Fjiezongzi%2Fcontact.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
4. Scope为snsapi_userinfo


*/
require_once('dbInfo.php');//引入数据库信息
require_once('accountInfo.php');//引入公众账号信息

define("CODE", $_GET['code']);



//参数设置区域----------------------------------------------------------------------------------------------------------

$winnerNum = 2;//前几名得奖



//参数设置结束。如非必要，不要修改下面的代码----------------------------------------------------------------------------



$userInfo = getUserInfo();
function getUserInfo()
{
    $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' .APPID . '&secret=' . APPSECRET . '&code=' . CODE . '&grant_type=authorization_code';
    $jsoninfo = json_decode(httpGet($url), true);
    $urlToGetUserInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $jsoninfo["access_token"] . '&openid=' . $jsoninfo["openid"] . '&lang=zh_CN';
    $userJsonInfo = json_decode(httpGet($urlToGetUserInfo), true);
    return $userJsonInfo;
}
function httpGet($url)//发送GET请求
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}
if( $dbr = @mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME))
{
	if( @mysqli_select_db( $dbr , DB_NAME ))
	{
	    if( $desc )
        {
            $queryRank = 'SELECT * FROM ' . TABLE_NAME . ' ORDER BY score DESC';
        }
        else
        {
            $queryRank = 'SELECT * FROM ' . TABLE_NAME . ' ORDER BY score';
        }
        if( $result = @mysqli_query( $dbr, $queryRank) )
        {
            $rank = array();
            for($i=0; $i<$winnerNum; $i++)
            {
                $row = mysqli_fetch_array($result);
                $rank[$i] = $row['openid'];
            }
            if( in_array( $userInfo['openid'], $rank ))
            {
                echo '可以输入联系方式';
            }
            else
            {
                echo '你没进前' . $winnerNum . '名';
            }
        }
    }
}
?>
</pre>
   