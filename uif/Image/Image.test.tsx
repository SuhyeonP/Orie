import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Image from './Image';
import { LightTheme, ThemeProvider } from '../Theme';

describe('Button with \'onClick\' prop', () => {
  const handleClick = jest.fn();

  it('onClick handler 가 잘 동작한다.', async () => {
    const { getByText } = render(
      <ThemeProvider theme={LightTheme}>
        <Image src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' onClick={handleClick} />
      </ThemeProvider>,
    );
    let button;
    await waitFor(() => {
      button = getByText('Test');
    });

    // DOM 에 render 되었는가?
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    // 버튼이 1회 클릭되고 callback fn 이 1회 호출되었는가?
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.click(button);

    // 버튼이 2회 클릭되고 callback fn 이 2회 호출되었는가?
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
