import { test, expect } from 'vitest'
import skills from './skills'

test('skills has 5 categories', () => {
  expect(skills).toHaveLength(5)
})

test('every category has at least one item', () => {
  skills.forEach(g => expect(g.items.length).toBeGreaterThan(0))
})

test('every skill has a level of 1, 2, or 3', () => {
  skills.forEach(g =>
    g.items.forEach(s => expect([1, 2, 3]).toContain(s.level))
  )
})
