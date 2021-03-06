# @janis-commerce/ui-web

A package for use generic components from Janis

## Installation

`npm install @janiscommerce/ui-web`

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
