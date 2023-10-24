import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

test('renders heading "Pomodoro Timer: 25 + 5 Clock" successfully', () => {
    render(<Header />)

    const element = screen.getByText("Pomodoro Timer: 25 + 5 Clock")

    expect(element).toBeInTheDocument()
})
