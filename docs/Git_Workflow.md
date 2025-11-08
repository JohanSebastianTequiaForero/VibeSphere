# Git Workflow – Proyecto VibeSphere

## Objetivo

Implementar control de versiones con Git y establecer un flujo de trabajo colaborativo, asegurando un desarrollo ordenado, seguro y documentado del proyecto.

---

## 1. Repositorio en GitHub

- Repositorio: `Proyecto`
- Tipo: Público
- Inicializar con README.md
- Conexión local:

```bash
git init
git remote add origin https://github.com/JohanSebastianTequiaForero/Proyecto.git
git add .
git commit -m "Initial commit"
git push -u origin main

## Flujo de ramas

| Rama        | Propósito                                                                      |
| ----------- | ------------------------------------------------------------------------------ |
| `main`      | Código estable listo para producción                                           |
| `develop`   | Integración de funcionalidades antes de producción                             |
| `feature/*` | Cada nueva funcionalidad se desarrolla en su propia rama (ej: `feature/login`) |

## Convención de commits

feat: agregar funcionalidad de login
fix: corregir bug en registro
docs: actualizar README
style: corrección de formato

## Frecuencia de push/pull
Push: al completar una funcionalidad mínima o conjunto de cambios funcionales.
Pull: antes de empezar a trabajar para mantener la rama actualizada.

## Política de Pull Requests (PR)
Crear PR desde la rama temporal hacia develop.
Revisar código antes de hacer merge.
Merge con squash o rebase según política

## Buenas prácticas adicionales

Mantener ramas temporales pequeñas y enfocadas en la versión específica.
Evitar commits masivos sin descripción.
Eliminar ramas temporales después de hacer merge a develop.
Documentar cambios importantes en PRs y README.

```
