# Modelado UML del Caso de Estudio: Autenticación e Interceptación Web

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Este documento contiene los diagramas formales en notación **UML (Unified Modeling Language)** que modelan el comportamiento, actores, componentes y secuencia técnica del caso de estudio de evaluación de autenticación web y prevención de enumeración de usuarios.

---

## 1. Diagrama de Secuencia UML (Interacción e Interceptación con Burp Suite)

Este diagrama modela el flujo temporal de mensajes entre el analista/atacante, el navegador cliente, el proxy local (**Burp Suite**), el backend de autenticación y la base de datos de credenciales:

```mermaid
sequenceDiagram
    autonumber
    actor RedTeam as Analista / Atacante (Red Team)
    participant Browser as Navegador Web (Chromium)
    participant Proxy as Proxy Interceptor (Burp Suite)
    participant Repeater as Módulo Repeater (Burp)
    participant WAF as Firewall Web / Reverse Proxy
    participant Backend as Endpoint de Login (API / Controlador)
    participant DB as Motor DB (Hash Validator)

    Note over RedTeam,DB: 1. CAPTURA DE SOLICITUD DE LOGIN
    RedTeam->>Browser: Digita usuario y contraseña de prueba
    Browser->>Proxy: Emite petición HTTP POST (Credenciales)
    activate Proxy
    Note over Proxy: Intercept ON: La petición se detiene en memoria local
    Proxy-->>RedTeam: Muestra cabeceras y payload capturado

    Note over RedTeam,DB: 2. MODIFICACIÓN Y REPETICIÓN (TESTING DE ENUMERACIÓN)
    RedTeam->>Repeater: Clona petición hacia Repeater (Ctrl + R)
    activate Repeater
    RedTeam->>Repeater: Modifica password/email para forzar fallo
    Repeater->>WAF: Envía POST modificado sobre TLS 1.3
    activate WAF
    WAF->>Backend: Enruta solicitud hacia /login
    activate Backend

    Note over Backend,DB: 3. PROCESAMIENTO Y VALIDACIÓN
    alt Caso SAC USTA (Payload en Base64)
        Backend->>Backend: Decodifica string Base64 a texto plano
    else Caso OWASP Juice Shop (JSON Plano)
        Backend->>Backend: Parsea objeto JSON crudo
    else Caso Q10 / PortSwigger (Form-Urlencoded)
        Backend->>Backend: Extrae parámetros x-www-form-urlencoded
    end

    Backend->>DB: Consulta SELECT usuario y verifica hash (bcrypt/argon2)
    activate DB
    DB-->>Backend: Resultado: Credenciales NO coinciden
    deactivate DB

    Note over Backend,Repeater: 4. MECANISMO DEFENSIVO (ANTI-ENUMERACIÓN)
    Backend->>Backend: Genera mensaje de error homogéneo (tiempo constante)
    Backend-->>WAF: HTTP 401 Unauthorized / JSON {"error": "Usuario o clave incorrectos"}
    deactivate Backend
    WAF-->>Repeater: Retorna respuesta HTTP 401
    deactivate WAF

    Repeater-->>RedTeam: Muestra respuesta unificada
    deactivate Repeater
    deactivate Proxy

    Note over RedTeam: Conclusión Red Team: El sistema no revela si el usuario existe.<br/>Ataque de enumeración neutralizado con éxito.
```

---

## 2. Diagrama de Casos de Uso UML (Seguridad en Autenticación)

Este diagrama representa las interacciones de los actores con el sistema, delimitando los casos de uso ofensivos y las contramedidas defensivas:

