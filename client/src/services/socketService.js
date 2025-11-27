import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
        this.connected = false;
    }

    connect(userId) {
        if (!this.socket || !this.connected) {
            this.socket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling'],
            });

            this.socket.on('connect', () => {
                console.log('✅ Socket connected:', this.socket.id);
                this.connected = true;
                if (userId) {
                    this.socket.emit('join', userId);
                }
            });

            this.socket.on('disconnect', () => {
                console.log('❌ Socket disconnected');
                this.connected = false;
            });

            this.socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
                this.connected = false;
            });
        }

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.connected = false;
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }

    emit(event, data) {
        if (this.socket && this.connected) {
            this.socket.emit(event, data);
        }
    }

    isConnected() {
        return this.connected && this.socket?.connected;
    }
}

export default new SocketService();
