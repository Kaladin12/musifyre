# Musifyre

Final Project for the Cloud Computing class, it is a "streaming service" under development.

# Setup steps:

- Clone the repo

```bash
    git clone https://github.com/elmane-cetys/musifyre.git
```

- Navigate to musifyre-app and install dependencies

```bash
    npm install
```

- If you're depploying inside the EC2 instance, you need to specify the "internet" ip for the ec2 instance to be able to serve the page via the VPC, to do so just go to the scripts section and chage the following::

```json
    "start": "HOST=0.0.0.0 PORT=80 react-scripts start"
```

- Then, just start the project. If you want it to run in the background and be available even after you close your SSH session, just append an & at the end of the command:

```shell
    sudo npm start &
```

## Sign Up:

- Utiliza un email verdadero, lo ocuparás mas adelante
- Escribe una password con mayusculas, minusculas, caracteres especiales y numeros (de por lo menso 12 digitos)
- Elige un username que desees, puedes checar en la consola de AWS cuales existen y usarlos
- Escribe tu nombre (lo añadí como placeholder por si despues lo queremos usar)
- Da click en create account
- Recibirás un correo con un código, copialo y pegalo en la nueva pagina que te redirigió despues de dar click
- Si todo está bine, serás redirigido a la pagina de login
- Ingresa crwedenciales y da click en login
- Si todo está bien, transicionarás a una pantalla que dirá "You're logged In"
