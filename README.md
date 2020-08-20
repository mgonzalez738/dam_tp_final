Autor: Martín González - 2020

# Aplicación Sistema de Riego Automatizado

## Introducción

El objeto de este proyecto es finalizar la asignatura Desarrollo de Aplicaciones Multiplataforma de la CEIoT.

La aplicación consiste en una SPA (Single Page Aplicaction) que simula la automatización de un sistema de riego.

En la página principal de la aplicación se muestra el listado de sensores de humedad cargados en la base de datos. 

A partir del listado se accede a la pagina de control y visuaización correspondiente a cada sensor. Al ingresar, el medidor muestra durante 5 segundos el último valor almacenado del sensor. Luego, la aplicación simula un cambio de la medición del sensor aumentando o disminuyendo el valor según el estado cerrado o abierto de la electroválvula asociada.

Desde esta página es posible comandar la apertura y cierre de la electroválvula. El cambio de estado de la es registrado en la tabla de logs de la base de datos. En cada cierre de la electroválvula el valor del indicador es almacenado en la tabla de mediciones de la base de datos.

Ambos registros, logs y mediciones, pueden accesderse para su visualización desde la misma página.

<p float="left">
  <img src="/frontend/doc/img1.png" width="200" />
  <img src="/frontend/doc/img2.png" width="200" /> 
  <img src="/frontend/doc/img3.png" width="200" />
  <img src="/frontend/doc/img4.png" width="200" />
</p>

## Herramientas utilizadas

El proyecto se encuentra desarrollado con las siguientes herramientas:

1. Frontend: [Ionic](https://ionicframework.com/)
2. Backend: [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com/)
3. Base de datos: [MySQL](https://www.mysql.com/)

## Prerequisitos

La aplicación requiere contar con Docker Engine y Docker Compose instalados.

En el link https://docs.docker.com/engine/install/ubuntu/ se muestran los pasos para la intalación de Docker Engie en las ultimas versiones de Ubuntu. 

En el link https://docs.docker.com/compose/install/ se muestran los pasos para la instalación de Docker Compose.

## Correr la aplicación

Clonar o descargar la aplicacion desde Git Hub.

```sh
git clone https://github.com/mgonzalez738/dam_tp_final.git
```

Cambiar al directorio raiz de la aplicación y ejecutar docker-compose.
```sh
cd dam_tp_final
docker-compose up
```

Ingresar a la aplicación web en http://localhost:3000.

Para detener la aplicación ejecutar.
```sh
docker-compose down
```