
<?php
/*
    该页代码用于获得用户信息，以及处理当次游戏成绩的数据库提交。
    将该文件引入回调文件的上部
*/
require_once('accountInfo.php');//引入公众号信息
require_once('dbInfo.php');//引入数据库信息

//参数设置区域----------------------------------------------------------------------------------------------------------

//当前运行脚本所在服务器主机的名字。 $_SERVER['SERVER_NAME']的结果不一定准确，需要查看$_SERVER["HTTP_REFERER"]来确定
$servername = 'www.red-space.cn';


//参数设置结束。如非必要，不要修改下面的代码----------------------------------------------------------------------------




define("CODE", $_GET['code']);
$userInfo = getUserInfo();
if( isset($_POST["score"]) )
{
    $sub_from = $_SERVER["HTTP_REFERER"];//链接到当前页面的前一页面的 URL 地址
    $sub_len = strlen($servername);//统计服务器的名字长度。
    $checkfrom = substr($sub_from,7,$sub_len);//截取提交到前一页面的url，不包含http:://的部分。
    if( $checkfrom ==  $servername )//阻止跨域提交
    {
        $score = $_POST["score"];
        $openid = $_POST["openid"];
        $nickname = $_POST["nickname"];
        $headimgurl = $_POST["headimgurl"];

        $nickname = urlencode($nickname);
        if( $openid !== 'null' )
        {
            if( $dbr = @mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME))
            {
                if( @mysqli_select_db($dbr, DB_NAME))
                {
                    $old = mysqli_query( $dbr, "SELECT * FROM " . TABLE_NAME . " WHERE openid='$openid'" );//查找此ID之前的记录
                    $row = mysqli_fetch_array($old);

                    if( $row['score'] < $score )//新的分数更高的情况
                    {
                        //如果降序排列（即$desc为true），即分数越高越好，则重写为真
                        //如果升序排列（即$desc为false），即分数越低越好，则重写为假
                        $isRewrite = $desc;
                    }
                    elseif( $row['score'] > $score )
                    {
                        $isRewrite = !$desc;
                    }
                    if( !$row['score'])//原来没有记录则写入
                    {
                        $query1 = "INSERT INTO " . TABLE_NAME . " (openid, score, nickname, headimgurl) VALUES ('$openid', '$score', '$nickname', '$headimgurl');";
                       @mysqli_query( $dbr, $query1);
                    }
                    elseif( $isRewrite)//是否要重写
                    {
                        $query2 = "INSERT INTO " . TABLE_NAME . " (openid, score, nickname, headimgurl) VALUES ('$openid', '$score', '$nickname', '$headimgurl');";
                        $query2 = "UPDATE " . TABLE_NAME . " SET score = '$score'  WHERE openid = '$openid'";
                        @mysqli_query( $dbr, $query2);
                    }
                }
            }
        }
    }
}
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

?>
   