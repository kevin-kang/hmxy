评论接口
http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitycomment 
             * @param array $data 数据
             *  [
             *      'openid' => '用户openid',
             *      'aid' => '给谁评论',
             *      'comment' => '评论内容',
             *      'nickname' => '评论者的姓名',
             *  ]
1000 添加成功
1001 回复内为空
1002 参数错误
1003 回复内容超过100字符

点赞接口
http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityzan 
             * 点赞接口
             * @param array $data 数据
             *  [
             *      'openid' => '用户openid',
             *      'aid' => '被投票人的id',
             *      'nickname' => '点赞者的姓名',
             *  ]
返回码：
1000 点赞成功
1001 重复点赞
1002 参数错误



记录手机号的接口
http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitymobile
             * @param array $data 数据
             *  [
             *      'openid' => '用户openid',
             *      'mobile' => 'mobile',
             *  ]
get方式
返回码：
1000 添加成功
1001 手机格式不正确
1002参数错误
2000 已经填写过手机号