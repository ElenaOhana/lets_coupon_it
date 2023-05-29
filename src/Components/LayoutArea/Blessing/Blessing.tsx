import { useEffect, useState } from "react";
import { UserModel } from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Blessing.css";

interface UserProps{
    user: UserModel;
}

function Blessing(props: UserProps): JSX.Element {

    const [user, setUser] = useState<UserModel>(props.user);

    useEffect(() => {
        
        setUser(authStore.getState().user);

        authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        })
    }, []) 

    return (
        <div className="Blessing">
            
            {isEvening() ? 'Good evening ' : isMorning() ? 'Good morning ' : isNight() ? 'Good night ' : isAfternoon() ? 'Good Afternoon ' : 'Hello '} 
            <>
            </>
            {
                user.clientType ? <>
            {user.clientType === "ADMINISTRATOR" ? 'Administrator' 
            : user.clientType === "COMPANY" ? authStore.getState().user.name
            : user.clientType === "CUSTOMER" ? authStore.getState().user.firstName +" "+authStore.getState().user.lastName : 'unknown'}
    
            </> : <></>
            } 
        </div>
    );
    
    function isMorning(): boolean{
        const date = new Date();
        const hour = date.getHours();
        return hour === 6 || hour === 7 || hour === 8 || hour === 9 || hour === 10 || hour === 11;
    }

    function isAfternoon(): boolean{
        const date = new Date();
        const hour = date.getHours();
        return hour === 12 || hour === 13 || hour === 14 || hour === 15 || hour === 16 || hour === 17;
    }

    function isEvening(): boolean{
        const date = new Date();
        const hour = date.getHours();
        return hour === 18 || hour === 19 || hour === 20 || hour === 21 || hour === 20 || hour === 21;
    }

    function isNight(): boolean{
        const date = new Date();
        const hour = date.getHours();
        return hour === 22 || hour === 23 || hour === 24 || hour === 1 || hour === 2;
    }

    
}

export default Blessing;

    