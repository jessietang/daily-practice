/**
 * Created by jessietang on 2017/7/30.
 */

var wsUri ="ws://echo.websocket.org/";

function init() {
    start();
}

function start() {
    $('.connect-list2').addClass('connect-red');
    $('.connect-list4').addClass('connect-red');

    websocket = new WebSocket(wsUri);

    //��Browser��WebSocketServer���ӳɹ��󣬻ᴥ��onopen��Ϣ
    websocket.onopen = function(evt) {
        websocket.send("WebSocket rocks");
    };

    // ��Browser���յ�WebSocketServer���͹���������ʱ��
    // �ͻᴥ��onmessage��Ϣ������evt�а���server�������������
    websocket.onmessage = function(evt) {
        var spanHtml = '<span style="color: blue;">RESPONSE: '+ evt.data+'</span>';
    };

    // ��Browser���յ�WebSocketServer�˷��͵Ĺر���������ʱ���ͻᴥ��onclose��Ϣ
    websocket.onclose = function(evt) {
        console.error("ws�رգ�" + new Date().toLocaleString());
        onClose(evt)
    };

    // �������ʧ�ܣ����͡���������ʧ�ܻ��ߴ������ݳ��ִ���browser�ᴥ��onerror��Ϣ
    websocket.onerror = function(evt) {
        console.error("ws����" + new Date().toLocaleString());
    };
}

//�������ڹر��¼��������ڹر�ʱ������ȥ�ر�websocket���ӣ�
// ��ֹ���ӻ�û�Ͽ��͹رմ��ڣ�server�˻����쳣��
window.onbeforeunload = function () {
    closeWebSocket();
};

//�ر�WebSocket����
function closeWebSocket() {
    websocket.close();
}