import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders break length successfully', () => {
    render(<App />)

    const element = screen.getByTestId("break-label")
    expect(element).toHaveTextContent("Break Length")
})


test('renders session length successfully', () => {
    render(<App />)

    const element = screen.getByTestId("session-label")
    expect(element).toHaveTextContent("Session Length")
})


test('renders audio element successfully', () => {
    render(<App />)

    const element = screen.getByTestId("beep")
    expect(element).toBeInTheDocument()
})
