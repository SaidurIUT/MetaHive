import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useSocket } from "../../components/SocketProvider.js";

export default function RoomPage() {
  const socket = useSocket();
  const router = useRouter();
  const { roomId } = router.query;

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    peer.peer.addEventListener("track", (ev) => {
      setRemoteStream(ev.streams[0]);
    });
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Room {roomId}</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <ReactPlayer
          playing
          muted
          height="200px"
          width="300px"
          url={myStream}
        />
      )}
      {remoteStream && (
        <ReactPlayer playing height="200px" width="300px" url={remoteStream} />
      )}
    </div>
  );
}
