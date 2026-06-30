import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

test('renders logo and all nav links as anchors', () => {
  render(<Navbar />)
  expect(screen.getByText(/PONGY/i)).toBeInTheDocument()
  expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
})

test('nav links have correct href attributes', () => {
  render(<Navbar />)
  const links = screen.getAllByRole('link')
  const hrefs = links.map((l) => l.getAttribute('href'))
  expect(hrefs).toContain('#about')
  expect(hrefs).toContain('#skills')
  expect(hrefs).toContain('#projects')
  expect(hrefs).toContain('#contact')
})

test('hamburger button is present', () => {
  render(<Navbar />)
  expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
})
