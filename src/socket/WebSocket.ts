import {Server} from "socket.io";
// 开启cors跨域
// @ts-ignore
const io = new Server(5432, {cors: true});

let userList = new Map();
let chatData = [];

io.on("connection", (socket) => {
    console.log("连接成功");

    // 消息接收发送
    socket.on("send", (e) => {
        console.log(e);
        // 接受到消息给他广播出去
        if (chatData.length > 10) {
            chatData.shift();
            chatData.push(e);
        } else {
            chatData.push(e);
        }
        socket.broadcast.emit("message", e);
    });

    // 用户登录
    socket.on("join", (e) => {
        userList.set(socket.id, e);
        console.log(userList);
        socket.emit("joined", {userName: e, id: socket.id, chatData});
        const uList = [...userList.entries()];
        // 触发广播
        socket.broadcast.emit("welcome", {
            name: e,
            uList,
        });
        // 自己展示加入的信息
        socket.emit("welcome", {
            name: e,
            uList,
        });
    });

    // 私聊消息接收发送
    socket.on("send-user", (e) => {
        const sendUserId = e.sendUserId;
        socket.to(sendUserId).emit("message-user", e);
    });

    // 用户离开
    socket.on("disconnecting", () => {
        const bool = userList.delete(socket.id);
        // 如果有用户离开，在进行广播（因为只打开页面不进入关闭页面也会触发这个事件）
        bool && socket.broadcast.emit("quit", socket.id);
        console.log("用户离开，连接断开");
    });
});
