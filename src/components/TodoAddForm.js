import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import styled from 'styled-components';
import '../style.css';
import validationAtFormLevel from '../helpers/validationAtFormLevel';

import MomentLocaleUtils, {
	formatDate,
	parseDate,
} from 'react-day-picker/moment';

//////
////// Styles
//////
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	font-size: 1.6rem;
	padding: 1rem;

	> * {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 7rem;
		}
	}
`;

const Input = styled.input`
	border: none;
	border-bottom: 0.2rem solid #eee;
	height: 5rem;
	outline: none;
	font-size: 2rem;
	text-indent: 1rem;
`;

const Button = styled.button`
	padding: 2rem;
	border: 0.2rem solid #b74255;
	color: #b74255;
	border-radius: 0.4rem;
	font-size: 2rem;
`;

const ErrorSpan = styled.span`
	color: red;
	font-weight: bold;
`;

//////
////// Component
//////
class TodoAddForm extends React.Component {
	state = {
		description: this.props.description || '',
		createdAt: this.props.createdAt || undefined,
		fieldErrors: {},
	};

	// handle the description
	onChangeDescription = e => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	// handle created at
	onDayPickerChange = day => {
		let createdAt;
		if (day) createdAt = moment(day).format('dddd, MMMM Do, YYYY');
		if (this.props.isEditable) {
			this.setState(() => ({ createdAt }));
			return;
		}
		this.setState(() => ({ createdAt }));
		this.props.onSelectDay(createdAt);
	};

	// handle submit for both when editing or adding todo
	onSubmit = e => {
		e.preventDefault();
		// check fieldErrors and return onSubmit earlier to prevent submission
		const description = this.state.description;
		const createdAt = this.state.createdAt;
		const fieldErrors = validationAtFormLevel(description, createdAt);
		this.setState(() => ({ fieldErrors }));
		if (Object.keys(fieldErrors).length) return;

		// if not errors found proceed with form submission
		if (this.props.onSubmitEditTodo) {
			const { description, createdAt } = this.state;
			this.props.onSubmitEditTodo(this.props.id, { description, createdAt });
		} else {
			this.props.onSubmit({ ...this.state });
			this.setState(() => ({ description: '', createdAt: undefined }));
		}
	};

	render() {
		return (
			<div>
				<Form action="#" onSubmit={this.onSubmit}>
					<DayPickerInput
						value={this.state.createdAt}
						placeholder="Select a day"
						onDayChange={this.onDayPickerChange}
						formatDate={formatDate}
						parseDate={parseDate}
						format="dddd, MMMM Do, YYYY"
						dayPickerProps={{
							locale: 'en',
							localeUtils: MomentLocaleUtils,
						}}
					/>
					<ErrorSpan>{this.state.fieldErrors.createdAt}</ErrorSpan>

					<Input
						type="text"
						placeholder="Add todo"
						value={this.state.description}
						onChange={this.onChangeDescription}
					/>
					<ErrorSpan>{this.state.fieldErrors.description}</ErrorSpan>

					<Button>{this.props.isEditable ? 'Update' : 'Add'}</Button>
				</Form>
			</div>
		);
	}
}

export default TodoAddForm;
