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

    const { container } = render(<Blog data={blogdata} />)
    screen.debug()

    const title = screen.getByTestId('blog-title')
    const url = screen.queryByTestId('blog-url')
    const like = screen.queryByTestId('blog-likes')
    expect(title).toHaveTextContent('Blog Title')
    expect(url).toBeNull()
    expect(like).toBeNull()

})