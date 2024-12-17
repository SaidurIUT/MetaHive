"use client";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client as StompClient } from "@stomp/stompjs";

export default function WebRTCPage() {
  const [localId, setLocalId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [localPeer, setLocalPeer] = useState(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  const initializePeerConnection = () => {
    // Close existing peer connection if active
    if (localPeer && localPeer.signalingState !== "closed") {
      localPeer.close();
    }

    const peerConnection = new RTCPeerConnection(iceServers);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage("/app/candidate", {
          toUser: remoteId,
          fromUser: localId,
          sessionId: sessionId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Add existing tracks if stream is available
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    setLocalPeer(peerConnection);
  };

  useEffect(() => {
    // Initialize media devices
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) =>
        console.error("Error accessing media devices: ", error)
      );

    initializePeerConnection();

    return () => {
      if (localPeer) {
        localPeer.close();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localId]);

  const connectToServer = () => {
    const socket = new SockJS("http://localhost:8877/websocket");
    const stompClient = new StompClient({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("Connected: ", frame);

        stompClient.subscribe(`/user/${localId}/topic/call`, handleCall);
        stompClient.subscribe(`/user/${localId}/topic/offer`, handleOffer);
        stompClient.subscribe(`/user/${localId}/topic/answer`, handleAnswer);
        stompClient.subscribe(
          `/user/${localId}/topic/candidate`,
          handleCandidate
        );
      },
      onStompError: (frame) => {
        console.error("Broker reported error: ", frame);
      },
    });

    stompClient.activate();
    setStompClient(stompClient);
  };

  const handleCall = (message) => {
    if (!localPeer || localPeer.signalingState === "closed") {
      initializePeerConnection();
    }

    const { callFrom, sessionId } = JSON.parse(message.body);
    console.log("Incoming call from: ", callFrom, "Session ID: ", sessionId);
    setSessionId(sessionId);

    localStream.getTracks().forEach((track) => {
      const senderExists = localPeer
        .getSenders()
        .some((sender) => sender.track === track);
      if (!senderExists) {
        localPeer.addTrack(track, localStream);
      }
    });

    localPeer.createOffer().then((description) => {
      localPeer.setLocalDescription(description);
      sendMessage("/app/offer", {
        toUser: callFrom,
        fromUser: localId,
        sessionId: sessionId,
        offer: description,
      });
    });
  };

  const handleOffer = (message) => {
    const { offer, sessionId: incomingSessionId } = JSON.parse(message.body);
    if (incomingSessionId !== sessionId) {
      console.warn("Session mismatch. Ignoring offer.");
      return;
    }

    // Ensure localPeer is initialized
    if (!localPeer || localPeer.signalingState === "closed") {
      initializePeerConnection();
    }

    // Set remote description
    localPeer
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => {
        // Only add tracks after setting remote description
        localStream.getTracks().forEach((track) => {
          const senderExists = localPeer
            .getSenders()
            .some((sender) => sender.track === track);
          if (!senderExists) {
            localPeer.addTrack(track, localStream);
          }
        });

        // Create an answer
        return localPeer.createAnswer();
      })
      .then((description) => {
        return localPeer.setLocalDescription(description);
      })
      .then(() => {
        sendMessage("/app/answer", {
          toUser: remoteId,
          fromUser: localId,
          sessionId: sessionId,
          answer: localPeer.localDescription,
        });
      })
      .catch((error) => {
        console.error("Error handling offer:", error);
      });
  };

  const handleAnswer = (message) => {
    const { answer, sessionId: incomingSessionId } = JSON.parse(message.body);

    if (incomingSessionId !== sessionId) {
      console.warn("Session mismatch. Ignoring answer.");
      return;
    }

    localPeer.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = (message) => {
    const { candidate, sessionId: incomingSessionId } = JSON.parse(
      message.body
    );

    // Reinitialize peer connection if it's closed
    if (!localPeer || localPeer.signalingState === "closed") {
      initializePeerConnection();

      // Re-add tracks if stream exists
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          localPeer.addTrack(track, localStream);
        });
      }
    }

    if (incomingSessionId !== sessionId) {
      console.warn("Session mismatch. Ignoring candidate.");
      return;
    }

    // Use try-catch to handle potential errors
    try {
      localPeer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  };
  const sendMessage = (destination, message) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
    }
  };

  const initiateCall = () => {
    if (!remoteId || !localId) {
      alert("Please enter both your ID and the remote user's ID.");
      return;
    }

    sendMessage("/app/call", {
      callTo: remoteId,
      callFrom: localId,
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>WebRTC Video Call</h1>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: "400px", height: "300px", backgroundColor: "black" }}
        ></video>
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ width: "400px", height: "300px", backgroundColor: "black" }}
        ></video>
      </div>
      <fieldset>
        <input
          type="text"
          placeholder="Enter Your ID"
          value={localId}
          onChange={(e) => setLocalId(e.target.value)}
        />
        <button onClick={connectToServer}>Connect</button>
      </fieldset>
      <fieldset>
        <input
          type="text"
          placeholder="Enter Remote ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
        <button onClick={initiateCall}>Call</button>
      </fieldset>
    </div>
  );
}
