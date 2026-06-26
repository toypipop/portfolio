import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects'

test('renders projects page', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>)
  expect(screen.getByText('Field Work')).toBeInTheDocument()
  expect(screen.getByText('Payroll System')).toBeInTheDocument()
})
