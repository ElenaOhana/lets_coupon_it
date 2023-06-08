export enum ClientType {
    ADMINISTRATOR,
    COMPANY,
    CUSTOMER
}

export class UserModel{
    public id?:number;
    public name?:string;
    public firstName?:string;
    public lastName?:string;
    public email?:string;
    public password:string;
    public clientType: ClientType;

    public constructor(id?:number, name?:string, firstName?:string, lastName?:string, email?: string, password?: string, clientType?: ClientType){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }    
     
}
