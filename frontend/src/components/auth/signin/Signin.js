// @flow
import React from 'react';
import {
    WhiteBox,
    FormWrapper,
    H1,
    Form,
    Input,
    LoginButton
} from './SigninStyle';

class Signin extends React.Component {
    render(){
        return (
            <WhiteBox>
                <FormWrapper>
                    <H1>로그인</H1>
                    <Form>
                        <Input name="id" type="text" placeholder="Id"/>
                        <Input name="password" type="password" placeholder="Password"/>
                        <LoginButton>Login</LoginButton>
                    </Form>
                </FormWrapper>
            </WhiteBox>
        )
    }
}

export default Signin;