import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { MessageProvider } from "../services/MessageContext";

test("new blog form test", async () => {
  const title = "lorem ipsum";
  const author = "rohit sharma";
  const url = "rohit.com";

  const createBlog = jest.fn();
  const setVisibility = jest.fn();
  const user = userEvent.setup();

  render(
    <MessageProvider>
      <BlogForm createBlog={createBlog} setFormVisibility={setVisibility} />
    </MessageProvider>,
  );
  const titleInput = screen.getByTestId("input-title");
  const authorInput = screen.getByTestId("input-author");
  const urlInput = screen.getByTestId("input-url");

  const submitBtn = screen.getByTestId("button-submit");

  await user.type(titleInput, title);
  await user.type(authorInput, author);
  await user.type(urlInput, url);

  await user.click(submitBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(title);
});
