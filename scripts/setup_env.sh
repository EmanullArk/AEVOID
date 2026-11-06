#!/bin/bash
# ==============================================================================
# Script de Acondicionamiento de Entorno — Framework ÆVØID
# Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas
# Equipo: Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo
# ==============================================================================

set -e

echo "[+] Inicializando entorno de trabajo seguro para ÆVØID..."

# Crear estructura de contención local
mkdir -p ~/aevoid_workspace/{evidencias,reportes,scripts,temp}

# Aplicar permisos restrictivos POSIX (mínimo privilegio)
chmod 700 ~/aevoid_workspace/evidencias ~/aevoid_workspace/reportes
chmod 755 ~/aevoid_workspace/scripts

echo "[+] Estructura creada con permisos 700 en evidencias y reportes."
echo "[+] Entorno listo para ejecución de laboratorios FC-LAB-001 a FC-LAB-008."
