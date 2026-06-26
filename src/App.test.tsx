import { render, screen } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
  render(<App />)
  expect(screen.getAllByText(/PONGY/i).length).toBeGreaterThan(0)
})
