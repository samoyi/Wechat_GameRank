接口文档： https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN


使用步骤：
一. 在accountInfo.php中设定公众号信息
二. 在dbInfo.php中设定数据库信息
三. 将main.php引入授权页面回调页面的上部
四. 将passUserInfoToJS.php引入授权页面回调页面你的js文件引用之前的script标签中
五. 确保获得用户授权之后的回调页面以及获得获奖用户信息的页面在授权回调页面域名之下。
六. 默认回调页面和rankTable.php在同一级，如果修改位置确保其路径正确。
七. 运行 createTable.php ，获得经过编码的授权页面地址及创建数据库表用来存储用户信息及游戏成绩
八. 各参数根据情况可作必要修改


活动结束后联系得奖用户：
由于微信无法通过该openid主动联系和验证用户，所以需要提供一个页面来供中奖用户填写联系方式
contact.php文件对于任何用户都可访问，但可根据限定排名显示不同内容，即只对进入得奖排名的用户提供输入联系方式功能。


query.php可通过调用class目录下的getInfoFromDB.class.php文件类并实例化DB_Get类来进行游戏数据查询，因每次业务逻辑不通，没有统一接口


