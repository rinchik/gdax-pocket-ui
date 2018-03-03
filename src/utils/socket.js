
class Socket {

    constructor(address) {
        this.socket = io.connect(address);
        return this;
    }

    addEvent(event, handler) {
        this.socket.on(event, handler);
    }
}

export default Socket;