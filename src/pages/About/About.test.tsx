import { render, screen } from '@testing-library/react'
import About from './About'

test('renders about content', () => {
  render(<About />)
  expect(screen.getByText("Farmer's Journal")).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
})
