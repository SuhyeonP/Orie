import React from 'react';
import {render,screen,fireEvent}from '@testing-library/react'
import LoginForm from './LoginForm'

test("enable button when email and password are entered",()=>{
    render(<LoginForm/>)

    const email=screen.getByLabelText('email')
    const password=screen.getByLabelText('pw')
    const button=screen.getByRole('button')

    expect(button).toBeDisabled()//버튼 비활성화

    fireEvent.change(email,{target:{value:"user@test.com"}})
    fireEvent.change(password,{target:{value:"Test1234"}})
    console.log("test is success")
    expect(button).toBeEnabled()
})