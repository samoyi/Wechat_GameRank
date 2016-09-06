<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>title</title>
</head>
<body>

<?php
	require_once('gameRank/main.php');
?>

<table id="rank_table"></table>


</body>
<script>
	<?php
	    require_once('gameRank/passUserInfoToJS.php');
	?>
</script>

<script src="gameRank/gameRank.js"></script>

</html>