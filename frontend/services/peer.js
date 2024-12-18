class PeerService {
  constructor() {
    this.peer = null;
    if (typeof window !== "undefined") {
      this.initializePeer();
    }
  }

  initializePeer() {
    // Use a global reference to RTCPeerConnection that works across browsers
    const PeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;

    if (PeerConnection) {
      this.peer = new PeerConnection({
        iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
      });
    } else {
      console.error("WebRTC is not supported in this browser");
    }
  }

  async getAnswer(offer) {
    if (!this.peer) {
      this.initializePeer();
    }

    if (!this.peer) {
      throw new Error("Peer connection could not be established");
    }

    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(ans);
    return ans;
  }

  async getOffer() {
    if (!this.peer) {
      this.initializePeer();
    }

    if (!this.peer) {
      throw new Error("Peer connection could not be established");
    }

    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async setLocalDescription(ans) {
    if (!this.peer) {
      this.initializePeer();
    }

    if (!this.peer) {
      throw new Error("Peer connection could not be established");
    }

    await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  }
}

export default typeof window !== "undefined" ? new PeerService() : null;
