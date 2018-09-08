import * as dgram from 'dgram';

class UdpService {
    private server;

    public constructor(listen_udp : number){
        this.server = dgram.createSocket("udp4");
        this.server.on('error', this.error);
        this.server.on('message', this.message);
    }

    public error = (err : any) => {
        console.error(`server error:\n${err.stack}`);
        this.server.close();
    }

    public message = (msg: string, rinfo: any) => {
        console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    }
}

export default UdpService;