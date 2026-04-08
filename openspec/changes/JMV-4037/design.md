# Design: JMV-4037 — ErrorBoundary / DefaultError (fase clase)

## Technical Approach

Implementar el fallback de error con **styled-components** que lean `theme/palette` y `theme/typography`, igual que otros componentes (`Input/styles.js`). `DefaultError` deja de usar `<p>` con atributos inventados; el `ErrorBoundary` permanece **class component** sin cambios de flujo: mismo estado `hasError`, misma rama `message ? <DefaultError message /> : errorComponent`. Documentar en propTypes que `message` es texto final (no key i18n). Añadir test de `errorComponent` cuando no hay `message`.

## Architecture Decisions

| Decision                | Choice                                                                   | Alternatives                                      | Rationale                                                                             |
| ----------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Boundary implementation | Mantener clase única                                                     | Fachada funcional; `react-error-boundary`         | Acordado en propuesta (fase 2); cero churn de ciclo de vida.                          |
| Estilo del mensaje      | `styled.span` (o similar) en `styles.js` con tokens                      | Componente `Text` nuevo en ui-web; estilos inline | No existe `Text` en el paquete; patrón ya establecido con palette/typography imports. |
| Default copy            | **Congelado:** `Something went wrong` (implementación y tests actuales)   | Otro literal                                      | Literal efectivo en `DefaultError`; alinear spec/documentación a este valor.          |
| Ellipsis en mensaje     | **No** en esta entrega                                                   | `text-overflow: ellipsis` explícito               | Decisión 2026-04-07; basta overflow del `Wrapper` existente.                          |
| `message` vacío (`""`)  | Sin cambio: `message ?` sigue siendo falsy                               | Forzar `DefaultError` siempre                     | Evita scope creep; comportamiento legacy documentable en spec.                        |

## Data Flow

```
Child throws
    → getDerivedStateFromError → hasError true
    → render:
         hasError && message  → <DefaultError message={message} />
         hasError && !message → errorComponent (default <DefaultError />)
    → componentDidCatch → console.error
```

Sin `children` → `null` (sin cambios).

## File Changes

| File                                                 | Action                           | Description                                                                                                                             |
| ---------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ErrorBoundary/styles.js`             | Modify                           | Importar `palette`, `typography`; exportar `Message` styled (`statusRed`, `baseSmall`, `fontFamily`); **sin** ellipsis explícito.       |
| `src/components/ErrorBoundary/DefaultError.js`       | Modify                           | Usar `<styled.Message>{message}</styled.Message>`; sin lógica i18n.                                                                     |
| `src/components/ErrorBoundary/ErrorBoundary.js`      | Modify                           | propTypes/comentarios: `message` = string para mostrar; comentario JSDoc breve: límites de hooks en boundaries (fase funcional futura). |
| `src/components/ErrorBoundary/ErrorBoundary.test.js` | Modify                           | Caso: hijo que lanza, **sin** `message`, `errorComponent={<elemento reconocible>}` → assert texto/markup del custom.                    |
| `CHANGELOG.md`                                       | Modify **tras merge a `master`** | Entrada usuario-facing (no en rama de feature antes del PR).                                                                            |
| `package.json`                                       | Modify **tras merge a `master`** | Bump versión según política.                                                                                                            |

## Interfaces / Contracts

**Props públicas (sin cambio de firma):**

- `children`: elemento(s) opcional; sin ellos el boundary no renderiza nada.
- `errorComponent`: elemento React; fallback cuando hay error y **`message` es falsy** (incl. `undefined`/`null`/`""`).
- `message`: `string` — **MUST** interpretarse como cadena ya resuelta para UI; el paquete **MUST NOT** traducir ni detectar keys.

**DefaultError:** recibe `message: string`; literal por defecto **permanece** `Something went wrong` (valor en código).

## Testing Strategy

| Layer       | What                                | Approach                                                                       |
| ----------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| Unit        | DefaultError render + clases/tokens | Snapshot o assert `textContent` + color vía styled (opcional: enzyme tree).    |
| Unit        | ErrorBoundary ramas                 | Mantener Bomb pattern; añadir `errorComponent`; spy `console.error` existente. |
| Integration | —                                   | No aplica en este cambio.                                                      |
| E2E         | —                                   | No aplica (librería).                                                          |

## Migration / Rollout

No migración de datos. Consumidores que pasaban keys i18n a `message` **deben** pasar string resuelto o usar `errorComponent` (Janis Views en otro PR). Rollback: versión anterior del paquete.

## Decisiones resueltas (2026-04-07)

1. **Literal por defecto:** `Something went wrong` (fuente de verdad: `DefaultError.js`).
2. **Ellipsis:** no se implementa en el mensaje en esta entrega.

---

**Status**: success  
**Summary**: Diseño con tokens theme; boundary clase; test `errorComponent`; copy y ellipsis acotados por decisión explícita.  
**Artifacts**: `openspec/changes/JMV-4037/design.md`  
**Next**: sdd-tasks  
**Risks**: String vacío en `message` (rama `errorComponent`).  
**Skill resolution**: none
