# Proposal: migracion-node-22 — Migrar `@janiscommerce/ui-web` a Node 22

## Intent

Elevar el piso de Node del paquete de **Node 14 (EOL abril 2023)** a **Node 22 LTS** en todos
los frentes (config local, `engines`, CI), dejando el build, los tests y Storybook corriendo en
Node 22 con el **mínimo cambio necesario**. El foco es "que corra en Node 22", no modernizar el
toolchain: los upgrades de Enzyme, Jest y Storybook quedan como trabajo posterior.

## Scope

### In Scope

- `.nvmrc`: `v14` → `22`.
- `package.json` → `engines.node`: `>=14.0.0` → `>=22.0.0`.
- Los 5 workflows de `.github/workflows/` (`build-status`, `coverage-status`, `npm-publish`,
  `npm-publish-beta`, `publish-storybook`): `node-version` `14` → `22`. **Son 9 ocurrencias**,
  no 5 (`npm-publish.yml` tiene 3, `npm-publish-beta.yml` tiene 2), incluido el job
  `build-and-deploy-storybooks` de `npm-publish.yml:65`.
- Eliminar `resolutions: { "node-releases": "2.0.19" }` (existía solo para no romper el engine
  de Node 14) y reinstalar limpio.
- Desbloquear Storybook 6 en Node 22 con `--openssl-legacy-provider`, **en los scripts de
  `package.json`** (`storybook` / `storybook-web-docs`), no en los YAML — así lo heredan los 3
  puntos de invocación (local, `publish-storybook.yml` y el job de release de `npm-publish.yml`).
- **Eliminar `scripts/build-icons.js`, `scripts/resources/selection.json` y el script
  `build:icons` de `package.json`** (ver "Limpieza de código muerto" abajo).
- Verificar `yarn install`, `yarn test`, `yarn build`, `yarn storybook`, `yarn storybook-web-docs`
  en Node 22.

### Out of Scope

- **Upgrade de Storybook 6 → 8** (decidido: parche con flag ahora, upgrade como proyecto aparte).
- **Migración Enzyme → React Testing Library** (Enzyme corre en Node 22; ata a React 17 pero no
  bloquea la migración de Node).
- **Upgrade de Jest 27 → 29** (Jest 27 corre en Node moderno; el upgrade se trata por separado).
- **Upgrade de React 17 → 18** y de Rollup 2 → 4 (no requeridos por Node 22).

## Approach

Sin dependencias nuevas. La migración es de configuración + un flag de compatibilidad para
Storybook. El único cambio de dependencias es **remover** un `resolution`, no agregar. El riesgo
real no está en los cambios en sí, sino en lo que se destapa al reinstalar sin el pin de
`node-releases` y correr el toolchain en Node 22 — se valida ejecutando cada script.

## Limpieza de código muerto: `build-icons`

Durante la validación se detectó que **`build:icons` está roto y obsoleto desde hace ~4.5 años**,
por causas ajenas a Node. Se elimina en vez de arreglarse. Evidencia:

- `scripts/build-icons.js:3` usa `require('chalk')`, pero `chalk@5` es ESM-only → falla con
  `ERR_REQUIRE_ESM` **ya en Node 14** (reproducido). No es una regresión de Node 22.
- El script escribe en `src/web/components/Icon/icons.json`, ruta que **no existe**: el repo se
  reorganizó a `src/components/Icon/`. Aunque se arreglara chalk, escribiría en el lugar equivocado.
- Fuente vs. output **divergieron**: `scripts/resources/selection.json` (export IcoMoon) tiene
  267 iconos y no se toca desde nov-2021; el `icons.json` real en uso tiene 283 y se sigue
  editando **a mano** (último commit `02040dc`, hace días, agregó iconos directo al JSON).
- El único consumidor de `selection.json` en el repo es este script. El pipeline
  IcoMoon → `selection.json` → `build-icons.js` → `icons.json` está abandonado.

**Acción:** borrar `scripts/build-icons.js`, `scripts/resources/selection.json` (carpeta `scripts/`
queda vacía → se elimina) y el entry `"build:icons"` de `package.json`. Todo queda en el historial
de git por si alguna vez se retoma el flujo IcoMoon.

## Affected Areas

| Area                                     | Impact   | Description                                      |
| ---------------------------------------- | -------- | ------------------------------------------------ |
| `.nvmrc`                                 | Modified | `v14` → `22`.                                    |
| `package.json` → `engines`               | Modified | `node: >=22.0.0`.                                |
| `package.json` → `resolutions`           | Modified | Eliminar `node-releases`.                        |
| `package.json` → `scripts` (storybook)   | Modified | Flag `--openssl-legacy-provider` en los scripts. |
| `package.json` → `scripts` (build:icons) | Removed  | Script muerto (ver Limpieza de código muerto).   |
| `scripts/build-icons.js`                 | Removed  | Generador roto y obsoleto.                       |
| `scripts/resources/selection.json`       | Removed  | Fuente IcoMoon muerta, divergida del output.     |
| `.github/workflows/*.yml` (5 archivos)   | Modified | `node-version` `14` → `22` (9 ocurrencias).      |
| `yarn.lock`                              | Modified | Regenerado tras quitar el resolution.            |

## Risks

| Risk                                                          | L    | Mitigation                                                                                                                                                                                       |
| ------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Al quitar `node-releases` una transitiva pide Node ≥16/18     | Baja | Node 22 ya cumple; solo importaría si el lock queda inconsistente. Reinstalar limpio y revisar `yarn why`.                                                                                       |
| Storybook 6 sigue fallando pese al flag (webpack 4)           | M    | El flag es el fix conocido para el md4/OpenSSL3, pero webpack 4 tiene otros bordes con Node 22; validar `yarn storybook` Y `yarn storybook-web-docs`. Es el punto más frágil del plan.           |
| Node 22 rechaza `--openssl-legacy-provider` en `NODE_OPTIONS` | M    | Node 17+ en varios casos rechaza ese flag dentro de `NODE_OPTIONS` (`not allowed in NODE_OPTIONS`). Plan B: pasarlo como flag CLI a la herramienta, no vía env. Confirmar en la 22.x del runner. |
| Jest 27 + jsdom en Node 22                                    | Baja | `engines` de jest 27 no excluye 22; sin incompatibilidad determinista conocida. Correr `yarn test-ci` y revisar diffs de snapshots.                                                              |
| CI en verde local pero rojo en runner (cache yarn)            | Baja | Los workflows usan `cache: 'yarn'`; validar el primer push tras el bump.                                                                                                                         |

## Rollback Plan

Revert del commit de migración: restaura `.nvmrc`, `engines`, `resolutions`, scripts y workflows
a Node 14. El paquete publicado no cambia de contrato (misma API, mismo `dist/`), así que no hay
impacto en consumidores — la migración es de tooling, no de runtime del paquete.

## Dependencies

Ninguna externa. No requiere publicar nada antes ni coordinar con otros repos: es un cambio
interno de tooling de `ui-web`.

## Success Criteria

- [ ] `yarn install` limpio en Node 22, sin errores de engine y **sin** `--ignore-engines`.
- [ ] `yarn test` (o `yarn test-ci`) pasa en Node 22.
- [ ] `yarn build` genera `dist/` correctamente en Node 22.
- [ ] `yarn storybook` levanta y `yarn storybook-web-docs` buildea en Node 22.
- [ ] `resolutions: node-releases` eliminado del `package.json`.
- [ ] `scripts/` y el script `build:icons` eliminados.
- [ ] Las 9 ocurrencias de Node en los 5 workflows apuntan a Node 22 y CI queda en verde en el primer push.
