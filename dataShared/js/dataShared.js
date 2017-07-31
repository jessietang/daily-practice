/**
 * Created by jessietang on 2017/7/30.
 */

var wsUri ="ws://echo.websocket.org/";

function init() {
    start();
}

function start() {
    $('.connect-list1').addClass('connect-red');

    websocket = new WebSocket(wsUri);

    //当Browser和WebSocketServer连接成功后，会触发onopen消息
    websocket.onopen = function(evt) {
        websocket.send("WebSocket rocks");
    };

    // 当Browser接收到WebSocketServer发送过来的数据时，
    // 就会触发onmessage消息，参数evt中包含server传输过来的数据
    websocket.onmessage = function(evt) {
        var data = evt.data;
        data = "s1:正常;s2:异常;s3:正常;s4:异常;s5:正常;";

        var spanHtml = '<span style="color: blue;">RESPONSE: '+ evt.data+'</span>';
    };

    // 当Browser接收到WebSocketServer端发送的关闭连接请求时，就会触发onclose消息
    websocket.onclose = function(evt) {
        console.error("ws关闭：" + new Date().toLocaleString());
        onClose(evt)
    };

    // 如果连接失败，发送、接收数据失败或者处理数据出现错误，browser会触发onerror消息
    websocket.onerror = function(evt) {
        console.error("ws错误：" + new Date().toLocaleString());
    };
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，
// 防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}