import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'
import LoginForm from './LoginForm'

describe("<LoginForm/>",()=>{
    it("enable btn when both email and pw are entered",()=>{
        const {getByText,getByLabelText}=render(
            <LoginForm onSubmit={()=>null}/>
        )
        const email=getByLabelText('email')
        const password=getByLabelText('pw')
        const button=getByText('login')

        expect(button).toBeDisabled()//버튼 비활성화

        fireEvent.change(email,{target:{value:"user@test.com"}})
        fireEvent.change(password,{target:{value:"Test1234"}})
        console.log("test is success")
        expect(button).toBeEnabled()
    })
})