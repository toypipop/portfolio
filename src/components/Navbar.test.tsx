import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

test('renders logo and all nav links', () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>)
  expect(screen.getByText(/PONGY/i)).toBeInTheDocument()
  expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
})

test('hamburger button is present', () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>)
  expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
})
