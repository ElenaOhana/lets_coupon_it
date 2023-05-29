import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import BaseModalWrapper from "../ModalPopup/BaseModalWrapper";

function Login(): JSX.Element {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    return (
        <div className="Login">
                    <div>
                        <button onClick={toggleModal}>Login here</button>
                        <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} />
                    </div>
                    <div>
                        <Link to="/home"><button>Back to Coupons</button></Link>
                    </div>
        </div>
    );
}

export default Login;
