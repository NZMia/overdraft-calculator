import React from "react";
import { render, screen, waitFor, fireEvent, getAllByAltText } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from "../App";

const setup = () => {
  render(<App />)
  const header = screen.getByRole('heading')
  const p = screen.getByText(/interest free/i)
  const button = screen.getByText(/calculate/i)
  const result = screen.queryByText(/interest charged/i)

  return {
    header,
    p,
    button,
    result
  }
}

describe('Rendering Calculator', () => {

  it('Should render calculator without crashing', () => {
    const { header, p, button, result } = setup()

    expect(header).toBeInTheDocument()
    expect(p).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(result).not.toBeInTheDocument();
  })

  it('Should show calculator result', () => {
    const { button, result } = setup();
    userEvent.click(button)
    waitFor(() =>  expect(result).toBeInTheDocument())
  })
})
