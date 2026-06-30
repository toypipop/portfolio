import { render, screen } from '@testing-library/react'
import Contact from './Contact'

test('renders contact page with links', () => {
  render(<Contact />)
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Phone')).toBeInTheDocument()
  expect(screen.getByText(/2509pipop4951pi@gmail.com/)).toBeInTheDocument()
})
