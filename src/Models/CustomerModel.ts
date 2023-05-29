export enum ClientStatus {
    ACTIVE ='ACTIVE',
    INACTIVE ='INACTIVE'
}

export class CustomerModel{
    public id: number;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public clientStatus:ClientStatus;

    public constructor(id:number, firstName:string, lastName:string, email:string, password:string, clientStatus:ClientStatus){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.clientStatus = clientStatus;
    }
}