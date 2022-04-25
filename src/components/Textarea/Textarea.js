import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

class Textarea extends PureComponent {
	state = {
		isFocused: false,
		value: this.props.defaultValue // for uncontrolled input
	};

	textarea = React.createRef();

	componentDidMount() {
		this.setStyleHeight(this.getScrollHeight());
	}

	getScrollHeight = () => {
		if (!(this.textarea && this.textarea.current)) return 'auto';

		const { scrollHeight } = this.textarea.current;

		return scrollHeight <= 350 ? scrollHeight + 1 : 351;
	};

	setStyleHeight(n) {
		if (this.textarea && this.textarea.current) this.textarea.current.style.height = `${n}px`;
	}

	handleBlur = (event) => {
		if (this.props.hasFloatingLabel) this.setState({ isFocused: false });
		this.setState({ value: event.target.value });
		this.props.onBlur(event);
	};

	handleChange = (event) => {
		this.setState({ value: event.target.value });
		this.props.onChange(event);
	};

	handleInput = () => {
		this.setStyleHeight(5);
		this.setStyleHeight(this.getScrollHeight());
	};

	handleFocus = () => {
		if (this.props.hasFloatingLabel) this.setState({ isFocused: true });
		this.props.onFocus();
	};

	handleLabelClick = () => {
		this.textarea.current.focus();
	};

	render() {
		const { value: stateValue, isFocused } = this.state;

		const {
			label,
			error,
			disabled,
			placeholder,
			autoComplete,
			errorMessage,
			hasFloatingLabel,
			isTranslateActive,
			value = stateValue,
			// eslint-disable-next-line no-unused-vars
			defaultValue,
			...props
		} = this.props;

		const isFloating = isFocused || !!value;

		return (
			<styled.Container fullWidth={props.fullWidth}>
				{hasFloatingLabel && (
					<styled.FloatingLabel
						{...props}
						error={error}
						onClick={this.handleLabelClick}
						disabled={disabled}
						isFocused={isFocused}
						isFloating={isFloating}
						isTranslateActive={isTranslateActive}
					>
						{label}
					</styled.FloatingLabel>
				)}
				<styled.Textarea
					{...props}
					ref={this.textarea}
					placeholder={hasFloatingLabel && !isFloating ? '' : placeholder}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
					onChange={this.handleChange}
					onInput={this.handleInput}
					error={error}
					value={value}
					autoComplete={autoComplete ? 'on' : 'off'}
					disabled={disabled}
				/>
				{error && <styled.ErrorMessage>{errorMessage}</styled.ErrorMessage>}
			</styled.Container>
		);
	}
}

Textarea.propTypes = {
	/** Si es true deshabilita el textarea */
	disabled: PropTypes.bool,
	/** Si es true habilita el autoComplete */
	autoComplete: PropTypes.bool,
	/** El valor por defecto del textarea, solo para usar como uncontrolled component */
	defaultValue: PropTypes.string,
	/** Si es true el textarea indicará un error */
	error: PropTypes.bool,
	/** El mensaje a mostrar del error */
	errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** Si es true aplica un width de 100% */
	fullWidth: PropTypes.bool,
	/** Id del elemento textarea, usar en conjunto con label */
	id: PropTypes.string,
	/** Si es true el placeholder se transforma en label flotante */
	hasFloatingLabel: PropTypes.bool,
	/** Atributo name del elemento textarea */
	name: PropTypes.string,
	label: PropTypes.string,
	/** Callback disparado cuando se sale del foco del textarea */
	onBlur: PropTypes.func,
	/** Callback disparado cada vez que cambia el valor del textarea.
	El callback recibe el evento original del textarea, se puede acceder al valor a traves de él, event.target.value */
	onChange: PropTypes.func,
	/** Callback disparado cuando el value del textarea es cambiado,  */
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	isTranslateActive: PropTypes.bool,
	/** Valor del elemento textarea, requerido para un controlled component */
	value: PropTypes.string
};

Textarea.defaultProps = {
	disabled: false,
	autoComplete: false,
	error: false,
	errorMessage: '',
	onBlur: () => null,
	onChange: () => null,
	onFocus: () => null,
	placeholder: '',
	hasFloatingLabel: false
};

export default Textarea;
