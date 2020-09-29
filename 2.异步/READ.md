## 异步实现方式 callback(setTimeout) Promise Generator Async/Await EventEmmiter

# callback

# Promise
[Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作]

# Generator
[通过yield将函数执行流挂起]
function --> function*称为Generator

# Async/Await

# EventEmmiter -- 事件监听
[异步最大的问题是不确定什么时候结束，事件监听通过发布订阅emit-on实现]
# EventEmmiter源码
```
class EventEmitter {
    constructor() {
        this.handler = {};
    }
    on(eventName, callback) {
        if (!this.handles) {
            this.handles = {};
        }
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(callback);
    }
    emit(eventName, ...arg) {
        if (this.handles[eventName]) {
            for (var i = 0; i < this.handles[eventName].length; i++) {
                this.handles[eventName][i](...arg);
            }
        }

    }
}
```