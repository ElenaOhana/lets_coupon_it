import React from 'react';
import Modal from './Modal';
import { DesktopModalContainer, FormSpan, Header } from './ModalPopup.styles';
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import loginService from "../../../Services/LoginService";
import { authStore } from '../../../Redux/AuthState';
import notificationService from '../../../Services/NotificationService';
import { useForm } from 'react-hook-form';

interface BaseModalWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
}

// In ModalPopup folder all files for creating popup for Login.
const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ onBackdropClick, isModalVisible }) => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CredentialsModel>({
        mode: "onTouched"
    });
    
    if (!isModalVisible) {
        return null;
    }
    function send(cred: CredentialsModel) {
        loginService.login(cred, cred.clientType)
            .then(() => {
                if (cred.clientType.toString() === "ADMINISTRATOR") {
                    notificationService.success("Hello " + authStore.getState().user.clientType);
                    navigate("/adminMenu")
                }
                if (cred.clientType.toString() === "COMPANY") {
                    notificationService.success("Hello " + authStore.getState().user.name);
                    navigate("/companyMenu")
                }
                if (cred.clientType.toString() === "CUSTOMER") {
                    notificationService.success("Hello " + authStore.getState().user.firstName + " " + authStore.getState().user.lastName);
                    navigate("/customerMenu")
                }
            })
            .catch(err => {notificationService.error(err); reset()});
    }

    return (<Modal onClick={onBackdropClick}>
        <DesktopModalContainer>
            <Header>Please login</Header>
            <FormSpan>
            <form onSubmit={handleSubmit(send)}>
                <input type="email" placeholder="email" {...register("email", {
                    required: { value: true, message: "Email is missing" },
                    pattern:{ value: /^\S+@\S+$/i , message: "Invalid Email"} })} /><br />
                <span>{errors.email?.message}</span>
                <br />

                <input type="password" placeholder="password"  {...register("password", { 
                    required: { value: true, message: 'Password is missing' }, 
                    minLength:{ value: 4, message: 'At least 4 characters' }, 
                    maxLength: { value: 8, message: 'Your password is too long' }})} /><br />
                <span>{errors.password?.message}</span><br/>

                <select id="type" name="type"  {...register("clientType")}>
                    <option value="default">Please select:</option>
                    <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                    <option value="COMPANY">COMPANY</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                </select>
                <br /><br />
                <button disabled={!isValid}>Login</button>
            </form>
            </FormSpan>
        </DesktopModalContainer>
    </Modal>);
}

export default BaseModalWrapper