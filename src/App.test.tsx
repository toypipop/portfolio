import { render } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
  expect(() => render(<App />)).not.toThrow()
})

test('renders all sections', () => {
  render(<App />)
  expect(document.getElementById('hero')).toBeInTheDocument()
  expect(document.getElementById('about')).toBeInTheDocument()
  expect(document.getElementById('skills')).toBeInTheDocument()
  expect(document.getElementById('projects')).toBeInTheDocument()
  expect(document.getElementById('contact')).toBeInTheDocument()
})
