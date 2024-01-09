import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

test('render content', () => {
    const blogdata = {
        id: "random uuid",
        title: "Blog Title",
        url: "fake url",
        author: "fake author",
    }

    render(<Blog data={blogdata} />)

    const title = screen.getByTestId('blog-title')
    const url = screen.queryByTestId('blog-url')
    const like = screen.queryByTestId('blog-likes')
    expect(title).toHaveTextContent('Blog Title')
    expect(url).toBeNull()
    expect(like).toBeNull()

})


test('show url and likes on button click', async () => {
    const blogdata = {
        id: "random uuid",
        title: "Blog Title",
        url: "fake url",
        author: "fake author",
    }
    const mockfn = jest.fn()

    render(<Blog data={blogdata} IncrementLike={mockfn} RemoveBlog={mockfn} username={null} />)

    const user = userEvent.setup()

    const button = screen.getByTestId('toggleButton')

    await user.click(button)
    const url = screen.queryByTestId('blog-url')
    const like = screen.queryByTestId('blog-likes')

    expect(url).toBeDefined()
    expect(like).toBeDefined()
})

test('Like button is clicked twice', async()=>{
    const blogdata = {
        id: "random uuid",
        title: "Blog Title",
        url: "fake url",
        author: "fake author",
    }
    const mockLikefn = jest.fn()
    const mockRemovefn = jest.fn()

    render(<Blog data={blogdata} IncrementLike={mockLikefn} RemoveBlog={mockRemovefn} username={null} />)
    const user = userEvent.setup()
    const button = screen.getByTestId('toggleButton')
    await user.click(button)

    const likeBtn = screen.getByTestId('button-like')

    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockLikefn.mock.calls).toHaveLength(2)

})