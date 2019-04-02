import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import styled from 'styled-components';

const Error = styled.label`
    width: 200px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: red;
    margin-bottom: 20px;
    text-align: center;
`
 
class TextValidator extends ValidatorComponent {
 
    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
 
        return (
            <React.Fragment>
                <input className="lottery-number"
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </React.Fragment>
        );
    }
 
    errorText() {
        const { isValid } = this.state;
 
        if (isValid) {
            return null;
        }
 
        return (
            <Error>
                {this.getErrorMessage()}
            </Error>
        );
    }
}
 
export default TextValidator;