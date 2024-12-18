import { useEffect, useState } from "react";

let peerConnection;
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // STUN Server
  ],
};

const VideoCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Setup WebSocket Connection
    const conn = new WebSocket("ws://localhost:8080/socket");
    setSocket(conn);

    conn.onmessage = (message) => {
      const data = JSON.parse(message.data);
      handleSignalingData(data);
    };

    startLocalStream();
    setupPeerConnection();
  }, []);

  const startLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
  };

  const setupPeerConnection = () => {
    peerConnection = new RTCPeerConnection(config);

    // Send ICE candidates to signaling server
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendToServer({ type: "candidate", candidate: event.candidate });
      }
    };

    // Add remote stream
    peerConnection.ontrack = (event) => {
      setRemoteStream((prev) => {
        const newStream = prev;
        newStream.addTrack(event.track);
        return newStream;
      });
    };

    // Add local tracks to peerConnection
    localStream
      ?.getTracks()
      .forEach((track) => peerConnection.addTrack(track, localStream));
  };

  const handleSignalingData = (data) => {
    switch (data.type) {
      case "offer":
        handleOffer(data.offer);
        break;
      case "answer":
        peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
        break;
      case "candidate":
        peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        break;
    }
  };

  const sendToServer = (message) => {
    socket.send(JSON.stringify(message));
  };

  const createOffer = () => {
    peerConnection.createOffer().then((offer) => {
      peerConnection.setLocalDescription(offer);
      sendToServer({ type: "offer", offer });
    });
  };

  const handleOffer = (offer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer().then((answer) => {
      peerConnection.setLocalDescription(answer);
      sendToServer({ type: "answer", answer });
    });
  };

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <div>
        <video
          autoPlay
          playsInline
          muted
          ref={(video) => video && (video.srcObject = localStream)}
        />
        <video
          autoPlay
          playsInline
          ref={(video) => video && (video.srcObject = remoteStream)}
        />
      </div>
      <button onClick={createOffer}>Start Call</button>
    </div>
  );
};

export default VideoCall;
