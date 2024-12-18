import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; // Replace with your backend's WebSocket URL

class SocketService {
  constructor() {
    this.stompClient = null;
    this.isConnected = false;
  }

  connect(onMessageReceived, onError) {
    if (this.isConnected) return;

    const socket = new SockJS(SOCKET_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");
        this.isConnected = true;
      },
      onStompError: (frame) => {
        console.error("WebSocket error: ", frame.headers["message"]);
        onError && onError(frame.headers["message"]);
      },
    });

    this.stompClient.onUnhandledMessage = (message) => {
      const body = JSON.parse(message.body);
      onMessageReceived(body);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.isConnected = false;
    }
  }

  send(destination, payload) {
    if (this.isConnected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(payload),
      });
    } else {
      console.error("WebSocket is not connected.");
    }
  }
}

const socketService = new SocketService();
export default socketService;
