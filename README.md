# 微信游戏排名

## 功能
保存用户昵称、头像和游戏成绩并输出表格显示排名

## 使用步骤
1. 在 initInfo.php 中设定相关信息
2. 套用这里的 index.php 作为回调页面，在其中编写当前项目代码
3. 运行 createTable.php ，获得经过编码的授权页面地址及创建数据库表用来存储用户信息及游戏成绩
4. 游戏结束后调用 gameRank.js 中的sendScoreByAjax并将游戏分数作为参数，发送到数据库
5. 各参数根据情况可作必要修改

## 注意事项
* [接口文档：微信网页授权](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN)（直接点击似乎会发生错误，重进该链接即可）
* gameRank文件夹和 index.php(回调页面) 放在同一个目录。如果需要改文件夹名字，同时需要改 gameRank.js 中的一处“gameRank”
* 回调页面最好直接套用这里的 index.php ，否则需要做几处修改
* 测试 example 需要填写 initInfo.php 中的信息


