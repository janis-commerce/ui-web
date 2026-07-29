# Design: migracion-node-22 — Migrar `@janiscommerce/ui-web` a Node 22

## Technical Approach

Migración de **tooling**, no de runtime del paquete: la API pública y el `dist/` publicado no
cambian. Se elevan los pines de Node (local, `engines`, CI) de 14 a 22, se quita el `resolution`
que existía solo para Node 14, y se aplica el flag de compatibilidad `--openssl-legacy-provider`
al único componente del toolchain que lo necesita (Storybook 6 sobre webpack 4). En paralelo se
elimina código muerto (`build-icons`) detectado durante la validación. El grueso del riesgo se
resuelve **ejecutando** cada script en Node 22, no editando config.

## Architecture Decisions

| Decision                       | Choice                                                                | Alternatives                              | Rationale                                                                                                                                                                          |
| ------------------------------ | --------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Piso de Node (`engines`)       | `>=18.0.0`                                                            | `>=22` (forzar), `>=20`                   | Desacoplar desarrollo de consumo: ui-web se desarrolla/testea en Node 22 (`.nvmrc` + CI), pero el bundle publicado es de browser y no exige Node 22 para consumirse. `>=18` es el piso real; forzar `>=22` rompería consumidores en Node 18/20 (LTS vivos) sin beneficio y volvería la migración breaking. |
| Storybook 6                    | **Mantener + flag OpenSSL**                                           | Upgrade a SB8                             | Decidido en proposal: SB8 exige reescribir `webpackFinal`, migrar `@storybook/addons` y resolver `storybook-dark-mode` (pide SB10). Fuera de scope.                                |
| Ubicación del flag OpenSSL     | **Scripts de `package.json`**                                         | En los YAML de los workflows              | Un solo lugar hereda los 3 puntos de invocación (local, `publish-storybook.yml`, job de release en `npm-publish.yml`). En YAML habría que duplicarlo y es fácil que se escape uno. |
| Forma del flag                 | `--openssl-legacy-provider` (con plan B si `NODE_OPTIONS` lo rechaza) | Solo `NODE_OPTIONS=...`                   | Node 17+ rechaza ese flag dentro de `NODE_OPTIONS` en varios casos. Plan B: pasarlo como flag CLI directo a la herramienta. A confirmar en el runner.                              |
| `resolutions: node-releases`   | **Eliminar**                                                          | Actualizar el pin a una versión nueva     | Existía solo para no exigir Node ≥18 en el CI de Node 14. Con Node 22 sobra; `node-releases` es data JSON, riesgo mínimo al quitarlo.                                              |
| `build-icons`                  | **Eliminar (script + fuente + entry)**                                | Arreglar chalk + corregir ruta de salida  | Roto desde nov-2021 por 2 causas ajenas a Node (chalk ESM + ruta `src/web/` inexistente); fuente divergida del output real. Arreglarlo sería trabajo no relacionado con Node 22.   |
| Jest / Enzyme / Rollup / React | **Sin cambios**                                                       | Subir Jest 29 / RTL / Rollup 4 / React 18 | Ninguno bloquea Node 22 (verificado: engines no excluyen 22). Cada upgrade es un proyecto aparte con su propio riesgo.                                                             |

## Flujo de cambios (dónde toca cada cosa)

```
Node pin 14 → 22
    ├─ .nvmrc                         v14 → 22
    ├─ package.json engines.node      >=14 → >=18   (piso de consumo; dev en 22 vía .nvmrc)
    └─ .github/workflows/ (9 líneas)
         ├─ build-status.yml:13
         ├─ coverage-status.yml:13
         ├─ npm-publish.yml:18, :31, :65   (:65 = job build-and-deploy-storybooks)
         ├─ npm-publish-beta.yml:17, :30
         └─ publish-storybook.yml:30

Storybook desbloqueo
    └─ package.json scripts
         ├─ storybook            → prefijo flag OpenSSL
         └─ storybook-web-docs   → prefijo flag OpenSSL
         (heredado por publish-storybook.yml y npm-publish.yml:65 vía el script)

Limpieza deps
    ├─ package.json resolutions   → eliminar node-releases
    └─ yarn.lock                  → regenerar (reinstall limpio)

Código muerto
    ├─ scripts/build-icons.js            → borrar
    ├─ scripts/resources/selection.json  → borrar
    ├─ scripts/ (queda vacío)            → borrar
    └─ package.json scripts.build:icons  → borrar
```

