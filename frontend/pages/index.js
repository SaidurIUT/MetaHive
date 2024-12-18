import { useEffect, useRef, useState } from "react";

export default function Home() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const socketRef = useRef(null);

  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      {
        urls: "turn:10.158.29.39:3478?transport=udp",
        credential: "XXXXXXXXXXXXX",
        username: "XXXXXXXXXXXXXXX",
      },
    ],
  };

  useEffect(() => {
    // Initialize WebSocket only once
    if (!socketRef.current) {
      socketRef.current = new WebSocket("ws://localhost:8877/socket");

      socketRef.current.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "offer") {
          await handleOffer(message.offer);
        } else if (message.type === "answer") {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
        } else if (message.type === "candidate") {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(message.candidate)
          );
        }
      };

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({ type: "candidate", candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.ondatachannel = (event) => {
      const channel = event.channel;
      channel.onmessage = (e) => console.log("Message from peer:", e.data);
      setDataChannel(channel);
    };

    setPeerConnection(pc);

    return () => {
      // Clean up WebSocket and peer connection on unmount
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  };

  const handleOffer = async (offer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendMessage({ type: "answer", answer });
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    const channel = peerConnection.createDataChannel("chat");
    channel.onmessage = (e) => console.log("Message from peer:", e.data);
    setDataChannel(channel);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendMessage({ type: "offer", offer });
  };

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <div>
        <video ref={localVideoRef} autoPlay playsInline />
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
}
