### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

    Probamos la función recién hecha, y obtenemos el siguiente tiempo.
    
    ![](images/time1.PNG)
    
    Una vez corremos las peticiones varias veces, el tiempo mejora de la siguiente manera.
    
    ![](images/time2.PNG)
    
    Vemos una mejora del 56% en tiempo, junto con la misma confiabilidad en peticiones de 100%, por lo que memoization nos permite optimizar ambas cosas.

**Preguntas**

* ¿Qué es un Azure Function?

    Azure function es una herramienta basada en eventos
    Le permite a los desarrolladores crear puntos de
    mensajería como por ejemplo peticiones http en un endpoint.
    
* ¿Qué es serverless?
    
    Se trata de un modelo se ejecución con servicios en la nube, 
    donde el proveedor se encarga de ejecutar el código 
    suministrado, manejando recursos de manera dinámica, por lo
    que el cobro se basa en estos recursos.

* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?

    Consiste en varias funcionalidades que nos permiten vigilar
    y hacer manejo de recursos de functions en tiempo real entre otros dispositivos.
    Nos permite además hacer preview de nuestro código antes de 
    hacer commit en este, por lo que nos permite testear y ver el estado
    de las builds. Monitorea el uso y potencia de los procesos que estamos corriendo.

* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?

    Storage account es un mecanismo de persistencia de alto rendimiento,
    y es necesario dado que functions lo usa para hacer manejo de disparadores y logging.

* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.

    Consumption (Serverless)
    Son manejadas dinamicamente, lo cual escala automaticamente, se cargan los recursos para poder computar mientras se ejecuten las funciones. Puede ser una buena opcion para pagos solo por ejecucion, ademas de que escala automaticamente durante periodos de alta demanda.
    
    Premium plan
    Aborda las mismas caracteristicas que el plan de consumo, pero en este plan se agregan mas funcionalidades que se pueden aprovechar, como el manejo en una VNET, predecir los costes y consumos, alta disponibilidad para varias Function apps e instanciar mejor estas.
    Esta opcion es mas viable cuando se tiene un uso mas constante de las funciones, ademas de su capacidad. Ademas se permite usar la VNET para que las funciones se comuniquen.
    
    Dedicated
    Puede usar una VM para que corra mas funciones, ademas de que quiera personalizar las funciones con respecto a su ejecucion, puede autoescalar y aisla las funciones que maneja.
    
* ¿Por qué la memoization falla o no funciona de forma correcta?
  
Los valores que ingresan son demasiado grandes y solo funciona hasta 1476, por lo que es problematico ingresar un valor mas grande cuando intenta mirar las posiciones del arreglo que se esta usando para memorizar. Adicionalmente no hay mucha capacidad para este procesamiento.

* ¿Cómo funciona el sistema de facturación de las Function App?

Mientras las Function App estén corriendo, unicamente se paga por el consumo que estas generen, de manera que actúan dinamicamente según la cantidad de eventos ingresen en estas. Se cobra por el numero de ejecuciones, tiempo de ejecución y memoria usada.

Por otro lado, Azure ofrece la capacidad de pagar por mas planes para operaciones mas robustas y pueda llevarse un mejor control de costos y predecirlos para un posible escalamiento.

* Informe -> [INFORME](informe.md)
