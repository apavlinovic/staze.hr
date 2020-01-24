import React from 'react';

import './Card.scss';

function Card(props) {
   
    return (
        <div className="ui--Card">
            { props.children }
        </div>
    );
}

export default Card;
