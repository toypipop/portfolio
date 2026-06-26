import { render, screen } from '@testing-library/react'
import PageTransition from './PageTransition'

test('renders children', () => {
  render(<PageTransition><p>hello</p></PageTransition>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})
