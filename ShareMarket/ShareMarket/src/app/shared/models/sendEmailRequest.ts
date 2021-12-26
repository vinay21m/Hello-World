export class SendEmailRequest {
    outboundEmailServerID! : string;
    from!: string;
    to!: string;
    cc!: string;
    bcc!: string;
    subject!: string;
    body!:string;   
}