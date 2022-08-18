import React from "react";
import { render, screen, fireEvent, getAllByAltText } from '@testing-library/react';
import Input from "../components/Input";
import inputInfo from '../utils/_constant';

const setup = () => {

  const mocktitle = "Arranged overdraft limit"
  const mockname = "limit"
  const mockmin = 1
  const mockmax = 5000
  const mocKErrorMsg = [];

  render(<Input
    name={mockname}
    title={mocktitle}
    min={mockmin}
    max={mockmax}
    isRequired={true} 
    errorMsg={mocKErrorMsg}
    handleOnChange={fireEvent}
    />)

  const label = screen.getByText(mocktitle);
  const span = screen.getByLabelText(/Arranged overdraft limit/i)
  const input = screen.getByLabelText(/input-limit/i, {selector: 'input'})
  // const span = screen.getByText(/Enter a value between 1 and 5000 /i)
  // const button = screen.getByText(/calculate/i)
  // const result = screen.queryByText(/interest charged/i)
  return {
    label,
    span,
    input
    // span,
    // button,
    // result
  }
}

describe('Rendering Input', () => {
  
  it('Should render input without crashing', () => {
    const { label, span, input} = setup()

    expect(label).toBeInTheDocument()
    expect(span).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })
})
