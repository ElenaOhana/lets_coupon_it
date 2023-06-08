export enum ClientStatus {
    ACTIVE,
    INACTIVE
}

export class CompanyModel{
    public id?:number;
    public name?:string;
    public email?:string;
    public password?:string;
    public clientStatus:ClientStatus;

    public constructor(id?:number, name?:string, email?:string, password?:string, clientStatus?:ClientStatus){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.clientStatus = clientStatus;
    }
}
