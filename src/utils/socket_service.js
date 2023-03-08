export default class ScoketService {
  static instance = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new ScoketService();
    }
    return this.instance;
  }

  // 存储回调函数
  callBackMapping = {};

  // 记录重试的次数
  sendRetryCount = 0;
  connectRetryCount = 0;

  connected = false;
  ws = null;
  // 链接服务器的方法
  conncet() {
    if (!window.WebSocket) {
      return console.log("您的浏览器不支持webscoket");
    }
    this.ws = new WebSocket("ws://localhost:9998");
    // 连接成功的事件
    this.ws.onopen = () => {
      this.connectRetryCount = 0;
      console.log("连接成功");
      this.connected = true;
    };
    this.ws.onclose = () => {
      console.log("连接失败");
      this.connected = false;
      this.connectRetryCount++;
      setTimeout(() => {
        this.connect();
      }, 500 * this.connectRetryCount);
    };
    this.ws.onmessage = (msg) => {
      const recvData = JSON.parse(msg.data);
      const scoketType = recvData.scoketType;
      if (this.callBackMapping[scoketType]) {
        const action = recvData.action;
        if (action === "getData") {
          const realData = JSON.parse(recvData.data);
          this.callBackMapping[scoketType].call(this, realData);
        } else if (action === "fullScreen") {
        } else if (action === "themeChange") {
        }
      }
    };
  }

  // 回调函数注册
  registerCallBack(scoketType, callBack) {
    this.callBackMapping[scoketType] = callBack;
  }

  // 取消某一个回调函数
  unRegisterCallBack(scoketType) {
    this.callBackMapping[scoketType] = null;
  }
  // 发送数据的方法
  send(data) {
    if (this.connected) {
      this.sendRetryCount = 0;
      this.ws.send(JSON.stringify(data));
    } else {
      this.sendRetryCount++;
      setTimeout(() => {
        this.send(data);
      }, 500 * this.sendRetryCount);
    }
  }
}
