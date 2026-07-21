# Soporte de Node 22 (tooling de ui-web)

## Purpose

Comportamiento observable del **toolchain** de `@janiscommerce/ui-web` bajo Node 22: instalación,
tests, build del paquete, build de Storybook y CI. Describe **qué** debe cumplir el paquete
corriendo en Node 22, no cómo se implementa. No cubre la API pública del paquete (que no cambia).

## Requirements

### Requirement: Piso de Node declarado

El paquete **MUST** declarar Node 22 como piso soportado en su configuración local y de engines.
El paquete **MUST NOT** dejar pines a Node 14 en `.nvmrc`, `engines.node` ni en los workflows de CI.

#### Scenario: Configuración de versión coherente

- GIVEN el repositorio migrado
- WHEN se inspeccionan `.nvmrc`, `package.json` → `engines.node` y los 5 workflows de `.github/workflows/`
- THEN `.nvmrc` **MUST** ser `22`
- AND `engines.node` **MUST** ser `>=22.0.0`
- AND ninguna ocurrencia de `node-version` en los workflows **MUST** referenciar `14`

---

### Requirement: Instalación limpia sin flags de escape

Con Node 22, `yarn install` **MUST** completar sin errores de engine y **sin** requerir
`--ignore-engines`. El `resolutions` de `node-releases` **MUST** haber sido eliminado.

#### Scenario: Install reproducible en Node 22

- GIVEN Node 22 activo y `node_modules` ausente
- WHEN se corre `yarn install` sin `--ignore-engines`
- THEN el install **MUST** terminar con éxito
- AND `package.json` **MUST NOT** contener `resolutions: { "node-releases": ... }`

---

### Requirement: Tests verdes en Node 22

La suite de tests **MUST** pasar en Node 22 con el toolchain actual (Jest 27 + Enzyme + jsdom),
sin cambios de versión de esas herramientas.

#### Scenario: `yarn test-ci` en Node 22

- GIVEN Node 22 activo y dependencias instaladas
- WHEN se corre `yarn test-ci`
- THEN todos los tests **MUST** pasar
- AND cualquier cambio de snapshot **MUST** tener justificación semántica antes de aceptarse

---

### Requirement: Build del paquete en Node 22

El build de publicación **MUST** generar los bundles ESM y UMD en Node 22 sin errores.

#### Scenario: `yarn build` produce `dist/`

- GIVEN Node 22 activo
- WHEN se corre `yarn build`
- THEN **MUST** generarse `dist/index.esm.js` y `dist/index.umd.js`
- AND el build **MUST NOT** fallar por incompatibilidad de OpenSSL 3 (Rollup no usa hash md4)

---

### Requirement: Storybook operativo en Node 22 vía flag de compatibilidad

Storybook (dev y build estático) **MUST** ejecutar en Node 22. El flag
`--openssl-legacy-provider` **MUST** estar definido en los scripts de `package.json`
(`storybook` y `storybook-web-docs`), no en los archivos de workflow, de modo que todos los
puntos de invocación lo hereden.

#### Scenario: Storybook dev levanta

- GIVEN Node 22 activo
- WHEN se corre `yarn storybook`
- THEN Storybook **MUST** levantar sin `ERR_OSSL_EVP_UNSUPPORTED`

#### Scenario: Storybook estático buildea

- GIVEN Node 22 activo
- WHEN se corre `yarn storybook-web-docs`
- THEN **MUST** generarse el sitio estático en `docs/` sin error

#### Scenario: El flag vive en el script, no en el YAML

- GIVEN los scripts de Storybook y los workflows
- WHEN se inspecciona dónde está `--openssl-legacy-provider`
- THEN **MUST** estar en los scripts `storybook` / `storybook-web-docs` de `package.json`
- AND **MUST NOT** depender de definirse dentro de un `.yml` para funcionar en release

---

### Requirement: CI verde en Node 22

Los 5 workflows **MUST** ejecutar en Node 22. El job de release que despliega Storybook
(`build-and-deploy-storybooks` en `npm-publish.yml`) **MUST** buildear Storybook correctamente en Node 22.

#### Scenario: Pipelines de push

- GIVEN la rama migrada empujada al remoto
- WHEN corren `build-status` y `coverage-status`
- THEN ambos **MUST** terminar en verde con Node 22

#### Scenario: Deploy de Storybook en release

- GIVEN un tag que dispara `npm-publish.yml`
- WHEN corre el job `build-and-deploy-storybooks`
- THEN el build de Storybook **MUST** completar en Node 22 (heredando el flag del script)

---

### Requirement: Sin código muerto de `build-icons`

El paquete **MUST NOT** conservar el script `build-icons` ni su fuente, por estar roto y obsoleto.

#### Scenario: `build-icons` eliminado

- GIVEN el repositorio migrado
- WHEN se inspecciona el repo
- THEN `scripts/build-icons.js` y `scripts/resources/selection.json` **MUST NOT** existir
- AND `package.json` **MUST NOT** contener el script `build:icons`
- AND el `icons.json` en uso (`src/components/Icon/icons.json`) **MUST** permanecer intacto

---

### Requirement: Contrato del paquete sin cambios

La migración **MUST** ser transparente para los consumidores: API pública, `peerDependencies` y
`dist/` publicado no cambian.

#### Scenario: API y bundle estables

- GIVEN la versión migrada del paquete
- WHEN un consumidor la instala
- THEN la superficie pública de componentes **MUST** ser la misma que antes de la migración
- AND las `peerDependencies` (`react`, `react-dom`, `styled-components`) **MUST NOT** cambiar

---

| Métrica    | Valor |
| ---------- | ----- |
| Requisitos | 8     |
| Escenarios | 11    |
