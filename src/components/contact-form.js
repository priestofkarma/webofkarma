import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useIntl } from "gatsby-plugin-intl"

const ContactForm = ({data}) => {
	const intl = useIntl()

	const {
		nameFieldLabel,
		nameFieldPlaceholder,
		nameFieldError,
		emailFieldLabel,
		emailFieldPlaceholder,
		emailFieldError,
		serviceFieldLabel,
		serviceFieldPlaceholder,
		messageFieldLabel,
		messageFieldPlaceholder,
		messageFieldError,
		thanksMessage
	} = data.allContentfulContactPage.nodes[0]

	const [fieldErrors, setFieldErrors] = useState({});
	const validationRules = {
		name: val => !!val,
		email: val => val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
		// service: val => !val,
		message: val => !!val
	};
	const validate = () => {
		let errors = {};
		let hasErrors = false;
		for (let key of Object.keys(inputs)) {
			errors[key] = validationRules[key] && !validationRules[key](inputs[key]);
			hasErrors |= errors[key];
		}
		setFieldErrors(prev => ({ ...prev, ...errors }));
		return !hasErrors;
	};

	const renderFieldError = (field, text) => {
		if (fieldErrors[field]) {
			return <p><span className='form-error'><span className='link-dot bg-red-500 dark:bg-red-500 -left-4'></span> {text}</span></p>;
		}
	};

	const defaultInputs = {
		name: '',
		email: '',
		service: '',
		message: ''
	}

	// Input Change Handling
	const [inputs, setInputs] = useState(defaultInputs);

	useEffect(() => {
		// Only perform interactive validation after submit
		if (Object.keys(fieldErrors).length > 0) {
			validate();
		}
	}, [inputs]);

	const handleOnChange = event => {
		event.persist();
		setInputs(prev => ({
			...prev,
			[event.target.id]: event.target.value
		}));
	};

	// Server State Handling
	const [serverState, setServerState] = useState({
		submitting: false,
		status: null
	});
	const handleServerResponse = (ok, msg) => {
		setServerState({
			submitting: false,
			status: { ok, msg }
		});
		if (ok) {
			setFieldErrors({});
			setInputs(defaultInputs);
		}
	};
	const handleOnSubmit = event => {
		event.preventDefault();
		if (!validate()) {
			return;
		}
		setServerState({ submitting: true });
		axios({
			method: 'POST',
			url: `https://formspree.io/f/${process.env.GATSBY_CONTACT_FORM}`,
			data: inputs
		})
			.then(r => {
				handleServerResponse(true, thanksMessage);
			})
			.catch(r => {
				handleServerResponse(false, r.response.data.error);
			});
	};

	return (
		<form className='flex flex-col' onSubmit={handleOnSubmit} noValidate>
			<div className={`form-col border-t`}>
				<label
					htmlFor='name'
					className={`${inputs.name ? 'opacity-50' : ''} form-label`}>{nameFieldLabel}</label>
				<span className='form-num'>01</span>
				<input
					id='name'
					type='text'
					name='name'
					placeholder={nameFieldPlaceholder}
					onChange={handleOnChange}
					value={inputs.name}
					className='form-input'
				/>
				{fieldErrors.name ? renderFieldError('name', nameFieldError) : ''}


			</div>
			<div className={`form-col border-t`}>
				<label htmlFor='email' className={`${inputs.email ? 'opacity-50' : ''} form-label`}>{emailFieldLabel}</label>
				<span className='form-num'>02</span>
				<input
					id='email'
					type='email'
					name='email'
					placeholder={emailFieldPlaceholder}
					onChange={handleOnChange}
					value={inputs.email}
					className={`form-input`}
				/>
				{fieldErrors.email ? renderFieldError('email', emailFieldError) : ''}
			</div>
			<div className={`form-col border-t`}>
				<label htmlFor='service' className={`${inputs.service ? 'opacity-50' : ''} form-label`}>{serviceFieldLabel}</label>
				<span className='form-num'>03</span>
				<input
					id='service'
					type='text'
					name='service'
					placeholder={serviceFieldPlaceholder}
					onChange={handleOnChange}
					value={inputs.service}
					className={`form-input`}
				/>
			</div>
			<div className={`form-col border-t border-b`}>
				<label htmlFor='message' className={`${inputs.message ? 'opacity-50' : ''} form-label`}>{messageFieldLabel}</label>
				<span className='form-num'>04</span>
				<textarea
					id='message'
					name='message'
					rows={5}
					onChange={handleOnChange}
					value={inputs.message}
					placeholder={messageFieldPlaceholder}
					className={`form-input resize-none`}
				></textarea>
				{fieldErrors.message ? renderFieldError('message', messageFieldError) : ''}

			</div>

			<button
				className='magnetic relative button w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-lg self-end -mt-4 lg:-mt-10'
				type='submit'
				disabled={serverState.submitting}>
				<span className='magnetic-text'>{intl.formatMessage({ id: "send" })}</span>
			</button>

			<span className='inline-block mt-6  text-xl'>{serverState.status && serverState.status.msg}</span>
		</form>
	);
};

export default ContactForm