import { CognitoUser } from "amazon-cognito-identity-js";
import React, {useState} from "react";
import UserPool from "../helpers/UserPool";
import '../App.css'

import ButtonLink from "./Button_link";

// Componente para manejar el envío del código de confirmación a Cognito
const ConfirmSignUp = (props) => {
    // Recibe como prop el nombre de usuario y un handler de confirmación 
    // que permitirá pasar a la ventana de Log In
    console.log(props.username)
    //  Utilizamos useState para guardar el valor del código
    const [code, setCode] = useState("")

    // Definimos un objeto de tipo CognitoUser que posea el nombre de usuario a a utenticar
    // y las características del UserPool
    const user = new CognitoUser({
        Username: props.username,
        Pool: UserPool
      });
    
    // Esta función maneja el evento de click al boton de verificar el codigo 
    const onSubmit = (event) => {
        //event.preventDefault();
        console.log(code);
        // Utilizando el objeto user, llamamos al método confirmRegistration del CDK de AWS para decirle a 
        // cognito que nuestro usuario ya ha verificado que su email si es de su pertenecia
        // pasamos como parámetro el código y el true de verificación
        user.confirmRegistration(code, true, (err, result) => {
            if (err === null) {
                // si no hay errores, cambiamos confirmation a true con onConfirmation() y esto nos llevará a la pagina de llogin
                console.log('success')
                props.onConfirmation()
            }
            else {
                console.log('Error confirming code')
            }
        });
    }

    return (
        <div>
            <div className="Logo">
                <p>Musifyre</p>
            </div>
            <div className="Login-space">
                <p>Enter your confirmation code</p>
                <input type="text" id="logInput" name="code" placeholder="Confirmation Code" value={code} onChange={(event)=>setCode(event.target.value)}/>
                <ButtonLink to="/login" onClick={(event) => onSubmit(event)} id="Create" className="but">
                    Confirm Code
                </ButtonLink>
            </div>
        </div>
    )
}

export default ConfirmSignUp;
