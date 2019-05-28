// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import Signin from 'components/auth/signin';

const BackGround = styled.div`
height: 100%;
background-color: ${oc.gray[1]};
`

class AuthContainer extends React.Component {
    render(){
        return (
            <BackGround>
                <Signin />
            </BackGround>
        )
    }
}

export default AuthContainer;