// @flow
import React from 'react';
import * as Style from './AuthContainerStyle';

import Signin from 'components/auth/signin';

class AuthContainer extends React.Component {
    render(){
        return (
            <Style.BackGround>
                <Signin />
            </Style.BackGround>
        )
    }
}

export default AuthContainer;