<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>title</title>
<style>
#rank_table {
  height: 60%;
  color: black;
  width: 94%; 
  font-size: 0.75em;
}
#rank_table tr {
  width: 100%;
}
#rank_table tr th
{
  background-color: white;
  color: #f69bc8;
}
#rank_table tr th:nth-child(1), #rank_table tr td:nth-child(1) {
  width: 20%;
}
#rank_table tr th:nth-child(2), #rank_table tr td:nth-child(2) {
  width: 25%;
}
#rank_table tr th:nth-child(3), #rank_table tr td:nth-child(3) {
  table-layout: fixed;
  word-wrap: break-word;
  word-break: break-all;
  width: 55%;
}
#rank_table tr td:nth-child(3) {
  vertical-align: middle;
  padding: 0;
}
#rank_table tr td:nth-child(3) img {
  height: 20px;
  vertical-align: middle;
}
#rank_table tr:nth-child(odd) {
  background-color: #f16bae;
}
#rank_table tr:nth-child(even) {
  background-color: #f69bc8;
}
#rank_table tr:first-child {
  background-color: #a46e2b;
}
#rank_table th, #rank_table td {
  text-align: center;
  vertical-align: middle;
  padding: 2% 0;
}
</style>
</head>
<body>

<?php
	require_once('gameRank/main.php');
?>

<table id="rank_table"></table>


<input id="gameRankTestScore" type="text" placeholder="输入测试分数" />
<input id="gameRankTestSubmit" type="button" value="提交测试分数" />

</body>
<script>
	<?php
	    require_once('gameRank/passUserInfoToJS.php');
	?>
</script>

<script src="gameRank/gameRank.js"></script>

</html>