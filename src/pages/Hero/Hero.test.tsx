import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

test('renders hero content', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>)
  expect(screen.getByText('PONGYANIN')).toBeInTheDocument()
  expect(screen.getByText('AUSSWAPIPOP')).toBeInTheDocument()
  expect(screen.getByText(/VIEW WORK/i)).toBeInTheDocument()
})
