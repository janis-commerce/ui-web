import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkTo from '@storybook/addon-links/react';
import colors from 'theme/palette';

const List = styled.div`
	display: grid;
	grid-auto-flow: ${(props) => !props.minWidth && 'column'};
	justify-content: left;
	align-items: center;
	grid-gap: ${(props) => (props.gap ? `${props.gap}px` : '10px')};
	grid-template-columns: ${(props) =>
		props.minWidth && `repeat(auto-fit, minmax(${props.minWidth}px, 1fr))`};
	height: ${(props) => props.height && `${props.height}px`};
`;

const FlexWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Link = (props) => {
	const linkToRef = useRef();
	// const isLocal = process.env.NODE_ENV === 'development';
	// const makeUrl = `${isLocal ? '/' : '/docs/index.html'}?path=/docs/${props.kind}`;
	const onClickEvent = (e) => {
		e.preventDefault();
		if (linkToRef.current) linkToRef.current.handleClick();
	};
	const styles = { textDecoration: 'none', color: colors.blue };
	return (
		<a href="#" onClick={onClickEvent} style={styles}>
			<LinkTo ref={linkToRef} style={{ ...styles, pointerEvents: 'none' }} {...props} />
		</a>
	);
};

Link.propTypes = {
	kind: PropTypes.string
};

export { List, FlexWrapper, Link };
