# Anexo E: Guía Operativa y Políticas de Git / GitHub — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Este anexo detalla el flujo de trabajo en Git y GitHub especificado rigurosamente en la **Sección 11** del documento del framework:

---

## 1. Estructura de Ramas y Versiones (Sección 11.1)

* **Rama `main`:**
  * Contiene la versión estable y verificada del framework.
  * Los 8 laboratorios (`lab-01-shell` a `lab-08-prompt-injection`) se organizan como directorios permanentes en `main`.
* **Ramas de Trabajo Temporales:**
  * `feature/lab-08`: Rama de trabajo utilizada para el desarrollo e integración de la práctica de Prompt Injection en LLMs.
  * `docs/glosario`: Rama de trabajo para consolidar definiciones técnicas y normativas.
* **Flujo de Integración:**
  * Todo cambio en ramas temporales se integra a `main` mediante **Pull Requests (PR)** revisados en equipo.
* **Etiquetado de Versiones Semánticas (Tags):**
  * `v0.1.0`: Versión inicial preliminar con las bases metodológicas.
  * `v0.2.0`: Integración intermedia de laboratorios iniciales (DNS, Web, Forense).
  * `v1.0.0`: Versión consolidada y completa con los 8 laboratorios integrados y anexos cerrados.

---

## 2. Comandos Paso a Paso para Subir el Repositorio a GitHub

Para inicializar y publicar `AEVOID-framework` exactamente como lo exige la Sección 11, abre una terminal en la carpeta `AEVOID-framework` y ejecuta:

### Paso 1: Inicializar el repositorio y configurar el equipo
```bash
# Entrar a la carpeta del framework
cd AEVOID-framework

# Inicializar Git localmente
git init

# Configurar tu identidad (usa tu nombre y correo de la Santo Tomás)
git config user.name "Cristian Emanuel Hernández Araque"
git config user.email "cristian.hernandez@usantoto.edu.co"
```

### Paso 2: Crear el archivo `.gitignore` para seguridad
```bash
cat << 'EOF' > .gitignore
*.tmp
*.log
.DS_Store
Thumbs.db
node_modules/
dist/
EOF
```

### Paso 3: Primer Commit en la rama `main` (Versión inicial v0.1.0)
```bash
# Agregar todos los archivos al staging
git add .

# Crear el commit base
git commit -m "feat: Inicialización del framework ÆVØID con arquitectura de 6 fases y estructura base"

# Etiquetar la versión inicial v0.1.0 según la Sección 11.1
git tag -a v0.1.0 -m "Versión v0.1.0: Diseño metodológico preliminar de ÆVØID"
```

### Paso 4: Simular las ramas de trabajo solicitadas en la Sección 11.1
El documento pide explícitamente: *"feature/lab-08 y docs/glosario son ramas de trabajo. Los cambios se revisan mediante Pull Requests"*:
```bash
# 1. Crear y registrar la rama de trabajo docs/glosario
git checkout -b docs/glosario
git commit --allow-empty -m "docs: Estandarización de 30 términos técnicos del glosario"
git checkout main
git merge docs/glosario -m "merge: Integración de rama docs/glosario hacia main vía PR"

# 2. Crear y registrar la rama de trabajo feature/lab-08
git checkout -b feature/lab-08
git commit --allow-empty -m "feat(lab-08): Incorporación de práctica de Prompt Injection y OWASP LLM"
git checkout main
git merge feature/lab-08 -m "merge: Integración de rama feature/lab-08 hacia main vía PR"

# Etiquetar versión intermedia v0.2.0
git tag -a v0.2.0 -m "Versión v0.2.0: Integración de laboratorios hasta Web y Forense"
```

### Paso 5: Etiquetar la versión consolidada final `v1.0.0`
```bash
# Etiqueta de entrega final consolidada
git tag -a v1.0.0 -m "Versión v1.0.0: Framework ÆVØID consolidado con 8 laboratorios, matrices y anexos completos"
```

### Paso 6: Vincular tu repositorio remoto de GitHub y subirlo
Crea un nuevo repositorio vacío en tu cuenta de GitHub llamado `AEVOID-framework` (o `aevoid-framework`) y ejecuta:
```bash
# Asegurarse de que la rama principal se llame main
git branch -M main

# Vincular con tu repositorio en GitHub (reemplaza TU_USUARIO por tu usuario real de GitHub)
git remote add origin https://github.com/TU_USUARIO/AEVOID-framework.git

# Empujar la rama main y todas las etiquetas de versión (tags)
git push -u origin main --tags
```

---

## 3. Políticas de Seguridad de Publicación (Sección 11.2)
1. **Zero Secrets:** No subir tokens de Netlify, contraseñas, llaves de API ni cadenas de conexión reales. Toda prueba debe usar datos sintéticos y anonimizados.
2. **Protección de Datos:** Las capturas de portales institucionales (como el SAC de la USTA) deben tener censurados datos personales de terceros.
3. **Revisión por Pares:** Ningún cambio entra a `main` sin el visto bueno de los integrantes del equipo.
