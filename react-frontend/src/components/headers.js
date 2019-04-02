import React from 'react';
import styled from 'styled-components';

const MainHeader = styled.h1`
    padding: 0px, 50px, 50px, 50px;
`
const ActionHeader = styled.h2`
    margin-bottom: 70px;
`
const HeaderWrapper = styled.div`
    text-align: center;
`

export default class Headers extends React.Component {
    render() {
        return (
            <HeaderWrapper>
                <MainHeader>WELCOME TO THE LOTTERY!</MainHeader>
                <ActionHeader>Please, enter your winnings numbers (from 1 to 52) here:</ActionHeader>
            </HeaderWrapper>
        )
    }
}
