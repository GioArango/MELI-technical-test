### MELI Technical Test

Este repositorio contiene el código fuente de un proyecto desarrollado como parte de una prueba técnica propuesta por MELI. El proyecto se enfoca en crear un pequeño clon de la página en mención, en donde es posible buscar productos y visualizar sus respectivos detalles.

#### Tecnología utilizadas

- Cliente: 
    -  HTML
    -  SASS
    -  REACT

- Servidor:
    - NODE
    - EXPRESS
        
#### Clonar Repositorio

Para clonar este repositorio, ejecute el siguiente comando en su terminal:

```git clone https://github.com/GioArango/MELI-technical-test.git```

#### Instalación
Una vez clonado el repositorio, acceda a la carpeta MELI-technical-test y ejecute el siguiente comando para instalar las dependencias necesarias:

```npm install```

#### Ejecución
Para ejecutar el proyecto en modo desarrollo, utilice el siguiente comando:

```npm run start:dev```


**Nota:** El puerto por defecto para ejecutar el servidor en modo desarrollo es el 3000. Si desea cambiarlo, siga estos pasos:

1. Diríjase al archivo `apps/client/.env`.
2. Cambie la variable de entorno por el puerto deseado.
3. Luego, en el archivo `apps/client/package.json`, en el nodo `"proxy"`, cambie el puerto por el deseado.


Y para ejecutar el proyecto en modo de producción, utilice:

```npm run start:prod```
