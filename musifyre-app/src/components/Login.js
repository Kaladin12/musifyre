import React, {useState} from "react";
import UserPool from "../helpers/UserPool";
import '../App.css'
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useNavigate } from 'react-router-dom';

import ButtonLink from "./Button_link";
//  Componente para Log In
const LogIn = (props) => {
    const navigate = useNavigate();
    // Recibimos como props un handler para saber si transicionaremos o no a Home
    // Definimos estados para usuario y contraseña
    const [passwd, setPasswd] = useState("")
    const [username, setUsername] = useState("")

    // Maneja el click para loggearse
    const onSubmit = async (event) => {
        console.log(passwd, username);
        // Definimos un objeto de tipo CognitoUser que posea el nombre de usuario a a utenticar
        // y las características del UserPool
        const user = new CognitoUser({
            Username: username,
            Pool: UserPool
        });
        // Hacemos uso de la clase AuthenticationDetails para definir las crdenciales del usuario
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: passwd
        });

        // Para loggearse, llamamos al método authenticateUser para enviar las credenciales a cognito, se validen y obtengamos una respuesta
        // por eso, despues de pasar authDetails se encuentra el handler de la respeusta
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log('LOGGED IN!', data);
                // si la autenticación fu existosa, llamamos al prop para permitir transicionar a la pantalla de Home
                props.onLogIn();
                navigate(`/home`, { replace: true, loggedIn: true })
            },
            onFailure: (err) => {
                console.error("FAILED!", err);
            },
            newPasswordRequired: (data) => {
                console.log('User needs a new password :o', data);
            }
        })
    }

    return (
        <div>
            <div className="Logo">
                <p>Musifyre</p>
            </div>
            <div className="Login-space">
                <p>Log into Musifyre</p>
                <input type="text" id="logInput" name="Username" placeholder="Username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <input type="text" id="logInput" name="Password" placeholder="Password" value={passwd} onChange={(event)=>setPasswd(event.target.value)}/>
                <ButtonLink to="/home" onClick={(event) => onSubmit(event)} id="Create" className="but">
                    Log In
                </ButtonLink>

            </div>
        </div>
    )
}

export default LogIn;