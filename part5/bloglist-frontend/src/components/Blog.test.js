import { render, fireEvent, getByText } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Blog from './Blog'

describe('Blog Content rendered', () => {

  let increaseLike
  let deleteBlog 
  let blogContent
  let component

  beforeEach(() => {
    increaseLike = jest.fn()
    deleteBlog = jest.fn()
    blogContent = {
      title: 'This is test blog',
      url: 'http://google.com/test-blog-url',
      author: 'Test author',
      user: {
        name: 'Test user'
      },
      likes: 152
    }
    component = render(
      <Blog blog={blogContent} increaseLike={increaseLike} deleteBlog={deleteBlog} />
    )
  }) 

  test('displays title and author', () => {
    const container = component.container
    const mainContent = container.querySelector('.main-content')
    expect(mainContent.textContent).toMatch(/This is test blog/)
    expect(mainContent.textContent).toMatch(/Test author/)
  })

  test('does not display url and number of likes', () => {
    const container = component.container
    expect(container.textContent).not.toMatch(/http:\/\/google.com\/test-blog-url/)
    expect(container.textContent).not.toMatch(/likes 152/)
    expect(container.querySelector('.detail-content'))
    .not
    .toBeInTheDocument()
  })

  test('show url and number of likes after clicking view button', () => {
    const container = component.container
    const button = getByText(container, 'view')
    fireEvent.click(button)

    expect(container.textContent).toMatch(/http:\/\/google.com\/test-blog-url/)
    expect(container.textContent).toMatch(/likes 152/)
    expect(container.querySelector('.detail-content')).toBeInTheDocument()
  })

  test('show clicking like button twice props event is received', () => {
    const container = component.container
    const viewButton = getByText(container, 'view')
    fireEvent.click(viewButton)

    const detailContainer = container.querySelector('.detail-content')

    const likeButton = getByText(detailContainer, 'like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(increaseLike.mock.calls).toHaveLength(2)
    expect(increaseLike.mock.calls[0][0]).toEqual(blogContent)
    expect(increaseLike.mock.calls[1][0]).toEqual(blogContent)
  })
})