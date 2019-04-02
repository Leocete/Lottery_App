import React from 'react';
import MatchesReturn from './matches'
import SpentReturn from './spent'
import WonReturn from './won'
import styled from 'styled-components';

const ResultsWrapper = styled.div`
    margin-top: 80px;
    padding: 30px 100px;
    border: 3px dotted black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`
export default class UserResults extends React.Component {
    render() {
        return (
            <ResultsWrapper>
                <h1>YOUR RESULTS:</h1>
                <MatchesReturn props={this.props.resultsObject.matches} /><br/>

                {/* We could remove these dummy components (SpentReturn, WonReturn) if we want;
                We've already checked the input in the App.js, so not additional checks required */}
                <SpentReturn spent={this.props.resultsObject.spent} />
                <WonReturn won={this.props.resultsObject.won}/>
            </ResultsWrapper>
            )
    }
}
