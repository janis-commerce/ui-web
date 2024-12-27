# @janis-commerce/ui-web

A package for use generic components from Janis

## Installation

`npm install @janiscommerce/ui-web`

> **Important:** When developing or contributing to this library, please make sure to use `yarn` to install dependencies. Do **not** use `npm` as it might cause issues. 

To install dependencies while developing the library:

```bash
yarn install
```

### Usage

```js
import React from 'react';
const { Button, Icon } = '@janiscommerce/ui-web';

const MyComponent = () => {
	const handleClick = () => {
		console.log('some action');
	};

	return (
		<div>
			<Button onClick={handleClick} variant="contained">Click</Button>
			<Icon name="box" color="primary" />
		</div>
	);
};

export default MyComponent;
```

### Important

All the components that can be used and other documentation can be found at ***[https://janis-commerce.github.io/ui-web](https://janis-commerce.github.io/ui-web)***
