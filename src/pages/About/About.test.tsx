import { render, screen } from '@testing-library/react'
import About from './About'

test('renders about content', () => {
  render(<About />)
  expect(screen.getByText('Survivor Log')).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
})
