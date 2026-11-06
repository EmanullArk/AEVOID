# Ficha Técnica Estandarizada — FC-LAB-007 (lab-07-burp)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-007** |
| **Nombre de la Práctica** | Interceptación de Tráfico Web y Análisis Comparativo de Logins con `Burp Suite` |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D03 — Seguridad web & D04 — Comunicaciones y APIs** |
| **Fase de ÆVØID** | **Fase 03 — Identificación & Fase 04 — Análisis** |
| **Enfoque** | Web Penetration Testing / Auditoría de Autenticación |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Aprender a posicionarnos en el medio del tráfico entre el navegador y el servidor utilizando el proxy interceptor de **Burp Suite** (módulos Proxy, Intercept y Repeater). Evaluamos y comparamos los mecanismos de inicio de sesión de cuatro plataformas web con arquitecturas muy distintas, modificando credenciales al vuelo para analizar cómo responde el servidor ante fallos y cómo se previenen ataques de **enumeración de usuarios**.

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo:** Configuración del proxy en Burp, interceptación de paquetes HTTP en tránsito y reenvío modificado en la pestaña Repeater (`Ctrl+R`).
* **Analista Defensivo:** Analizar los formatos de las peticiones, verificar si viajan en texto plano o cifradas y revisar las respuestas de error.
* **Evaluador Purple Team:** Comparar las cuatro plataformas y tabular los resultados para la matriz de hallazgos.

### 3. Entorno y Plataformas Evaluadas
* **Herramienta:** Burp Suite Community Edition + Navegador Chromium integrado con certificado CA instalado.
* **Sistemas Evaluados:**
  1. *OWASP Juice Shop:* Aplicación de entrenamiento intencionalmente vulnerable.
  2. *UVirtual (Plataforma Q10):* Sistema comercial de gestión académica.
  3. *PortSwigger Web Security Academy:* Plataforma de investigación con defensas avanzadas.
  4. *SAC — Universidad Santo Tomás:* Sistema de información académica institucional de la USTA.

---

### 4. Tabla Comparativa de los 4 Modelos de Autenticación

| Plataforma Auditada | Endpoint de Login | Método | Formato del Payload | Mecanismos de Protección Observados | Respuesta ante Credenciales Inválidas |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **OWASP Juice Shop** | `/rest/user/login` | `POST` | JSON plano (`{"email":..., "password":...}`) | Ninguno visible. Las credenciales viajan en texto claro dentro del JSON. | `401 Unauthorized` (`Invalid email or password`) |
| **UVirtual (Q10)** | `/Login` | `POST` | `application/x-www-form-urlencoded` | Parámetros adicionales de contexto en URL (`returnUrl`, `aplentId`). | JSON con `estado: error` (`El usuario o contraseña son inválidos`) |
| **PortSwigger Academy** | `login.portswigger.net/login` | `POST` | `application/x-www-form-urlencoded` | Múltiples capas: Tokens anti-CSRF, cookies `HttpOnly`, estado OAuth y reCAPTCHA. | Script de validación con marca `INVALID_CREDENTIALS` |
| **SAC (USTA)** | `/sgacampus/services/.../fetch/{token}` | `POST` | JSON con campos en **Base64** | Endpoint dinámico (el token en la URL cambia por intento) y credenciales ofuscadas en Base64. | JSON con `errores: "Usuario o clave incorrectos"` |

---

### 5. Cuestionario de Análisis Realizado por el Equipo
* **¿Qué método HTTP se utiliza y por qué?** Todos usan `POST`. Esto es obligatorio porque el método `GET` colocaría la contraseña como un parámetro visible en la URL (`login?user=admin&pass=123`), dejando la clave guardada en el historial del navegador, en los logs del servidor proxy y en el router intermedio.
* **¿Qué ocurre cuando las credenciales son incorrectas?** Ninguna de las cuatro plataformas le dice al usuario si falló el correo o si falló la contraseña. Todas devuelven un mensaje unificado (*"Usuario o clave incorrectos"*, *"Invalid email or password"*). Como estudiantes de ciberseguridad destacamos esto como una **excelente práctica defensiva**, ya que neutraliza los **ataques de enumeración de usuarios** (un ataque donde el hacker prueba listas de correos para saber cuáles existen en la base de datos).
* **¿El SAC de la USTA es más seguro por mandar los datos en Base64?** No necesariamente. **Base64 no es cifrado**, es una simple codificación reversible. Con solo meter la cadena en el decodificador de Burp (*Decoder*) o aplicar `atob()` en JavaScript, el usuario y la clave vuelven a verse en texto plano. La verdadera seguridad del SAC depende de que viaje sobre HTTPS (TLS) y de que en el servidor tengan un buen algoritmo de hashing (bcrypt o argon2).

---

### 6. Análisis Defensivo (Blue Team)
* **¿Qué riesgos quedan?** Ataques de fuerza bruta automatizados o *credential stuffing* si no se limita el número de intentos permitidos.
* **Solución Blue Team:**
  1. **Rate Limiting estricto:** Bloquear la IP o solicitar CAPTCHA después de 5 intentos fallidos consecutivos en menos de 10 minutos.
  2. **Autenticación Multifactor (MFA):** Exigir código temporal TOTP (Google Authenticator) para plataformas críticas como el SAC.
  3. **Cabecera HSTS:** Forzar `Strict-Transport-Security` para que ningún navegador intente degradar la conexión a HTTP simple.
