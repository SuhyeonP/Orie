import React from 'react';
import {render,screen,fireEvent}from '@testing-library/react'
import LoginForm from './LoginForm'
import userEvent from "@testing-library/user-event";

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

//userEvent

test("enables btn when both email and pw are entered and this use userEvent",()=>{
    render(<LoginForm/>)

    const email=screen.getByLabelText('email')
    const password=screen.getByLabelText('pw')
    const button=screen.getByRole('button')

    expect(button).toBeDisabled()

    userEvent.type(email,"user@test.com")
    userEvent.type(password,"Test1234")

    console.log("success user Event test")

    expect(button).toBeEnabled()

})

test("can't submit form when button is disabled", () => {
    const obSubmit = jest.fn()
    render(<LoginForm onSubmit={obSubmit} />)

    const button = screen.getByRole("button")

    // fireEvent.click(button);
    userEvent.click(button)

    expect(obSubmit).toHaveBeenCalledTimes(0)
})

test("submit form when btn is clicked",()=>{
    const onSubmit=jest.fn()
    render(<LoginForm submitLogin={onSubmit}/>)

    const email=screen.getByLabelText('email')
    const password=screen.getByLabelText('pw')
    const button=screen.getByRole('button')

    userEvent.type(email,"user@test.com")
    userEvent.type(password,"Test1234")
    userEvent.click(button)

    expect(onSubmit).toHaveBeenCalled(1)
})