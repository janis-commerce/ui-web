# Diagram Canvas Controls Specification

## Purpose

Behavior of the custom control bar rendered by `DiagramCanvas` (`DiagramControls`), replacing `<Controls>` from `@xyflow/react`. Covers the 4 native controls, zoom limits, the interactivity toggle, `additionalControls`, and accessibility.

## Requirements

### Requirement: Native Control Rendering

The system MUST render exactly 4 native buttons — zoom in, zoom out, fit view, interactivity toggle (lock/unlock) — grouped together whenever the control bar shows.

#### Scenario: All native controls render with their icons

- GIVEN `DiagramCanvas` renders its control bar
- WHEN no custom configuration is provided
- THEN the 4 buttons MUST be visible, each with its icon (plus, minus, expand, lock/unlock)

#### Scenario: Toggle icon reflects current interactivity state

- GIVEN the diagram is interactive (draggable/connectable/selectable)
- WHEN the control bar renders
- THEN the toggle button MUST show "unlock"; WHEN non-interactive, it MUST show "lock"

### Requirement: Zoom Limit Disabling

Zoom in/out buttons MUST be disabled when the current zoom level reaches `maxZoom`/`minZoom` respectively.

#### Scenario: Zoom in disabled at max zoom

- GIVEN the current zoom level equals `maxZoom`
- WHEN the control bar renders
- THEN the zoom in button MUST be disabled

#### Scenario: Zoom out disabled at min zoom, enabled between limits

- GIVEN the current zoom level equals `minZoom`
- WHEN the control bar renders
- THEN the zoom out button MUST be disabled
- AND WHEN the level is strictly between `minZoom`/`maxZoom`, both buttons MUST be enabled

### Requirement: Interactivity Toggle Behavior

Clicking the toggle button MUST flip `nodesDraggable`, `nodesConnectable`, and `elementsSelectable` together to the opposite of their shared state.

#### Scenario: Locking an interactive diagram

- GIVEN the diagram is interactive
- WHEN the user clicks the toggle button
- THEN `nodesDraggable`, `nodesConnectable`, and `elementsSelectable` MUST all become `false`

#### Scenario: Unlocking a locked diagram

- GIVEN the diagram is non-interactive
- WHEN the user clicks the toggle button
- THEN those same 3 flags MUST all become `true`

### Requirement: Additional Controls Group

The system MUST accept an `additionalControls` prop (array of arbitrary React nodes) and render each node exactly as provided, in a group visually separate from the native controls. The system MUST NOT impose any shape (no `icon`/`onClick`/`ariaLabel` fields or any other contract) on the entries — style, accessibility, and behavior of each node are the caller's responsibility.

#### Scenario: Additional controls render as a separate group

- GIVEN `additionalControls` contains one or more React nodes (e.g. a button, a `Switch`, a `Checkbox`, or any other component)
- WHEN the control bar renders
- THEN each node MUST render unmodified, exactly as passed by the caller
- AND this group MUST be visually distinct from the native controls group

#### Scenario: Empty additionalControls renders no extra group

- GIVEN `additionalControls` is not provided or is an empty array
- WHEN the control bar renders
- THEN the system MUST NOT render the additional controls group; only native controls show

### Requirement: Accessible Buttons

Every native button MUST expose a non-empty `aria-label`, fixed and not configurable: `Zoom in`, `Zoom out`, `Fit view`, `Toggle lock`. Accessibility of `additionalControls` entries (aria-label or any other attribute) is entirely the caller's responsibility, since the system renders those nodes unmodified — see Additional Controls Group.

#### Scenario: Native buttons always have a fixed aria-label

- GIVEN any native button renders
- WHEN the control bar renders
- THEN it MUST have its fixed English `aria-label` (`Zoom in`, `Zoom out`, `Fit view`, or `Toggle lock`)
