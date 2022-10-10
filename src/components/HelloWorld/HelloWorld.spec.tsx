import { render, screen } from '@testing-library/react'
import { HelloWorld } from './HelloWorld'

test('renders helloWorld component', () => {
  render(<HelloWorld title={'hello, world!!!'} />)
  const linkElement = screen.getByText(/hello, world!!!/i)
  expect(linkElement).toBeInTheDocument()
})
