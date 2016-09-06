<meta charset="utf-8">

<?php
//查询排名信息


//参数设置区域----------------------------------------------------------------------------------------------------------

require_once('dbInfo.php');//引入数据库信息

//参数设置结束----------------------------------------------------------------------------------------------------------







if( $dbr = @mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME))
{
    if( @mysqli_select_db($dbr, DB_NAME))
    {
        include('class/getInfoFromDB.class.php');
        $DB_Get = new DB_Get( $dbr );//将数据库链接资源传入


        $lineNum = $DB_Get->allLineNum();//获得总行数

        echo '600分及以上  : ' . $DB_Get->getAboveLineNum( 'score', 600) . ' / ' . $lineNum . '<br />';
        echo '700分及以上  : ' . $DB_Get->getAboveLineNum( 'score', 700) . ' / ' . $lineNum . '<br />';
        echo '800分及以上  : ' . $DB_Get->getAboveLineNum( 'score', 800) . ' / ' . $lineNum . '<br />';
        echo '900分及以上  : ' . $DB_Get->getAboveLineNum( 'score', 900) . ' / ' . $lineNum . '<br />';

        echo '平均分 ： ' . $DB_Get->average('score') . '<br />';
        echo '最高分 ： ' .  $DB_Get->getMaxValue('score') . '<br />';;
        echo '最低分 ： ' .  $DB_Get->getMinValue('score') . '<br />';;

    }
    else
    {
        echo 'can not select mysql';
    }
}
else
{
    echo 'can not connect mysql';
}
?>