# Tasks: JMV-4037 — ErrorBoundary / DefaultError (fase clase)

## Phase 1: Estilos (fundación)

- [x] 1.1 En `src/components/ErrorBoundary/styles.js`, importar `palette` (`theme/palette`) y `typography` (`theme/typography`); exportar `Message` como `styled.span` con `color: palette.statusRed`, `font-size: typography.size.baseSmall`, `font-family: typography.fontFamily`.
- [x] 1.2 Confirmar que `Message` **no** define `text-overflow: ellipsis` ni depende de ellipsis para el contrato (decisión diseño).

## Phase 2: Componentes

- [x] 2.1 En `src/components/ErrorBoundary/DefaultError.js`, reemplazar `<p color=… fontSize=…>` por `<styled.Message>{message}</styled.Message>`; mantener `defaultProps` con `something went wrong error`.
- [x] 2.2 En `src/components/ErrorBoundary/ErrorBoundary.js`, actualizar comentario de `message` en propTypes: texto final para UI, sin i18n en el paquete; añadir nota breve de que React no expone hooks equivalentes a `componentDidCatch` (fase funcional futura).

## Phase 3: Pruebas (cobertura spec `error-boundary`)

- [x] 3.1 En `ErrorBoundary.test.js`, añadir caso: hijo que lanza, **sin** `message`, `errorContent` con texto único → assert contiene ese texto (req. `errorContent` si `message` falsy).
- [x] 3.2 Verificar casos existentes siguen alineados al spec: render vacío sin children; default `something went wrong error`; `message` custom; hijos sin error; `console.error` mockeado.
- [x] 3.3 Si aplica en el repo, comprobar que el nodo de mensaje usa estilos de error del theme (req. estilo del texto) vía snapshot o assert de estilos existente; si no hay patrón, omitir y documentar en verify manual.

## Phase 4: Verificación local y release post-merge

- [ ] 4.1 **Tras merge del PR a `master`:** actualizar `CHANGELOG.md` con entrada usuario-facing (JMV-4037: DefaultError con theme; contrato `message`; literal default sin cambio).
- [ ] 4.2 **Tras merge a `master`:** bump de versión en `package.json` según política del paquete (patch/minor según impacto).
- [x] 4.3 En la rama de feature: ejecutar `yarn test` y `yarn build`; corregir regresiones antes del PR.

---

## Tasks Created (resumen)

| Phase | Tasks | Focus |
|-------|-------|--------|
| 1 | 2 | Estilos `Message` + sin ellipsis |
| 2 | 2 | `DefaultError` + docs `ErrorBoundary` |
| 3 | 3 | Tests vs spec |
| 4 | 1 hecha / 2 post-merge | Tests+build en rama; CHANGELOG y versión solo en `master` |
| **Total** | **8 completadas + 2 pendientes post-merge** | |

**Orden:** 1 → 2 → 3 → 4 (estilos antes de componentes que los consumen; tests tras implementación; TDD desactivado en `openspec/config.yaml`).

**Next:** Completar 4.1–4.2 al mergear a `master`; luego sdd-verify / release npm.

---

**Status:** success  
**Artifacts:** `openspec/changes/JMV-4037/tasks.md`  
**Next recommended:** sdd-apply  
**Skill resolution:** none
