import { test, expect } from 'vitest'
import skills from './skills'

test('skills has 5 categories', () => {
  expect(skills).toHaveLength(5)
})

test('every category has at least one item', () => {
  skills.forEach(g => expect(g.items.length).toBeGreaterThan(0))
})
