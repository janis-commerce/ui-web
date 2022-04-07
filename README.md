# @janis-commerce/ui-web

A package for use generic components from Janis

## Installation

`npm install @janis-commerce/ui-web`


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
			<Button onClick={handleClick} variant="contained" />Click</Button>
			<Icon name="box" color="primary" />
		</div>
	);
};

export default MyComponent;
```