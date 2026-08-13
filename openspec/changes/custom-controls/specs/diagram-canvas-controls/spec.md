# Diagram Canvas Controls Specification

## Purpose

Behavior of the custom control bar rendered by `DiagramCanvas` (`DiagramControls`), replacing `<Controls>` from `@xyflow/react`. Covers the 4 native controls, zoom limits, the interactivity toggle, `additionalControls`, and accessibility.

## Requirements

### Requirement: Native Control Rendering

The system MUST render 3 native buttons — zoom in, zoom out, fit view — grouped together whenever the control bar shows. It MUST additionally render a 4th button, the interactivity toggle (lock/unlock), in its own visually-separated group adjacent to the other 3 (a divider between the two groups, per the reference design), UNLESS `config.readOnly` is `true`.

#### Scenario: All native controls render with their icons

- GIVEN `DiagramControls` renders (`readOnly` is `false`, its own default when the prop is not set)
- WHEN the control bar renders
- THEN the 4 buttons MUST be visible, each with its icon (plus, minus, expand, lock/unlock)
- NOTE: `DiagramCanvas`'s own `defaultConfig.readOnly` is `true` (see `DiagramCanvas.js`), so a `<DiagramCanvas />` mounted with zero config shows only 3 buttons — this scenario exercises `DiagramControls` directly with `readOnly` explicitly `false`, not `DiagramCanvas`'s defaults

#### Scenario: Toggle icon reflects current interactivity state

- GIVEN the diagram is interactive (draggable/connectable/selectable)
- WHEN the control bar renders
- THEN the toggle button MUST show "unlock"; WHEN non-interactive, it MUST show "lock"

#### Scenario: Toggle button is hidden in read-only mode

- GIVEN `config.readOnly` is `true`
- WHEN the control bar renders
- THEN the interactivity toggle button MUST NOT render
- AND the zoom in, zoom out, and fit view buttons MUST still render, grouped together

#### Scenario: Toggle button renders in its own group, separated by a divider

- GIVEN `config.readOnly` is `false` (or not provided)
- WHEN the control bar renders
- THEN the toggle button MUST render in a group separate from zoom in/zoom out/fit view
- AND a visual divider MUST appear between the two groups

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

The system MUST accept an `additionalControls` prop — a single arbitrary React node, an array of nodes, or nested arrays — and render each node exactly as provided, in a group visually separate from the native controls. The system MUST NOT impose any shape (no `icon`/`onClick`/`ariaLabel` fields or any other contract) on the entries — style, accessibility, and behavior of each node are the caller's responsibility.

#### Scenario: Additional controls render as a separate group

- GIVEN `additionalControls` contains one or more React nodes (e.g. a single button, or an array mixing a `Switch`, a `Checkbox`, or any other component)
- WHEN the control bar renders
- THEN each node MUST render unmodified, exactly as passed by the caller
- AND this group MUST be visually distinct from the native controls group

#### Scenario: Empty additionalControls renders no extra group

- GIVEN `additionalControls` is not provided, is `null`/`undefined`, or is an empty array
- WHEN the control bar renders
- THEN the system MUST NOT render the additional controls group; only native controls show

### Requirement: Accessible Buttons

Every native button MUST expose a non-empty `aria-label` AND a matching `title` (mouse-hover tooltip), fixed and not configurable: `Zoom in`, `Zoom out`, `Fit view`, and — when rendered (see Native Control Rendering) — `Toggle lock`. The control bar's container MUST expose a fixed `aria-label` of `Diagram controls`. Accessibility of `additionalControls` entries (aria-label or any other attribute) is entirely the caller's responsibility, since the system renders those nodes unmodified — see Additional Controls Group.

#### Scenario: Native buttons always have a fixed aria-label and title

- GIVEN any native button renders
- WHEN the control bar renders
- THEN it MUST have its fixed English `aria-label` (`Zoom in`, `Zoom out`, `Fit view`, or `Toggle lock`)
- AND it MUST have a `title` with the same text, so the tooltip shows on mouse hover

#### Scenario: Control bar container has a fixed aria-label

- GIVEN the control bar renders
- WHEN inspected by assistive technology
- THEN its container MUST have `aria-label="Diagram controls"`
