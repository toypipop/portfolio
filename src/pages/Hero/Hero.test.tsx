import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders hero content', () => {
  render(<Hero />)
  expect(screen.getByText('PONGYANIN')).toBeInTheDocument()
  expect(screen.getByText('AUSSWAPIPOP')).toBeInTheDocument()
  expect(screen.getByText(/VIEW ENCOUNTERS/i)).toBeInTheDocument()
})
