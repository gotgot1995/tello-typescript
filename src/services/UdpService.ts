import * as dgram from 'dgram';

class UdpService {
    private static instance = null;

    private server;
    private local_port = 9000;
    // private tello_port = 8889;
    private server_socket;

    private constructor(){
        if (UdpService.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this.server = dgram.createSocket("udp4");
        this.server.on('error', this.onServerError);
        this.server.on('message', this.onMessage);
        this.server.on('listening', () => {
            const addr = this.server.address();
            console.log(`UDP server listening on ${addr.address}:${addr.port}`);
        });
        this.server_socket = dgram.createSocket('udp4');
    }

    public static getInstance = () : UdpService => {
        return UdpService.instance || new UdpService();
    }

    private onServerError = (err : any) => {
        console.error(`server error:\n${err.stack}`);
        this.server.close();
    }

    private onMessage = (msg: string, rinfo: any) => {
        console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    }

    public listen = () => {
        this.server.bind(this.local_port);
    }

    public close = () => {
        this.server.close();
    }

    public send = (msg : string, addr : string, port : number) => {
        this.server_socket.send(Buffer.from(`Echo: ${msg}`), port, addr, (err) => {
            if(err !== null && err !== undefined)
                console.log(err);
        });
    }
}

export default UdpService;