import { render } from '@testing-library/react'
import VineSVG from './VineSVG'

test('renders vine SVG for each position', () => {
  const positions = ['top-right', 'bottom-left', 'top-left', 'bottom-right'] as const
  positions.forEach((pos) => {
    const { container } = render(<VineSVG position={pos} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
