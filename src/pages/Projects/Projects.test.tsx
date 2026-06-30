import { render, screen } from '@testing-library/react'
import Projects from './Projects'

test('renders projects page', () => {
  render(<Projects />)
  expect(screen.getByText('Field Work')).toBeInTheDocument()
  expect(screen.getByText('Payroll System')).toBeInTheDocument()
})
