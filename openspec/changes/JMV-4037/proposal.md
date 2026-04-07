# Proposal: JMV-4037 — ErrorBoundary en ui-web (fase clase)

## Intent

Alinear `@janiscommerce/ui-web` con [JMV-4037](https://janiscommerce.atlassian.net/browse/JMV-4037): fallback genérico con tipografía del theme, `message` como string opaca (sin i18n en el paquete), tests según AC. **El boundary sigue siendo class component**; enfoque funcional o `react-error-boundary` queda **para una fase posterior**.

## Scope

### In Scope

- `DefaultError`: texto con `theme/palette` + `theme/typography` (layout como `docs/history/ErrorBoundary-views/`), sin `<p>` con props inválidas.
- `ErrorBoundary.js`: clase sin refactor estructural; propTypes/comentarios: `message` lista para mostrar; nota breve (React sin hooks para `componentDidCatch`).
- Tests: añadir `errorContent` custom; `console.error` muteado donde ya aplica.
- CHANGELOG y bump de `package.json` **después** de merge del PR a `master` (no en la rama de feature).

### Out of Scope

- Fachada funcional, `react-error-boundary`, clase interna mínima (evaluar después).
- `SectionError` / `NotFoundError` / estilos de sección en el paquete.
- Migración en repo Janis Views (post-release npm).

## Approach

Sin dependencias nuevas: corregir presentación y contrato documentado; semántica de render actual intacta.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `ErrorBoundary/DefaultError.js` | Modified | Tokens theme. |
| `ErrorBoundary/styles.js` | Modified | Estilo del mensaje si hace falta. |
| `ErrorBoundary/ErrorBoundary.js` | Modified | Docs propTypes + nota fase 2. |
| `ErrorBoundary/ErrorBoundary.test.js` | Modified | Caso `errorContent`. |
| `CHANGELOG.md`, `package.json` | Modified (post-merge `master`) | Entrada y semver tras PR aprobado. |

## Risks

| Risk | L | Mitigation |
|------|---|------------|
| Copy default cambia expectativas | Baja | Literal congelado; solo riesgo si alguien lo cambia sin acuerdo. |
| Apps pasan keys a `message` | M | Doc contrato; migración Views aparte. |

## Rollback Plan

Republicar versión anterior del paquete y fijarla en consumidores; revert del commit. En Views, volver al boundary local hasta nuevo intento.

## Dependencies

Publicar ui-web antes de bump/import en Janis Views.

## Success Criteria

- [ ] `DefaultError` con theme; sin props HTML inválidas en el texto.
- [ ] `message` documentada como string opaca; boundary en clase con nota sobre futuro funcional.
- [ ] Tests: sin children; error default; `message` custom; **`errorContent`**; OK sin error; `console.error` acotado.
- [ ] `yarn test` + `yarn build` OK en la rama del PR.
- [ ] Tras merge a `master`: `CHANGELOG.md` + versión en `package.json` actualizados y publicación npm según flujo del equipo.
