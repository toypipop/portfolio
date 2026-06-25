import { test, expect } from 'vitest'
import projects from './projects'

test('projects has 3 entries', () => {
  expect(projects).toHaveLength(3)
})

test('every project has id and title', () => {
  projects.forEach(p => {
    expect(p.id).toBeTruthy()
    expect(p.title).toBeTruthy()
  })
})
