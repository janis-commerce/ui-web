# Diagram Canvas Viewport Specification

## Purpose

Define el comportamiento del viewport inicial (pan/zoom al montar) de `DiagramCanvas`, incluyendo el zoom con el que arranca el diagrama y los límites de zoom permitidos, más allá del auto-encuadre (`fitViewOnMount`) ya existente.

## Requirements

### Requirement: Zoom inicial configurable

Cuando `config.initialZoom` es un número, el sistema MUST centrar el viewport sobre el bounding box de los nodos iniciales y aplicar ese zoom exacto al montar, en lugar del zoom auto-calculado por el encuadre automático.

#### Scenario: initialZoom fija el zoom y centra sobre los nodos

- GIVEN un `DiagramCanvas` con nodos ubicados lejos del origen del canvas y `config.initialZoom = 1.5`
- WHEN el componente termina de montar y todos los nodos fueron medidos
- THEN el viewport queda centrado en el punto medio del bounding box de esos nodos
- AND el nivel de zoom del viewport es exactamente `1.5`

#### Scenario: initialZoom ausente preserva el comportamiento actual

- GIVEN un `DiagramCanvas` con `config.initialZoom` no definido
- WHEN el componente monta
- THEN el viewport se ajusta según `fitViewOnMount` como hoy (sin cambios de comportamiento)

#### Scenario: initialZoom se aplica una sola vez por instancia

- GIVEN un `DiagramCanvas` ya montado con `config.initialZoom` aplicado
- WHEN se agregan o modifican nodos después del mount (sin remontar el componente)
- THEN el sistema MUST NOT volver a forzar el centro/zoom inicial

#### Scenario: diagrama sin nodos

- GIVEN un `DiagramCanvas` con `nodes = []` y `config.initialZoom` definido
- WHEN el componente monta
- THEN el sistema MUST NOT intentar centrar ni fijar zoom (no hay bounds válidos)
- AND no debe lanzar ningún error

### Requirement: Límites de zoom configurables

El sistema MUST aceptar `config.minZoom` y `config.maxZoom` opcionales. Si no se declaran, SHALL usarse los valores por default de React Flow.

#### Scenario: minZoom/maxZoom sin declarar usan los defaults del componente

- GIVEN un `DiagramCanvas` sin `config.minZoom` ni `config.maxZoom`
- WHEN el componente monta
- THEN los límites de zoom efectivos del diagrama son los defaults del componente (`0.5` y `2`)

#### Scenario: minZoom/maxZoom declarados se respetan como límites reales

- GIVEN un `DiagramCanvas` con `config.minZoom = 1` y `config.maxZoom = 10`
- WHEN el usuario interactúa con zoom (scroll, pinch, o los botones de la barra de controles)
- THEN el zoom resultante nunca es menor a `1` ni mayor a `10`

### Requirement: initialZoom clampeado contra los límites efectivos

Cuando `config.initialZoom` cae fuera del rango `[minZoom, maxZoom]` efectivo (declarado o default), el sistema MUST ajustar el valor aplicado al límite más cercano, para que la primera interacción del usuario no produzca un salto de zoom no solicitado.

#### Scenario: initialZoom por encima del maxZoom efectivo

- GIVEN `config.maxZoom` no declarado (default `2`) y `config.initialZoom = 5`
- WHEN el componente monta
- THEN el zoom aplicado al montar es `2`, no `5`

#### Scenario: initialZoom por debajo del minZoom efectivo

- GIVEN `config.minZoom` no declarado (default `0.5`) y `config.initialZoom = 0.1`
- WHEN el componente monta
- THEN el zoom aplicado al montar es `0.5`, no `0.1`

#### Scenario: initialZoom dentro de límites ampliados no se clampea

- GIVEN `config.minZoom = 1`, `config.maxZoom = 10` y `config.initialZoom = 5`
- WHEN el componente monta
- THEN el zoom aplicado al montar es exactamente `5` (cae dentro del rango efectivo, sin ajuste)

#### Scenario: no hay salto visual en la primera interacción tras el clamp

- GIVEN un `DiagramCanvas` montado con un `initialZoom` que fue clampeado al `maxZoom` efectivo
- WHEN el usuario hace scroll para acercar o alejar el zoom
- THEN el zoom cambia de forma continua desde el valor clampeado, sin saltos abruptos hacia otro valor

### Requirement: Validación de minZoom/maxZoom inválidos

Ni React Flow ni d3-zoom validan signo ni orden de `minZoom`/`maxZoom` (`scaleExtent` los aplica tal cual). El sistema MUST validar `config.minZoom`/`config.maxZoom` antes de pasarlos a React Flow: si alguno es `<= 0`, o si el rango está invertido (`maxZoom <= minZoom`), MUST ignorar **ambos** valores y usar los defaults del componente (`0.5`/`2`) en su lugar. El sistema SHOULD emitir un warning en desarrollo (`NODE_ENV !== 'production'`) cuando esto ocurre.

#### Scenario: minZoom o maxZoom con valor <= 0

- GIVEN un `DiagramCanvas` con `config.minZoom = -1` (o `config.maxZoom = 0`)
- WHEN el componente monta
- THEN el sistema MUST ignorar ambos valores y usar los límites de zoom efectivos por default de React Flow (`0.5`/`2`)
- AND en desarrollo se emite un warning indicando que `minZoom`/`maxZoom` son inválidos

#### Scenario: maxZoom menor o igual a minZoom

- GIVEN un `DiagramCanvas` con `config.minZoom = 5` y `config.maxZoom = 2`
- WHEN el componente monta
- THEN el sistema MUST ignorar ambos valores y usar los límites de zoom efectivos por default de React Flow (`0.5`/`2`)
- AND el clamp de `initialZoom` (si está definido) se calcula contra esos defaults, no contra el rango inválido
