Autor: Martín González - 2020

# Aplicación Sistema de Riego Automatizado

## Introducción

El objeto de este proyecto es finalizar la asignatura Desarrollo de Aplicaciones Multiplataforma de la CEIoT.

La aplicación consiste en una SPA (Single Page Aplicaction) que simula la autmatización de un sistema de riego.

<p float="left">
  <img src="/frontend/doc/img1.png" width="100" />
  <img src="/img2.png" width="100" /> 
  <img src="/img3.png" width="100" />
  <img src="/img3.png" width="100" />
</p>

![Aplicacion Smart HOME](/doc/appFiltro.jpg?raw=true "Smart HOME")

## Herramientas utilizadas

El proyecto se encuentra desarrollado con las siguientes herramientas:

1. Frontend: [Ionic](https://ionicframework.com/)
2. Backend: [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com/)
3. Persistencia de datos: [MySQL](https://www.mysql.com/)

Los servicios requeridos Node.js y MySQL para la ejecución, asi como el compilador TypeScript en caso de requerir modificar el código del Front-end, se corren desde contenedores Docker.

## Prerequisitos

La aplicación requiere contar con Docker Engine y Docker Compose instalados.

En el link https://docs.docker.com/engine/install/ubuntu/ se muestran los pasos para la intalación de Docker Engie en las ultimas versiones de Ubuntu. 

En el link https://docs.docker.com/compose/install/ se muestran los pasos para la instalación de Docker Compose.


## Correr la aplicación

Clonar o descargar la aplicacion desde Git Hub.

```sh
git clone https://github.com/mgonzalez738/daw_tp_final.git
```

El directorio raiz de la aplicación ejecutar.
```sh
docker-compose up
```

Chequear que la aplicación esté corriendo en http://localhost:8000.

Chequear que PHPMyAdmin está funcionando en http://localhost:8085.

Para ingresar a la base de datos se debe utilizar: 
1. User: root 
2. Pass: userpass

Para detener la aplicación ejecutar.
```sh
docker-compose down
```

## Contribuir
Para contribuir realizar un pull request con las sugerencias.