import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from './styles';

class Input extends PureComponent {
	state = {
		isFocused: this.props.isFocused,
		value: this.props.defaultValue // for uncontroled input
	};
	input = React.createRef();

	componentDidUpdate(prevProps, prevState) {
		// For maintain cursor position on update input value
		if (
			prevProps.value !== this.props.value ||
			(prevState.value !== this.state.value && this.input.current)
		) {
			if (this.input.current.type === 'text') {
				this.input.current.selectionStart = this.cursorStart;
				this.input.current.selectionEnd = this.cursorEnd;
			}
		}
	}

	handleBlur = (event) => {
		if (this.props.hasFloatingLabel) this.setState({ isFocused: false });
		this.setState({ value: event.target.value });
		this.props.onBlur(event);
	};

	handleChange = (event) => {
		const input = event.target;

		this.setState({ value: input.value });
		this.props.onChange(event);

		this.cursorStart = input.selectionStart;
		this.cursorEnd = input.selectionEnd;
	};

	handleFocus = () => {
		if (this.props.hasFloatingLabel) this.setState({ isFocused: true });

		this.props.onFocus();
	};

	handleLabelClick = () => {
		this.input.current.focus();
	};

	render() {
		const { isFocused, value: stateValue } = this.state;

		const {
			label,
			icon,
			error,
			disabled,
			placeholder,
			errorMessage,
			autoComplete,
			hasFloatingLabel,
			value = stateValue,
			isTranslateActive,
			// eslint-disable-next-line no-unused-vars
			defaultValue,
			type,
			...props
		} = this.props;

		console.log('thisprops', type);

		const autoCompleteOff = props.type === 'password' ? 'new-password' : 'off';
		const isFloating = isFocused || !!value.toString();

		return (
			<styled.Wrapper>
				<styled.InputContainer fullWidth={props.fullWidth}>
					{hasFloatingLabel && (
						<styled.FloatingLabel
							data-test="floatingLabel"
							error={error}
							onClick={this.handleLabelClick}
							disabled={disabled}
							isFocused={isFocused}
							isFloating={isFloating}
							hasIcon={!!icon}
							isTranslateActive={isTranslateActive}
						>
							{label}
						</styled.FloatingLabel>
					)}
					{icon && <styled.InputIcon name={icon} color={error ? 'statusRed' : 'black'} />}
					<styled.Input
						{...props}
						ref={this.input}
						placeholder={hasFloatingLabel && !isFloating ? '' : placeholder}
						onBlur={this.handleBlur}
						onFocus={this.handleFocus}
						onChange={this.handleChange}
						autoComplete={autoComplete ? 'on' : autoCompleteOff}
						disabled={disabled}
						value={value}
						isFocused={isFocused}
						error={error}
						type={type}
						hasIcon={!!icon}
						onAnimationStart={this.handleFocus}
					/>
				</styled.InputContainer>
				{error && (
					<styled.ErrorMessage data-test="errorMessage">{errorMessage}</styled.ErrorMessage>
				)}
			</styled.Wrapper>
		);
	}
}

Input.propTypes = {
	/** Valor del floating label */
	label: PropTypes.string,
	/** Color de fondo para el input */
	background: PropTypes.string,
	/** Si es true deshabilita el input */
	disabled: PropTypes.bool,
	/** Si es true habilita el autoComplete */
	autoComplete: PropTypes.bool,
	/** El valor por defecto del input, solo para usar como uncontrolled component */
	defaultValue: PropTypes.string,
	/** Indica si el input esta focus */
	isFocused: PropTypes.bool,
	/** Si es true el input indicará un error */
	error: PropTypes.bool,
	/** El mensaje a mostrar del error */
	errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** Si es true aplica un width de 100% */
	fullWidth: PropTypes.bool,
	/** Nombre del ícono a mostrar al inicio del input */
	icon: PropTypes.string,
	/** Id del elemento input, usar en conjunto con label */
	id: PropTypes.string,
	/** Si es true el placeholder se transforma en label flotante */
	hasFloatingLabel: PropTypes.bool,
	/** Si es true la label flotante permite eventos */
	isTranslateActive: PropTypes.bool,
	/** Atributo name del elemento input */
	name: PropTypes.string,
	/** Callback disparado cuando se sale del foco del input */
	onBlur: PropTypes.func,
	/** Callback disparado cada vez que cambia el valor del input.
	El callback recibe el evento original del input, se puede acceder al valor a traves de él, event.target.value */
	onChange: PropTypes.func,
	/** Callback disparado cuando el value del input es cambiado,  */
	onFocus: PropTypes.func,
	/**	 Input placeholder */
	placeholder: PropTypes.string,
	/** Atributo type del elemento input */
	type: PropTypes.oneOf(['text', 'email', 'hidden', 'number', 'password', 'tel']),
	/** Valor del elemento input, requerido para un controlled component */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
	defaultValue: '',
	disabled: false,
	autoComplete: false,
	isFocused: false,
	error: false,
	errorMessage: '',
	fullWidth: false,
	hasFloatingLabel: true,
	isTranslateActive: false,
	onBlur: () => null,
	onChange: () => null,
	onFocus: () => null,
	type: 'text'
};

export default Input;
