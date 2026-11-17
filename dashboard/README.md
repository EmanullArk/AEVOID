# Dashboard Visual en React — Framework ÆVØID

Aplicación web interactiva construida con **React + TypeScript + Vite** que consolida y visualiza de forma gráfica la documentación Markdown del **Framework Metodológico de Ciberseguridad ÆVØID** (`v1.3.0`).

---

## 1. Vistas Implementadas

1. **Dashboard Ejecutivo:** KPIs del ciclo (`100%` cobertura, `16` hallazgos, `100%` correcciones verificadas), gráficos SVG de severidades y dominios (`D01–D08`), flujo interactivo de 6 fases, equipo Purple Team y tabla resumen `P01–P11`.
2. **Ciclo & Gobernanza:** Diagrama iterativo completo de las 6 fases (`F01–F06`), 7 roles operativos, Matriz RACI interactiva, protocolos RoE / cadena de custodia, matriz de trazabilidad integral y plantilla oficial `FC-LAB-XXX`.
3. **Laboratorios (10 Fichas):** Buscador y filtros por dominio/fase para `FC-LAB-001` a `FC-LAB-009` y `FC-LAB-011` con visor modal nativo de comandos copiables, tablas comparativas y análisis Blue Team. *(Nota: `FC-LAB-010` fue omitido del catálogo conforme a la configuración solicitada tras el bloqueo local de lectura del archivo fuente).*
4. **Riesgos & Pruebas:** Matriz interactiva `4×4` de Probabilidad × Impacto, rúbrica CVSS/SLAs, tabla filtrable de hallazgos (`H-01` a `H-16`), matriz de evaluación (`P01–P11`) y casos de prueba (`CP-01` a `CP-20`).
5. **Hardening & Evidencias:** Plan de mitigación Blue Team con fragmentos copiables (`BIND`, `Nginx`, `PHP PDO`, `php.ini`, `setup_env.sh`), catálogo de evidencias (`C-01.1` a `C-11.11`), repositorio Google Drive y guía de flujo Git/GitHub (`v0.1.0`–`v1.3.0`).
6. **Caso Estudio & UML:** Comparativa de autenticación en 4 plataformas (Juice Shop, Q10, PortSwigger, SAC USTA), demostración interactiva de decodificación Base64 y selector de diagramas UML (Secuencia SVG oficial, Casos de Uso, Actividades y Grafo OSINT circular de Maltego).
7. **Glosario & Archivos MD:** Buscador por categoría de los 30 términos técnicos oficiales y tabla exploradora de todos los archivos `.md` por carpeta del repositorio.

---

## 2. Requisitos Previos

* **Node.js:** `v20.0.0` o superior (probado en `v22.19.0`).
* **npm:** `v10.0.0` o superior (probado en `10.9.3`).

---

## 3. Cómo Ejecutar el Proyecto

Abre una terminal en la carpeta `dashboard` del repositorio:

```bash
cd C:\Semestre_8\CiberSeguridad\AEVOID\AEVOID\dashboard
```

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre en tu navegador la URL local indicada por Vite (por defecto `http://localhost:5173`).

### Paso 3: Compilar para producción (opcional)

```bash
npm run build
```

Los archivos estáticos optimizados se generan en la carpeta `dist/`.

### Paso 4: Previsualizar el build de producción (opcional)

```bash
npm run preview
```

---

## 4. Estructura de Carpetas del Dashboard

```text
dashboard/
├── public/
│   └── diagrama_uml_autenticacion.svg
├── src/
│   ├── components/
│   │   ├── diagrams/
│   │   │   ├── ChartsSvg.tsx
│   │   │   ├── LifecycleFlowSvg.tsx
│   │   │   └── UmlDiagrams.tsx
│   │   ├── AccessibleTabs.tsx
│   │   ├── CodeSnippet.tsx
│   │   ├── DetailDialog.tsx
│   │   ├── ResponsiveTable.tsx
│   │   ├── SeverityBadge.tsx
│   │   └── SidebarNav.tsx
│   ├── data/
│   │   ├── annexesData.ts
│   │   ├── caseStudyAndGlossaryData.ts
│   │   ├── frameworkData.ts
│   │   ├── labsData.ts
│   │   └── resultsData.ts
│   ├── styles/
│   │   ├── components.css
│   │   ├── global.css
│   │   └── tokens.css
│   ├── types/
│   │   └── aevoid.ts
│   ├── views/
│   │   ├── CaseStudyView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── GlossaryAndFilesView.tsx
│   │   ├── GovernanceView.tsx
│   │   ├── HardeningAndEvidenceView.tsx
│   │   ├── LabsView.tsx
│   │   └── RisksAndTestsView.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
