# 微信游戏排名

## 功能
保存用户昵称、头像和游戏成绩并输出表格显示排名

## 使用步骤
1. 在`/gameRank/initInfo.php`中设定相关信息。  
（`$servername`中填写的域名可能和实际获取到的差个`www.`）
2. 套用这里的`index.php`作为回调页面，在其中编写当前项目代码
3. 运行`/gameRank/createTable.php`，获得经过编码的授权页面地址及创建数据库表用来存储
用户信息及游戏成绩
4. 游戏结束后调用`/gameRank/gameRank.js`中的`sendScoreByAjax`并将游戏分数作为参数，
发送到数据库
5. 各参数根据情况可作必要修改
6. 确保`index.php`放在网页授权域名（或路径）之内。如果在之外，则需要先在网页授权域名
（或路径）之内获取`code`然后传到该`index.php`
7. 设定计算排名的截止时间  在`/gameRank/gameRank.js`改写`Date.parse`参数中的时间，
作为截止时间。同时在下面`alert`的参数里填写过期的提示信息。

## 注意事项
* [接口文档：微信网页授权](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN)
（直接点击似乎会发生错误，重进该链接即可）
* `gameRank`文件夹和`index.php`(回调页面) 放在同一个目录。如果需要改文件夹名字，同时
需要改`/gameRank/gameRank.js`中的一处“gameRank”
* 回调页面最好直接套用这里的`index.php`，否则需要做几处修改
* 设置网页授权域名：微信公众号——开发——接口权限——网页授权
* 测试`example`需要填写`initInfo.php`中的信息
