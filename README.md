接口文档： https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN


## 使用步骤：
1. 在accountInfo.php中设定公众号信息
2. 在dbInfo.php中设定数据库信息
3. 将main.php引入授权页面回调页面的上部
4. 将passUserInfoToJS.php引入授权页面回调页面你的js文件引用之前的script标签中
5. 确保获得用户授权之后的回调页面以及获得获奖用户信息的页面在授权回调页面域名之下。
6. 默认回调页面和rankTable.php在同一级，如果修改位置确保其路径正确。
7. 运行 createTable.php ，获得经过编码的授权页面地址及创建数据库表用来存储用户信息及游戏成绩
8. 各参数根据情况可作必要修改



