import React from 'react';

const MatchesReturn = ({props}) => {
    if (props) {

        let matches = props.map((element, i) => <h1 key={i}>Matches {i} number: {element}</h1>)

        return (
            <div>
                {matches}
            </div>
        )
    } else {
        return null;
    }
}

export default MatchesReturn 