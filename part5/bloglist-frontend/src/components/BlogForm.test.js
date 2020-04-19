import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Blog form tests', () => {

  test('some test', () => {
    let mockCreate = jest.fn()
    const component = render(
      <BlogForm createBlog={mockCreate}/>
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'This awesome blog' } } )
    fireEvent.change(authorInput, { target: { value: 'Test author' } } )
    fireEvent.change(urlInput, { target: { value: 'http://example.com/test/awesome/blog' } })
    
    fireEvent.submit(form)

    
    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0]).toEqual({
      title: 'This awesome blog',
      author: 'Test author',
      url: 'http://example.com/test/awesome/blog'
    })

    // Verify that values are reset after the form is submitted
    expect(titleInput.value).toEqual('')
    expect(authorInput.value).toEqual('')
    expect(urlInput.value).toEqual('')
  })
})