## File Changes

| File                                          | Action | Description                               |
| --------------------------------------------- | ------ | ----------------------------------------- |
| `.nvmrc`                                      | Modify | `v14` → `22`.                             |
| `package.json` → `engines.node`               | Modify | `>=14.0.0` → `>=18.0.0`.                  |
| `package.json` → `resolutions`                | Modify | Eliminar `node-releases`.                 |
| `package.json` → `scripts.storybook`          | Modify | Agregar flag `--openssl-legacy-provider`. |
| `package.json` → `scripts.storybook-web-docs` | Modify | Agregar flag `--openssl-legacy-provider`. |
| `package.json` → `scripts.build:icons`        | Delete | Script muerto.                            |
| `scripts/build-icons.js`                      | Delete | Generador roto/obsoleto.                  |
| `scripts/resources/selection.json`            | Delete | Fuente IcoMoon muerta.                    |
| `.github/workflows/build-status.yml`          | Modify | `node-version` 14 → 22 (línea 13).        |
| `.github/workflows/coverage-status.yml`       | Modify | `node-version` 14 → 22 (línea 13).        |
| `.github/workflows/npm-publish.yml`           | Modify | 3 ocurrencias: líneas 18, 31, 65.         |
| `.github/workflows/npm-publish-beta.yml`      | Modify | 2 ocurrencias: líneas 17, 30.             |
| `.github/workflows/publish-storybook.yml`     | Modify | `node-version` 14 → 22 (línea 30).        |
| `yarn.lock`                                   | Modify | Regenerado tras quitar el resolution.     |

## Interfaces / Contracts

**Sin cambios de contrato.** La API pública del paquete, sus `peerDependencies` (`react`,
`react-dom`, `styled-components`) y el `dist/` (ESM/UMD) no se tocan. `engines.yarn: >=1.22.0`
se mantiene (Yarn 1, compatible con Node 22). Para los consumidores (p. ej. Janis Views) la
migración es transparente: misma versión de API, mismo bundle.

## Testing / Verification Strategy

| Layer           | What                                 | Approach                                                                        |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| Install         | Resolución de deps sin el resolution | `yarn install` limpio en Node 22, **sin** `--ignore-engines`.                   |
| Unit            | Suite de tests                       | `yarn test-ci` en Node 22; revisar diffs de snapshots (Enzyme).                 |
| Build (paquete) | Bundle publicable                    | `yarn build`; verificar `dist/` (Rollup 2, sin hash → OK).                      |
| Build (docs)    | Storybook dev + estático             | `yarn storybook` levanta; `yarn storybook-web-docs` buildea (webpack 4 + flag). |
| CI              | Los 5 workflows en verde             | Primer push tras el bump; validar job de release de Storybook.                  |

## Migration / Rollout

Rollout en un solo commit/PR. No hay migración de datos ni de API. **Rollback:** `git revert` del
commit restaura Node 14 en todos los pines; como el `dist/` publicado no cambia, no hay impacto en
consumidores. El flag OpenSSL y la eliminación de `build-icons` se revierten con el mismo revert.

## Riesgos de diseño abiertos (a cerrar en ejecución)

1. **`--openssl-legacy-provider` en `NODE_OPTIONS`** puede ser rechazado por Node 22.x → plan B
   listo (flag CLI directo).
2. **Storybook 6 / webpack 4 en Node 22** más allá del md4: punto más frágil; validar ambos
   scripts de Storybook antes de dar por cerrado.
3. **`bitovi/github-actions-storybook-to-github-pages@v1.0.3`** corre Storybook en su propio
   entorno: verificar que respete el flag del script y qué Node usa internamente.

---

**Status**: draft
**Summary**: Migración de tooling Node 14 → 22; Storybook 6 con flag OpenSSL en scripts; quita `resolutions` y código muerto `build-icons`; sin cambios de API ni de `dist/`.
**Artifacts**: `openspec/changes/migracion-node-22/design.md`
**Next**: tasks
