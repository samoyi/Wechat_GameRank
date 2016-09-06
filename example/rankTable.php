
<?php
//ajax请求该文件，会返回用于排名的table的innerHTML。即只需要在HTML中写好<table>标签，然后将xhr.responseText插入该标签内。
//默认是三列十条数据，另还有最开始一行的列名。三列分别为名词、成绩和用户。默认用户列包含头像和昵称。


//参数设置区域----------------------------------------------------------------------------------------------------------

require_once('dbInfo.php');//引入数据库信息

$desc = true;//默认为降序排列。升序则改为false；

//参数设置结束。如非必要，不要修改下面的代码----------------------------------------------------------------------------





if( $dbr = @mysqli_connect(DB_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME))
{
    if( @mysqli_select_db($dbr, DB_NAME))
    {
        if( $desc )
        {
            $query = 'SELECT * FROM ' . TABLE_NAME . ' ORDER BY score DESC';
        }
        else
        {
            $query = 'SELECT * FROM ' . TABLE_NAME . ' ORDER BY score';
        }

        if( $result = @mysqli_query( $dbr, $query) )
        {
            function returnPlayScore($result)
            {
                $row = mysqli_fetch_array($result);

                return '<td>' . $row['score'] . '分</td><td>' .  '<img src="' . $row['headimgurl'] . '" /> ' . $row['nickname'] . '</td>';
            }
            echo '
                <tr>
                    <th>名次</th>
                    <th>成绩</th>
                    <th>用户</th>
                </tr>
                <tr>
                    <td>1</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>2</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>3</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>4</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>5</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>6</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>7</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>8</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>9</td>' . returnPlayScore($result) . '
                </tr>
                <tr>
                    <td>10</td>' . returnPlayScore($result) . '
                </tr>

            ';
        }
    }
}

?>