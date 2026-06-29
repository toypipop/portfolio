import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

test('renders about content', () => {
  render(<MemoryRouter><About /></MemoryRouter>)
  expect(screen.getByText('Survivor Log')).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
  expect(screen.getByText(/Chiang Mai/i)).toBeInTheDocument()
})
