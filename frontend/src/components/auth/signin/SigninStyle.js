import styled from 'styled-components';
import oc from 'open-color';

export const WhiteBox = styled.div`
    position: fixed;
    top: 50%;
    left: 50%
    width: 550px;
    background-color: white;
    transform: translate(-50%,-50%);
`

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
`

export const H1 = styled.h1`
    margin: 0;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
`

export const Input = styled.input`
    margin-top: 0.5rem;
    border: none;
    height: 2.5rem;
    background-color: ${oc.gray[2]}
    border-radius: 3px;
    font-size: 1rem;
    &::placeholder {
        padding-left: 0.5rem;
        font-size: 1rem;
    }
`

export const LoginButton = styled.button`
    margin-top: 1rem;
    border: none;
    height: 2.5rem;
    background-color: ${oc.gray[7]}
    &:hover{
        background-color: ${oc.gray[8]}
    }
    color: white;
    border-radius: 3px;
    font-size: 1.5rem;
    cursor: pointer;
`