```mermaid
graph TD
    classDef actorStyle fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef useCase fill:#0f172a,stroke:#a855f7,stroke-width:2px,color:#f8fafc;
    classDef blueCase fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#f8fafc;

    User["fa:fa-user Usuario Legítimo"]:::actorStyle
    Attacker["fa:fa-user-secret Analista / Atacante (Red Team)"]:::actorStyle
    System["fa:fa-server Sistema Backend de Autenticación"]:::actorStyle

    subgraph Frontera_Sistema ["Frontera del Sistema Web de Autenticación"]
        UC1(["Iniciar Sesión"]):::useCase
        UC2(["Transmitir Credenciales vía POST"]):::useCase
        UC3(["Interceptar y Modificar Paquetes"]):::useCase
        UC4(["Ejecutar Ataque de Enumeración de Usuarios"]):::useCase
        UC5(["Ofuscar Payloads en Base64"]):::useCase
        UC6(["Validar Hash de Contraseña"]):::useCase
        UC7(["Emitir Respuesta de Error Homogénea\n(Anti-Enumeración)"]):::blueCase
        UC8(["Aplicar Bloqueo por Tasa de Intentos\n(Rate Limiting)"]):::blueCase
        UC9(["Exigir Segundo Factor (MFA / TOTP)"]):::blueCase
    end

    User --> UC1
    UC1 ..->|<<include>>| UC2
    UC2 --> System

    Attacker --> UC3
    UC3 ..->|<<extend>>| UC4
    UC4 --> UC2

    UC2 ..->|<<include>>| UC6
    UC6 --> System

    System --> UC7
    System --> UC8
    System --> UC9

    UC5 -.->|<<extend>>| UC2
    UC8 -.->|<<mitigates>>| UC4
    UC7 -.->|<<mitigates>>| UC4
```

---

## 3. Diagrama de Actividades UML (Flujo de Decisión en Login)

Muestra el flujo lógico y los puntos de bifurcación de la arquitectura al procesar un intento de acceso:

```mermaid
flowchart TD
    Start(["Inicio del Intento de Login"]) --> Input["Usuario ingresa credenciales en Formulario Web"]
    Input --> ProxyCheck{"¿Existe Proxy Interceptor\n(Burp Suite) en medio?"}

    ProxyCheck -- Sí --> Intercept["Tráfico detenido en Burp Suite\n(Modificación de payload en Repeater)"]
    ProxyCheck -- No --> Network["Tráfico enviado directo por canal HTTPS/TLS"]
    Intercept --> Network

    Network --> EndpointCheck{"¿Qué formato usa el Endpoint?"}
    EndpointCheck -- "SAC USTA" --> DecodeB64["Decodificar Base64 en memoria del servidor"]
    EndpointCheck -- "Juice Shop" --> ParseJSON["Parsear JSON plano"]
    EndpointCheck -- "Q10 / PortSwigger" --> ParseForm["Parsear Form-Urlencoded + validar CSRF"]

    DecodeB64 --> HashValidation["Consultar Base de Datos y verificar Hash seguro"]
    ParseJSON --> HashValidation
    ParseForm --> HashValidation

    HashValidation --> CredsValid{"¿Credenciales Correctas?"}

    CredsValid -- Sí --> GenSession["Generar Cookie de Sesión HttpOnly + Secure"]
    GenSession --> Success(["Acceso Concedido (HTTP 200 / Redirección)"])

    CredsValid -- No --> RateLimitCheck{"¿Superó 5 intentos\nfallidos consecutivos?"}
    RateLimitCheck -- Sí --> BlockIP["Bloquear temporalmente la IP / Exigir CAPTCHA"]
    BlockIP --> GenericError["Retornar mensaje genérico:\n'Usuario o clave incorrectos' (HTTP 401)"]
    RateLimitCheck -- No --> GenericError
    GenericError --> Fail(["Acceso Denegado (Anti-Enumeración Activo)"])
```

---

## 4. Conclusiones Metodológicas del Modelado UML

1. **Visibilidad en la Capa de Transporte:** El diagrama de secuencia evidencia que herramientas como Burp Suite operan antes del cifrado del navegador o configurando un certificado CA de confianza, lo que permite modificar el paquete antes de que salga al WAF.
2. **El Valor Defensivo del Mensaje Homogéneo:** En el diagrama de actividades se aprecia que, ya sea que el correo no exista en la BD o que la clave sea errónea, el sistema bifurca hacia la misma caja de respuesta (*"Usuario o clave incorrectos"*). Esto rompe cualquier intento del atacante de enumerar usuarios por diferencias de respuesta.
3. **Ofuscación vs. Cifrado:** En el caso del SAC de la USTA, el diagrama de secuencia resalta que la decodificación de Base64 se realiza en el backend con una operación trivial; por lo tanto, no sustituye al protocolo TLS ni a las políticas de contraseñas seguras.
