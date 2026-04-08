# Error boundary (paquete ui-web)

## Purpose

Comportamiento observable del `ErrorBoundary` y del fallback genérico de error en `@janiscommerce/ui-web` (JMV-4037, fase clase). Describe **qué** debe cumplir el paquete, no **cómo** está implementado.

## Requirements

### Requirement: Semántica opaca de `message`

El paquete **MUST** tratar la prop `message` como texto final para mostrar. El paquete **MUST NOT** traducir ni resolver `message` como key de i18n.

#### Scenario: Mensaje personalizado tras error

- GIVEN un `ErrorBoundary` cuyo hijo lanza en render
- WHEN `message` es `"ErrX"`
- THEN el resultado **MUST** contener el texto `ErrX`

#### Scenario: Cadena tipo key sin resolución

- GIVEN un `ErrorBoundary` cuyo hijo lanza
- WHEN `message` es `views.error.loading`
- THEN el resultado **MUST** mostrar el literal `views.error.loading`

---

### Requirement: Copy por defecto del fallback genérico

Cuando aplica el fallback genérico integrado sin `message` truthy en el boundary, el texto visible **MUST** incluir exactamente `something went wrong error`.

#### Scenario: Error sin `message`

- GIVEN un `ErrorBoundary` cuyo hijo lanza
- WHEN `message` no se pasa o es falsy
- AND se usa el fallback por defecto del paquete
- THEN el texto visible **MUST** incluir `something went wrong error`

---

### Requirement: `errorComponent` si `message` es falsy

Si el hijo lanza y `message` es falsy, el paquete **MUST** renderizar el `errorComponent` suministrado por el consumidor según el contrato del boundary.

#### Scenario: Fallback custom

- GIVEN `errorComponent` con un texto único reconocible
- AND no hay `message` truthy
- WHEN el hijo lanza
- THEN el resultado **MUST** contener ese texto único

---

### Requirement: Sin hijos

Sin `children`, el boundary **MUST** producir render vacío.

#### Scenario: Mount sin children

- GIVEN `ErrorBoundary` sin `children`
- WHEN se monta
- THEN **MUST** ser render vacío

---

### Requirement: Sin error

Sin error bajo el boundary, **MUST** renderizarse los `children`.

#### Scenario: Árbol estable

- GIVEN hijo válido
- WHEN no hay error
- THEN el resultado **MUST** conservar ese hijo

---

### Requirement: Estilo del texto de error (fallback compacto)

El texto del mensaje en el fallback compacto por defecto **MUST** aplicar color y tamaño de fuente del theme del paquete para estado de error (no basta texto plano sin estilos de librería).

#### Scenario: Mensaje por defecto visible y estilizado

- GIVEN hijo que lanza y fallback genérico por defecto
- WHEN se renderiza
- THEN el nodo del mensaje **MUST** reflejar color de error y tamaño tipográfico del theme del paquete

---

### Requirement: Sin ellipsis en el contrato (esta entrega)

El contrato del fallback compacto por defecto **MUST NOT** incluir, en esta entrega, truncado del mensaje mediante `text-overflow: ellipsis`.

#### Scenario: Sin ellipsis requerida

- GIVEN el fallback compacto por defecto
- WHEN se valida el comportamiento publicado
- THEN el mensaje **MUST NOT** depender de ellipsis como mecanismo de truncado obligatorio

---

| Métrica    | Valor |
| ---------- | ----- |
| Requisitos | 7     |
| Escenarios | 9     |
