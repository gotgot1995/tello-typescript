import * as dgram from 'dgram';
import AppConfig from '../tools/AppConfig';

class UdpService {
    private static instance = null;

    private server;

    private client_socket;

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

        this.client_socket = dgram.createSocket('udp4');
        this.client_socket.bind();
        this.client_socket.on('message', (msg) => console.log(`resp: ${msg}`));
    }

    public static getInstance = () : UdpService => {
        return UdpService.instance || new UdpService();
    }

    private onServerError = (err : any) => {
        console.error(`server error:\n${err.stack}`);
        this.server.close();
    }

    private onMessage = (msg: string, rinfo: any) => {
        // console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    }

    public listen = () => {
        this.server.bind(AppConfig.LISTEN_UDP_PORT);
    }

    public close = () => {
        this.server.close();
    }

    public send = (msg : string, addr : string, port : number) => {
        this.client_socket.send(Buffer.from(`${msg}`), port, addr, (err) => {
            if(err) {
                console.error(err);
            }
        });
    }
}

export default UdpService;