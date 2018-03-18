import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import TodosSearchForm from './TodosSearchForm';
import TodosList from './TodosList';

const TodosWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 2rem;
	max-width: 80%;
	margin: 3rem auto;
`;

class TodayView extends React.Component {
	state = {
		today: moment().format('dddd, MMMM Do, YYYY'),
	};
	render() {
		return (
			<div>
				<TodosSearchForm />
				<TodosWrapper>
					<TodosList today={this.state.today} />
				</TodosWrapper>
			</div>
		);
	}
}

export default TodayView;
