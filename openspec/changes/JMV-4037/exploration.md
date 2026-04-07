## Exploration: JMV-4037 — Consolidar ErrorBoundary en ui-web

### Fuente Jira

| Campo | Valor |
|--------|--------|
| **Issue** | [JMV-4037](https://janiscommerce.atlassian.net/browse/JMV-4037) |
| **Título** | Consolidar ErrorBoundary en ui-web |
| **Proyecto** | JMV (Janis Views) |
| **Épica** | [JMV-3949](https://janiscommerce.atlassian.net/browse/JMV-3949) — Deuda Técnica |
| **Tipo** | Historia |

**Objetivo (ticket):** El ErrorBoundary oficial vive en `@janiscommerce/ui-web`, con contrato genérico: `message` como string opaca (lista para mostrar), `errorContent` para UI custom, `DefaultError` corregido con tipografía del theme del paquete, y refactor hacia enfoque funcional/legible respetando las limitaciones de los error boundaries en React.

**Criterios de aceptación (ticket):**

- Comparación Views vs ui-web documentada en la descripción del issue; contrato genérico: sin `translationHOC` en el paquete; Views traduce o usa `errorContent`.
- `DefaultError` en ui-web usa componentes/tokens de tipografía del paquete (sin `<p>` con props HTML inválidas); mensaje default acordado (literal o prop documentada).
- `ErrorBoundary` refactorizado a enfoque funcional legible: `react-error-boundary` **o** fachada funcional + clase interna mínima; misma semántica que hoy (`children`, `errorContent`, `message`).
- Tests en ui-web: sin `children`; error con fallback por defecto; error con `message` custom; error con `errorContent`; sin error muestra `children`; spy/mute `console.error` donde aplique.
- Janis Views migra imports a `@janiscommerce/ui-web`; ajusta usos que pasaban keys en `message`; `SectionError`/`NotFoundError` permanecen en app si no se deciden mover.
- CHANGELOG + semver en ui-web; bump dependencia en Views; CI verde en ambos repos.

**Flujo acordado en este repo:** la entrada en `CHANGELOG.md` y el bump de versión en `package.json` de ui-web se hacen **tras merge del PR a `master`**, no en la rama de feature antes del PR.

**Hallazgo del ticket (núcleo):** Props y máquina de estados del boundary ya están alineadas entre Janis Views y ui-web. Diferencias relevantes: `DefaultError` (Views usa i18n/`Text`; ui-web trata `message` como string y hoy tiene el bug de `<p color fontSize>`), y piezas solo de app (`SectionError`, `NotFoundError`, etc.).

**Opciones explícitas en ticket para “clase → legible”:** (1) `react-error-boundary` si el equipo aprueba; (2) fachada funcional exportada + subcomponente de clase mínimo; (3) mantener clase sin dependencias nuevas, documentando el motivo.

**Fuera de alcance del paquete:** `SectionError`, `NotFoundError`, assets estáticos, mapas de status, etc. — siguen en Views vía `errorContent` o imports locales.

---

### Referencia local: snapshot Janis Views (`docs/history/ErrorBoundary-views/`)

En el repo se agregó una copia de referencia del módulo tal como vive hoy en Janis Views. Sirve para comparar línea a línea con `src/components/ErrorBoundary/` **sin** acoplar ui-web a imports de Views (`hocs`, `utils/string`, `components/Text`, `devices`, etc.).

| Archivo (referencia) | Contenido | ¿Aplica a ui-web? |
|----------------------|-----------|-------------------|
| `ErrorBoundary.js` | Misma lógica que ui-web: `propTypes`, estado `hasError`, `getDerivedStateFromError`, `componentDidCatch`, `render` (null sin children; error → `message` ? `DefaultError` : `errorContent`). | **Sí — ya equivalente.** Solo difieren comentarios/idioma de propTypes: en Views `message` se documenta como texto *o key* de traducción; en ui-web debe documentarse solo **string opaca** (consumidor traduce). |
| `DefaultError.js` | `translationHOC`, `isTranslationKey`, `t()`, componente `Text` con `color`/`fontSize` del design system de Views. Default `views.error.loadingError`. | **Reimplementar en ui-web:** mismo layout visual (Wrapper + Icon + texto) que en referencia, pero **sin** HOC ni detección de keys; texto = `message` tal cual. Tipografía vía **theme del paquete** (p. ej. `theme/palette` + `theme/typography` en un `styled` element, patrón como en `Input/styles.js`). |
| `styles.js` | `export default`: `Wrapper` + `Icon` — **igual en intención** al `styles.js` actual de ui-web. `export const SectionError`: estilos grandes para pantallas de sección. | ui-web: **mantener solo** el objeto default (Wrapper/Icon). **No** portar `SectionError` al paquete. |
| `SectionError.js` | Layout de error de sección + imagen + `translationHOC`. | **No** — permanece en Janis Views; puede seguir importando estilos propios o pasarse como `errorContent` al boundary del paquete. |
| `NotFoundError.js` | 404, `map`, assets `/static/`, `translationHOC`. | **No** — solo app. |
| `index.js` | `export { default } from './ErrorBoundary'` | Mismo patrón que ui-web. |
| `ErrorBoundary.test.js` | Casos básicos; fallback default espera copy i18n (`Loading error` vía mock de traducción). | **No copiar tal cual** a ui-web: ui-web ya tiene tests más completos (`message` custom, etc.); tras consolidación, Views deberá testear contra el paquete y mocks de i18n donde corresponda. |

**Implementación práctica en ui-web (derivado de la referencia):**

- **Paridad de boundary:** No hace falta cambiar semántica respecto a `docs/history/ErrorBoundary-views/ErrorBoundary.js`; cualquier refactor “funcional” es envoltorio o librería, no cambio de contrato.
- **DefaultError:** Tomar la **estructura** de la referencia (ícono `exclamation_circle`, `color="statusRed"`, texto secundario alineado) y sustituir `Text` por estilos con tokens (`palette.statusRed`, `typography.size.baseSmall`, `typography.fontFamily`).
- **Mensaje por defecto (ui-web):** Para esta entrega queda **congelado** el literal actual `something went wrong error` (decisión 2026-04-07). En Views sigue siendo key i18n hasta migrar a string resuelto al consumir el paquete.

---

### Current State (código ui-web)

- `ErrorBoundary` en `src/components/ErrorBoundary/ErrorBoundary.js` coincide con la referencia Views salvo idioma de comentarios/propTypes y la aclaración de que `message` no es key i18n en el paquete.
- `DefaultError` (`DefaultError.js` + `styles.js`): mismo layout compacto que la referencia (Wrapper + Icon), pero el texto usa `<p color="..." fontSize="...">` (inválido en HTML); la referencia evita eso usando `Text` de Views.
- Uso interno: `src/components/HTML/HTML.js` envuelve `Frame` y pasa `errorMessage` → `message`.
- Export público: `src/components/index.js`.
- Tests: `ErrorBoundary.test.js` ya cubre más que la referencia de Views; falta caso explícito con `errorContent` custom según AC del ticket.

---

### Affected Areas

- `src/components/ErrorBoundary/ErrorBoundary.js` — núcleo; posible wrapper o `react-error-boundary`.
- `src/components/ErrorBoundary/DefaultError.js` — alinear con estructura de referencia + tokens de theme (sin HOC).
- `src/components/ErrorBoundary/styles.js` — solo rama default tipo referencia; no añadir `SectionError`.
- `src/components/ErrorBoundary/ErrorBoundary.test.js` — ampliar según AC (p. ej. `errorContent`).
- `docs/history/ErrorBoundary-views/` — **solo documentación de referencia**; no forma parte del bundle publicado.
- `package.json` — si se adopta `react-error-boundary`.
- `src/components/HTML/HTML.js` — `message` como string final.
- `src/components/index.js` — export estable.
- **Repo Janis Views:** eliminar duplicado de boundary/DefaultError alineado a paquete; conservar `SectionError` / `NotFoundError` y su `styles` de sección; migrar imports a `@janiscommerce/ui-web`.

---

### Approaches

1. **`react-error-boundary`** — Mapear API a `errorContent` + `message` + `DefaultError`; `DefaultError` sigue el layout de la referencia con tokens ui-web.
   - Pros: Alineado al ticket si se aprueba la dependencia.
   - Cons: Nueva dependencia y coordinación de versión.
   - Effort: **Medium**

2. **Fachada funcional + clase interna mínima** — Misma semántica que `ErrorBoundary.js` de la referencia; capa externa legible.
   - Pros: Sin deps; contrato idéntico al snapshot Views.
   - Cons: Mantener clase interna documentada.
   - Effort: **Low–Medium**

3. **Mantener clase única** — Solo endurecer `DefaultError` + propTypes (string opaca) como en ticket.
   - Pros: Mínimo riesgo.
   - Cons: No satisface preferencia “funcional” sin negociación.
   - Effort: **Low**

---

### Recommendation

Usar **`docs/history/ErrorBoundary-views/`** como **fuente de verdad de paridad de comportamiento** del boundary y de **layout de `DefaultError`**, descartando explícitamente `SectionError`, `NotFoundError` y cualquier import de Views. Prioridad de entrega: **corregir `DefaultError` con theme del paquete** (equivalente visual a referencia) + **documentar `message`**; luego **(2)** o **(1)** según decisión de dependencias. Migración en Janis Views en paralelo según AC.

---

### Risks

- **Cross-repo:** Coordinar release ui-web + bump Views.
- **Copy del fallback default:** Sin cambio planificado en ui-web para esta entrega (menor riesgo de snapshots).
- **Drift:** Si la referencia en `docs/history/` deja de actualizarse, conviene anotar en comentario o README del folder la fecha/commit de origen.

---

### Ready for Proposal

**Sí.** Ticket JMV-4037 + snapshot en `docs/history/ErrorBoundary-views/` fijan alcance y paridad esperada. Siguiente: **sdd-propose** con rollback, lista de archivos ui-web y tareas explícitas en Views (import package, retirar duplicados del boundary, mantener SectionError/NotFoundError).

---

## Exploration: JMV-4037 (formato orquestador)

### Current State

El boundary en ui-web es lógicamente igual al de Janis Views (referencia en `docs/history/ErrorBoundary-views/ErrorBoundary.js`). `DefaultError` en ui-web debe alinearse al layout de la referencia pero sin i18n, usando tokens de theme en lugar de `Text` o `<p>` con props inválidas. `SectionError` / `NotFoundError` y su bloque de estilos en `styles.js` de la referencia **no** se consolidan en el paquete.

### Affected Areas

- `src/components/ErrorBoundary/*` — implementación y tests.
- `docs/history/ErrorBoundary-views/*` — referencia solo lectura.
- Janis Views (otro repo) — migración y piezas que permanecen en app.

### Approaches

1. **`react-error-boundary`** — Pros: declarativo. Cons: dependencia. Effort: **Medium**
2. **Fachada funcional + clase mínima** — Pros: sin deps, paridad con referencia. Cons: capa extra. Effort: **Low–Medium**
3. **Clase única + DefaultError corregido** — Pros: simple. Cons: menos “funcional”. Effort: **Low**

### Recommendation

Paridad con snapshot Views para boundary y layout de `DefaultError`; sin portar componentes de app. DefaultError con `theme/palette` + `theme/typography`; refactor (2) o (1) según equipo.

### Risks

- Coordinación ui-web / Views; literal default de ui-web congelado, Views debe pasar strings resueltos al adoptar el paquete.
- Referencia histórica desactualizada si Views cambia sin actualizar `docs/history/`.

### Ready for Proposal

**Sí.**

---

**Status**: success  
**Executive summary**: Exploración actualizada con snapshot Janis Views en `docs/history/ErrorBoundary-views/`: mapeo archivo a archivo, qué se porta a ui-web y qué permanece en Views; guía para `DefaultError` con tokens del paquete.  
**Artifacts**: `openspec/changes/JMV-4037/exploration.md`  
**Next recommended**: sdd-propose  
**Risks**: Cross-repo; drift de la carpeta `docs/history/` si no se versiona el origen.  
**Skill resolution**: none — skill sdd-explore adjunto; sin Project Standards inyectados.
