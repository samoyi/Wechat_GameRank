* [接口文档：微信网页授权](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN)（直接点击似乎会发生错误，重进该链接即可）
* gameRank文件夹和index.php(回调页面)放在同一个目录。如果需要改文件夹名字，同时需要改gameRank.js中的一处“gameRank”
* 回调页面最好直接套用这里的index.php，否则需要做几处修改
* 测试example需要填写initInfo.php中的信息


## 使用步骤：
1. 在initInfo.php中设定相关信息信息
2. 套用这里的index.php作为回调页面，在其中编写当前项目代码
3. 运行 createTable.php ，获得经过编码的授权页面地址及创建数据库表用来存储用户信息及游戏成绩
4. 在gameRank.js设定发送游戏分数的事件
5. 各参数根据情况可作必要修改



