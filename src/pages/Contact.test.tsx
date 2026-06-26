import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact'

test('renders contact page with links', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>)
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Phone')).toBeInTheDocument()
  expect(screen.getByText(/2509pipop4951pi@gmail.com/)).toBeInTheDocument()
})
