import React, {useState} from "react";
import { Link } from "react-router-dom";

import UserPool from "../helpers/UserPool";
import '../App.css'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import ButtonLink from "./Button_link";

const SignupForm = (props) => {
    // Recibimos como props un handler para poder transicionar a login si ya tiene una cuenta el usuario
    // Definimos los estados para los parámetros que se definieron en Cognito como requeridos para todo nuevo usuario
    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")

    // Cuando se da click a Create Account, esta funcion es llamada
    const onSubmit = (event) => {
        console.log(email, passwd, username);
        // Dadas las caracteristicas del sdk, tenemos parametros extra además de username y password, para pdoerlos
        // pasar a Cognito, los definimos como objetos
        const dataEmail = { Name: 'email', Value: email }
        const dataName = { Name: 'name', Value: name }
        // Y despues los agregamos a una lista, parseandolos como atributos de CognitoUser
        const attributeList = [
            new CognitoUserAttribute(dataEmail),
            new CognitoUserAttribute(dataName),
          ]
        // LLamamos al método de signup del objeto UserPool (que contiene las características del Pool)
        // para enviarle el username, password y atributos, así como especificar el handler de la respuesta
        UserPool.signUp(username, passwd, attributeList, null, (err, data) => {
            if (!err) { // si no hay errores, se llama al prop para pasar a la pagina de verificacion de codigo
                console.log(data)
                props.onSignup(username)
            } // si hay error, muestralo
            console.log(err);
        })
    }

    return (
        <div>
            <div className="Logo">
                <p>Musifyre</p>
            </div>
            <div className="Login-space">
                <p>Sign up into Musifyre</p>
                <input type="text" id="logInput" name="Email" placeholder="Email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                <input type="text" id="logInput" name="Password" placeholder="Password" value={passwd} onChange={(event)=>setPasswd(event.target.value)}/>
                <input type="text" id="logInput" name="Username" placeholder="Username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
                <input type="text" id="logInput" name="Name" placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)}/>
                <ButtonLink to="/confirm-signup" onClick={(event) => onSubmit(event)} id="Create" className="but" >
                    Create Account
                </ButtonLink>
                
                <Link to="/login">
                    <button className="but" id="Create" >Already registered? Log In</button>
                </Link>
                
            </div>
        </div>
    )
}

export default SignupForm;
