import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders subheading', () => {
  const { getByText } = render(<App />)
  const subheading = getByText(/Anonymize your text./i)
  expect(subheading).toBeInTheDocument()
})
