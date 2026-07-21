# Tasks: migracion-node-22 — Migrar `@janiscommerce/ui-web` a Node 22

> Orden: limpieza de código muerto → bump de Node (config + CI) → flag Storybook → quitar
> resolution y reinstalar → **verificación en Node 22 real** (cierra los riesgos no confirmables
> estáticamente). TDD desactivado en `openspec/config.yaml`; `test_command: yarn test`.

## Phase 1: Limpieza de código muerto (`build-icons`)

- [x] 1.1 Borrar `scripts/build-icons.js`.
- [x] 1.2 Borrar `scripts/resources/selection.json`; si `scripts/` queda vacía, eliminar la carpeta.
- [x] 1.3 En `package.json`, eliminar el script `"build:icons": "node scripts/build-icons"` (línea 24).
- [x] 1.4 Verificar que nada más referencie `build-icons` / `selection.json`:
      `grep -rn "build-icons\|selection.json" --exclude-dir=node_modules .` no debe devolver
      referencias vivas (fuera de docs del change).

## Phase 2: Bump de Node — configuración local

- [x] 2.1 `.nvmrc`: `v14` → `22`.
- [x] 2.2 `package.json` → `engines.node`: `>=14.0.0` → `>=18.0.0` (piso de consumo; el desarrollo
      se hace en Node 22 vía `.nvmrc`. Mantener `engines.yarn` igual).

## Phase 3: Bump de Node — CI (9 ocurrencias en 5 workflows)

- [x] 3.1 `.github/workflows/build-status.yml:13` → `node-version: [22.x]`.
- [x] 3.2 `.github/workflows/coverage-status.yml:13` → `node-version: [22.x]`.
- [x] 3.3 `.github/workflows/npm-publish-beta.yml` → líneas 17 y 30: `node-version: 22.x`.
- [x] 3.4 `.github/workflows/npm-publish.yml` → líneas 18, 31 y **65** (job `build-and-deploy-storybooks`): `22`.
- [x] 3.5 `.github/workflows/publish-storybook.yml:30` → `node-version: '22'`.
- [x] 3.6 Confirmar 0 restos: `grep -rn "node-version" .github/workflows/ | grep 14` debe salir vacío.

## Phase 4: Desbloqueo de Storybook (flag OpenSSL en scripts)

- [x] 4.1 En `package.json`, prefijar el script `storybook` con
      `NODE_OPTIONS=--openssl-legacy-provider` (queda `start-storybook` con el flag).
- [x] 4.2 Ídem en el script `storybook-web-docs` (queda `build-storybook` con el flag). Así lo
      heredan `publish-storybook.yml` y el job de release `npm-publish.yml:65` sin tocar los YAML.
- [x] 4.3 **No** poner el flag en ningún `.yml` (decisión de diseño: fuente única en el script).

## Phase 5: Quitar `resolutions` y reinstalar limpio

- [x] 5.1 En `package.json`, eliminar `resolutions: { "node-releases": "2.0.19" }` (líneas 125-127);
      si `resolutions` queda vacío, eliminar la clave entera.
- [x] 5.2 Reinstalar limpio en Node 22: `rm -rf node_modules && yarn install` **sin**
      `--ignore-engines`. Debe terminar sin errores de engine (ver [[no-ignore-engines]]).
- [x] 5.3 Si algún error de engine aparece, investigar con `yarn why <pkg>` y resolver con la
      versión compatible — **no** silenciar con `--ignore-engines`. Commitear el `yarn.lock` regenerado.

## Phase 6: Verificación en Node 22 real (cierra riesgos abiertos)

> Requiere Node 22 instalado (`nvm install 22 && nvm use`). Estos pasos no se pueden validar en
> el Node 14 local actual.

- [x] 6.1 `yarn test-ci` en verde. Revisar diffs de snapshots (Enzyme/Jest 27); si cambian sin
      motivo semántico, documentar antes de actualizar.
- [x] 6.2 `yarn build` genera `dist/index.esm.js` + `dist/index.umd.js` correctamente.
- [x] 6.3 `yarn storybook` levanta sin `ERR_OSSL_EVP_UNSUPPORTED`. **Si** Node rechaza el flag en
      `NODE_OPTIONS` (`not allowed in NODE_OPTIONS`), aplicar plan B (flag CLI directo) y re-verificar.
- [x] 6.4 `yarn storybook-web-docs` buildea el estático en `docs/` sin error.
- [ ] 6.5 Verificar que la action `bitovi/github-actions-storybook-to-github-pages@v1.0.3` respeta
      el flag del script y qué Node usa internamente (revisar en el primer run de CI que buildee Storybook).

## Phase 7: CI y cierre

- [ ] 7.1 Push de la rama: confirmar `build-status` y `coverage-status` en verde con Node 22.
- [ ] 7.2 Validar (en un tag de prueba beta si aplica) que `npm-publish-beta` y el deploy de
      Storybook corren en Node 22.
- [x] 7.3 Con todo en verde, eliminar `MIGRACION.md` del root (documento de entendimiento ya
      absorbido por este change).

---

## Tasks Created (resumen)

| Phase     | Tasks  | Focus                                                      |
| --------- | :----: | ---------------------------------------------------------- |
| 1         |   4    | Eliminar `build-icons` (script + fuente + entry)           |
| 2         |   2    | `.nvmrc` + `engines`                                       |
| 3         |   6    | 9 ocurrencias de Node en 5 workflows                       |
| 4         |   3    | Flag OpenSSL en scripts (no YAML)                          |
| 5         |   3    | Quitar `resolutions` + reinstall limpio                    |
| 6         |   5    | **Verificación en Node 22 real** (tests, build, Storybook) |
| 7         |   3    | CI en verde + limpieza de `MIGRACION.md`                   |
| **Total** | **26** |                                                            |

**Orden:** 1 → 2 → 3 → 4 → 5 → 6 → 7. Fases 1-5 son edición de config (sin Node 22); fase 6 es el
gate real que requiere Node 22 instalado; fase 7 cierra CI y elimina el doc de entendimiento.

**Riesgos que se cierran recién en Phase 6:** rechazo del flag en `NODE_OPTIONS` (6.3), webpack 4
en Node 22 (6.3/6.4), Jest 27 + jsdom (6.1), action de terceros de Storybook (6.5).

---

**Status:** draft
**Artifacts:** `openspec/changes/migracion-node-22/tasks.md`
**Next:** spec (`specs/node-22-support/spec.md`)
