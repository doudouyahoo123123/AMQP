const container = require('rhea');
//获取当前时间戳
var timestamp = Math.round(new Date());

//建立连接。
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': 'a160ff9245.iot-amqps.cn-north-4.myhuaweicloud.com',
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 8000,
    //userName组装方法，请参见AMQP客户端接入说明文档。
    'username': 'accessKey=xGwAz6Qg|timestamp=' + timestamp + '|',
    //accessCode，请参见AMQP客户端接入说明文档。
    'password': '7PNDsxiQm0U7WcEapxIUUk5po5yx49tH',
    'saslMechannisms': 'PLAIN',
    'rejectUnauthorized': false,
    'hostname': 'default',
});

//创建Receiver连接。 队列名，可以使用默认队列DefaultQueue
var receiver = connection.open_receiver('doudou_test');

//接收云端推送消息的回调函数。
container.on('message', function (context) {
    var msg = context.message;
    var content = msg.body;
    console.log(content);
    //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept();
});