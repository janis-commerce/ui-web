# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2025-11-12

### Added

- Collapser component and associated styles and stories
- react-collapsed dependency
- isFunction utility exported from utils

### Changed

- Storybook config updated to support .mjs files
- components index updated to export Collapser

## [1.3.0] - 2025-10-29

### Added

- Map/InfoWindow: support `markerOptions.infoWindowOptions.position { x, y }` to set pixelOffset

## [1.2.0] - 2025-10-16

### Changed

- Validations for valid values in Progress bar

## [1.1.0] - 2025-10-08

### Added

- markerData variable passed as argument to infoWindowContent function

## [1.0.0] - 2025-10-07

### Added

- Story data `MarkersWithInfoWindow` example in Map stories
- `infoWindowOpen` support in `Marker` via `markerData`
- `markerOptions.onInfoWindowChange` and InfoWindow mouse enter/leave handlers

### Changed

- Moved InfoWindow open/close logic from `Marker` to `Markers` with debounced hover behavior **BREAKING CHANGE** 🚨
- Updated `Map.stories.js` to include `WithInfoWindowTemplate` and control example

## [0.45.0] - 2025-09-30

### Added

- ProgressBar component with animated fill and accessibility attributes
- Storybook stories for ProgressBar

### Removed

- maxWidth in Chip component

## [0.44.0] - 2025-08-18

### Changed

- Round closeButton at Drawer

## [0.43.0] - 2025-07-28

### Added

- icon verified

## [0.42.0] - 2025-06-03

### Changed

- New logos of Janis Commerce

## [0.41.2] - 2025-05-23

### Fixed

- main key in rollback config

## [0.41.1] - 2025-05-23

### Changed

- Rollback export

### Removed

- axios library

## [0.41.0] - 2025-05-23

### Changed

- Updated build configuration and export setup
- Fixed dist folder configuration in rollup build
- Improved build command configuration

### Removed

- Removed axios dependency from package.json
- Removed preinstall script functionality

### Fixed

- Fixed export configuration in rollup build setup
- Fixed build process for better package distribution

## [0.40.1] - 2025-05-21

### Fixed

- stop animation fn on hover marker

## [0.40.0] - 2025-05-13

### Added

- startAnimation and stopAnimation functions
- zIndex prop

### CHANGED

- onDragEnd, onMouseOver and onMouseOut event functions

## [0.39.0] - 2025-05-13

### Added

- Enhanced map markers with animation support, including the ability to specify animation duration for each marker. Markers now animate automatically when added to the map.

## [0.38.0] - 2025-05-08

### ADDED

- forwardRef, useImperativeHandle and useEffect for set bounds and zoom in Map component

### REMOVED

- getCenterByGeolocationOrCenter, getGeolocationCoordinates map utils

## [0.37.0] - 2025-05-02

### Removed

- Prop iconSize to chip and format styles

## [0.36.0] - 2025-04-30

### Added

- Prop iconSize to chip and format styles

## [0.35.0] - 2025-04-24

### Added

- function to update marker in Map component

## [0.34.0] - 2025-04-15

### Added

- callback onDrag on Marker component

## [0.33.0] - 2025-04-10

### Added

- Memo for markers
- OnLoad cb on markers

## [0.32.0] - 2025-04-03

### Added

- markerOptions in map component

## [0.31.0] - 2025-03-14

### Added

- Full loader component
- Spinner loader component

## [0.30.0] - 2025-03-06

### Added

- Options prop to map

## [0.29.1] - 2025-02-26

### Fixed

- Center of map component

## [0.29.0] - 2025-02-21

### Removed

- Api direction from map Components

## [0.28.7] - 2025-02-18

### Changed

- Downgrade react version to 17

## [0.28.6] - 2025-02-18

### Fixed

- version of react-google-map/api to 2.7.0 to avoid error of jsx-runtime

### Changed

- Downgrade react version to 16

## [0.28.5] - 2025-02-13

### Removed

- script preinstall

## [0.28.4] - 2025-02-13

### Fixed

- script preinstall

## [0.28.3] - 2025-02-13

### Fixed

- deploy storybooks
- script preinstall

## [0.28.2] - 2025-02-13

### Fixed

- Script preinstall copy

## [0.28.1] - 2025-02-13

### Fixed

