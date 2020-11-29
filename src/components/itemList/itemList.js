import React, {Component, useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function ItemList (props) {
   
   const renderItems = (arr) => {
        return arr.map((item) => {
            const { id } = item;
            const label = props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => props.onItemSelected(item.id)}
                >
                    {label}
                </li>
            )
        })
    };

    const { data } = props
    const items = renderItems(data);
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            error: false
        }

        static defaultProps = {
            onItemSelected: () => { },
        }
        static propTypes = {
            onItemSelected: PropTypes.func
        }

        componentDidMount() {

            const { getData } = this.props;
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
                .catch(() => {
                    this.setState({
                        data: null,
                        error: true
                    })
                });
        }

        componentDidCatch() {
            this.setState({
                charList: null,
                error: true
            })
        }

        render() {
            const { data, error } = this.state;

            if (error) {
                return <ErrorMessage />
            }

            if (!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data} />
        }
    };
}

export default withData(ItemList);