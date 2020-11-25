import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {

	gotService = new gotService();

	state = {
		selectedHous: 2,
		error: false
	}

	onItemSelected = (id) => {
		this.setState({
			selectedHous: id
		})
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllHouses}
				renderItem={({ name }) => name} />
		)

		const charDetails = (
			<ItemDetails
				itemId={this.state.selectedHous}
				getData={this.gotService.getHouse}>
				<Field field='region' label='Region' />
				<Field field='words' label='Words' />
				<Field field='titles' label='Titles' />
				<Field field='ancestralWeapons' label='AncestralWeapons' />
			</ItemDetails>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}