import { render, screen } from '@testing-library/react'
import Skills from './Skills'

test('renders all skill categories', () => {
  render(<Skills />)
  expect(screen.getByText('Backend')).toBeInTheDocument()
  expect(screen.getByText('Frontend')).toBeInTheDocument()
  expect(screen.getByText('Database')).toBeInTheDocument()
  expect(screen.getByText('Django')).toBeInTheDocument()
  expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
})
