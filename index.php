<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>title</title>
</head>
<?php
	require_once('gameRank/main.php');
?>
<script>
	<?php
	    require_once('gameRank/passUserInfoToJS.php');
	?>
	if( !sOpenID ) // 如果不是从授权页来的，则跳转到授权页
	{
		location.replace("运行createTable.php时生成的授权页地址");
	}
</script>
<body>

<table id="rank_table"></table>

</body>


<script src="gameRank/gameRank.js"></script>

</html>