- Import map component
- Script preinstall

## [0.28.0] - 2025-02-12

### Added

- nvm file
- script to check installation command to avoid npm install
- Map component

## [0.27.1] - 2024-12-04

### Fixed

- Path export for icons.json

## [0.27.0] - 2024-12-04

### Added

- New icon
- Export all icons

## [0.26.0] - 2024-11-12

### Added

- New icon for filters

## [0.25.0] - 2024-10-14

### Changed

- rollup config to avoid errors with new version of react

## [0.24.0] - 2024-10-10

### Fixed

- export skeleton component

### Changed

- revert new docs to avoid publish error
- switch styles in components utils

## [0.23.0] - 2024-10-04

### Changed

- peer dependencies version of packages

## [0.22.0] - 2024-09-25

### Changed

- minor version of react and react dom in peer dependencies

## [0.21.0] - 2024-09-24

### Added

- export palette colors

### Changed

- viewPalette to palette name

## [0.20.0] - 2024-08-27

### Added

- Color darkblue and magenta

### Changed

- Styles of documentation

## [0.19.0] - 2024-07-10

### Added

- color lightTurquoise to palette

## [0.18.0] - 2024-05-31

### Added

- new color in palette

## [0.17.0] - 2024-05-27

### Added

- Component AvatarGroup

## [0.16.0] - 2024-04-26

### Added

- action to deploy storybooks
- Icon drag and drop

## [0.15.0] - 2024-04-22

### Added

- New colors in theme

## [0.14.0] - 2024-04-22

### Added

- New colors in theme

## [0.13.0] - 2024-03-09

### Removed

- util to get color in InitialAvatar

### Changed

- MainColor prop, now accept hex color

## [0.12.0] - 2024-03-08

### Added

- Component Avatar

## [0.11.0] - 2024-03-21

### Added

- Props component documentation

## [0.10.0] - 2024-03-12

### Added

- Added Drawer component

## [0.9.1] - 2024-02-29

### Fixed

- Fixed fontcolor of buttons

## [0.9.0] - 2024-02-19

### Changed

- Changed icon in storybooks
- Changed button theme
- Changed Unified themes
- Changed Button and Icon Test

### Removed

- Removed unused theme in favor to views actual theme

### Added

- Added controls in storybooks

## [0.8.0] - 2024-01-23

### Changed

- Changed Button to use Icon component

## [0.7.3] - 2022-12-04

### Fixed

- Fixed postpublish script permission

## [0.7.2] - 2022-12-04

### Fixed

- Fixed postpublish script

## [0.7.1] - 2022-12-04

### Fixed

- Fixed path postpublish script

## [0.7.0] - 2022-12-04

### Added

- Added slack notification

## [0.6.2] - 2022-12-04

### Fixed

- Fixed height of component Chip

## [0.6.1] - 2022-11-29

### Fixed

- Fixed validation chip when has icon and not children

## [0.6.0] - 2022-11-27

### Removed

- Removed repeated styles in Color component

## [0.5.0] - 2022-10-24

### Added

- Added peer dependencies to add styled components

### Removed

- Removed script post-install
- Removed hasText prop from Chip component

## [0.4.0] - 2022-03-14

### Removed

- Removed prop styles for chip component

## [0.3.0] - 2022-09-29

### Changed

- Remove validation for internal link

## [0.2.1] - 2022-09-29

### Fixed

- add export for Link component

## [0.2.0] - 2022-09-29

### Changed

- revert button removing link props
- revert Link removing react router link

## [0.1.0] - 2022-09-16

### Added

- Add link prop in chip component

## [0.0.15] - 2022-07-26

### Added

- Add Input and Textarea components
- Add Image component
- Add QRCode component
- Add ColorPicker component
- Add HTML component
- Add tests for global utils

### Changed

- Changes in Chip component properties

### Fixed

- Fix textarea error height

## [0.0.14] - 2022-06-11

- Fix publish package to npm bugs. From 0.0.3 to 0.0.14

## [0.0.2] - 2022-06-11

### Fixed

- Fix github action error with storybook

## [0.0.1] - 2022-06-11

### Added

- Add Checkbox component
- Add Switch component
- Add Button component
- Add Icon component
- Add Color component
- Add Chip component
- Add base config for make, test and document a react components
- Add base config rollup
