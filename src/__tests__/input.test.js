import React from "react";
import { cleanup, render, screen, fireEvent,  waitFor} from '@testing-library/react';
import Input from "../components/Input";


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
  const input = screen.getByLabelText(`input-${mockname}`, {selector: 'input'})
  const span = screen.getByText(`Enter a value between ${mockmin} and ${mockmax}`)

  return {
    label,
    input,
    span
  }
}

describe('Rendering Input', () => {
  afterEach(cleanup);

  it('Should render input without crashing', () => {
    const { label,span, input} = setup()

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(span).toBeInTheDocument()
  })

})
