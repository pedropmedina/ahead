import React from 'react';
import styled from 'styled-components';
import validationAtFormLevel from '../helpers/validationAtFormLevel';
import DayPicker from './DayPicker';
import TimePicker from './TimePicker';

//////
////// Styles
//////
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	font-size: 1.6rem;
	padding: 1rem;
	max-width: 70rem;

	> * {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 7rem;
		}
	}
`;

const DayPickersWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		position: relative;
		width: 45%;
	}
`;

const TimePickerWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		position: relative;
		width: 45%;
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
		title: this.props.title || '',
		start: this.props.start || undefined,
		end: this.props.end || undefined,
		startTime: undefined,
		endTime: undefined,
		fieldErrors: {},
	};

	// handle the title
	onChangeTitle = e => {
		const title = e.target.value;
		this.setState(() => ({ title }));
	};

	// handle start and end
	handleStartEnd = dayObj => {
		if (dayObj.type === 'start') {
			const start = dayObj.start;
			if (this.props.isEditable) {
				this.setState(() => ({ start }));
				return;
			}
			this.setState(() => ({ start }));
			this.props.onSelectDay(start);
		} else if (dayObj.type === 'end') {
			const end = dayObj.end;
			this.setState(() => ({ end }));
		}
	};

	// handle startTime and endTime
	handleStartEndTime = timeObj => {
		console.log(timeObj);
		if (timeObj.type === 'startTime') {
			const startTime = timeObj.startTime;
			this.setState(() => ({ startTime }));
		} else if (timeObj.type === 'endTime') {
			const endTime = timeObj.endTime;
			this.setState(() => ({ endTime }));
		}
	};

	// handle submit for both when editing or adding todo
	onSubmit = e => {
		e.preventDefault();
		// check fieldErrors and return onSubmit earlier to prevent submission
		const title = this.state.title;
		const start = this.state.start;
		const fieldErrors = validationAtFormLevel(title, start);
		this.setState(() => ({ fieldErrors }));
		if (Object.keys(fieldErrors).length) return;

		// if not errors found proceed with form submission
		if (this.props.onSubmitEditTodo) {
			const { title, start, end } = this.state;
			this.props.onSubmitEditTodo(this.props.id, { title, start, end });
		} else {
			this.props.onSubmit({ ...this.state });
			this.setState(() => ({
				title: '',
				start: undefined,
				end: undefined,
				startTime: undefined,
				endTime: undefined,
			}));
		}
		this.props.push('/');
	};

	render() {
		return (
			<div>
				<Form action="#" onSubmit={this.onSubmit}>
					<Input
						type="text"
						placeholder="Add task"
						value={this.state.title}
						onChange={this.onChangeTitle}
					/>
					{this.state.fieldErrors.title && (
						<ErrorSpan>{this.state.fieldErrors.title}</ErrorSpan>
					)}

					<DayPickersWrapper>
						<DayPicker
							dayType="start"
							val={this.state.start}
							handleStartEnd={this.handleStartEnd}
						/>
						<DayPicker
							dayType="end"
							val={this.state.end}
							handleStartEnd={this.handleStartEnd}
						/>
					</DayPickersWrapper>

					{this.state.fieldErrors.start && (
						<ErrorSpan>{this.state.fieldErrors.start}</ErrorSpan>
					)}

					<TimePickerWrapper>
						<TimePicker
							timeType="startTime"
							val={this.state.startTime}
							start={this.state.start}
							handleStartEndTime={this.handleStartEndTime}
						/>
						<TimePicker
							timeType="endTime"
							val={this.state.endTime}
							startTime={this.state.startTime}
							handleStartEndTime={this.handleStartEndTime}
						/>
					</TimePickerWrapper>

					<Button>{this.props.isEditable ? 'Update' : 'Add'}</Button>
				</Form>
			</div>
		);
	}
}

export default TodoAddForm;
