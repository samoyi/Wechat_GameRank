<?php
//实例化该类的时候需要传入数据库链接资源作为参数
class DB_Get
{
    private $dbr;
    public function __construct( $dbr )
    {
        $this->dbr = $dbr;
    }

    public function getRowsByValue($column, $value)//找到传入分数对应的行。返回的是所有对应行的数组
    {
        $query = 'SELECT * FROM ' . TABLE_NAME . ' WHERE ' . $column . '=' . $value;
        $result = mysqli_query($this->dbr, $query);
        $rows = array();
        while( $row = mysqli_fetch_array( $result ) )
        {
            $rows[] = $row;
        }
        return  $rows;
    }

    public function getMaxRow($column)//某列最大值的所在行
    {
        $query = 'SELECT * FROM ' . TABLE_NAME . ' WHERE ' . $column . '=' . $this->getMaxValue($column);
        $result = mysqli_query( $this->dbr, $query );
        $row = mysqli_fetch_array($result);
        return  $row;
    }
    public function getMaxValue($column)//某列最大值
    {
        $query = mysqli_query($this->dbr, 'SELECT MAX(' . $column . ') FROM ' . TABLE_NAME);
        $row = mysqli_fetch_row( $query );
        return $row[0];
    }
    public function getMinRow($column)//某列最小值的所在行
    {
        $query = 'SELECT * FROM ' . TABLE_NAME . ' WHERE ' . $column . '=' . $this->getMinValue($column);
        $result = mysqli_query( $this->dbr, $query );
        $row = mysqli_fetch_array($result);
        return  $row;
    }
    public function getMinValue($column)//某列最小值
    {
        $query = mysqli_query($this->dbr, 'SELECT MIN(' . $column . ') FROM ' . TABLE_NAME);
        $row = mysqli_fetch_row( $query );
        return $row[0];
    }

    public function average( $column )//输出某一列平均值
    {
        $query = mysqli_query($this->dbr, 'SELECT AVG(' . $column . ') AS average FROM ' . TABLE_NAME);
        $row = mysqli_fetch_array($query);
        return $row['average'];
    }

    public function getAboveLineNum( $column, $value, $closed=true )//输出某一列的值大于或者大于等于某个值的列数。例如及格的人数。第三个可选参数是否闭区间
    {
        if( $closed )
        {
            $query = 'SELECT * FROM ' . TABLE_NAME . ' WHERE ' . $column . '>=' . $value;
        }
        else
        {
             $query = 'SELECT * FROM ' . TABLE_NAME . ' WHERE ' . $column . '>' . $value;
        }
        if( $result = mysqli_query($this->dbr, $query) )
        {
            $overlineNum = 0;
            while($row = mysqli_fetch_array($result))
            {
                $overlineNum++;
            }
            return  $overlineNum;
        }
        else
        {
            echo 'hehe';
        }
    }

    //获得总行数
    public function allLineNum()
    {
        $query = 'SELECT *  FROM ' . TABLE_NAME;
        return mysqli_num_rows(mysqli_query($this->dbr, $query) );
    }
}

?>