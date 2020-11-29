import React, { useState, useEffect } from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function RandomChar(props) {

    const { interval, getData } = props;
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function updateChar() {
        const id = Math.floor(Math.random() * 140 + 25);
        getData(id)
            .then((data) => {
                setChar(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            });
    }

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, interval);
        return () => {
            clearInterval(timerId);
        };
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = loading || error ? null : <View char={char} />;
    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

RandomChar.defaultProps = {
    interval: 1500
}


RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>1{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;

