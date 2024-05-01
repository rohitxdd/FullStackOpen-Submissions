import { CreateNewBlog } from "../services/blogs";
import BlogForm from "./BlogForm";
import { useNotification } from "../context/NotificationContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function CreateBlog({ setFormVisibility }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: CreateNewBlog,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      setNotification({
        text: `A new Blog ${res.title} added`,
        status: "success",
      });
      setFormVisibility(false);
    },
    onError: () => {
      setNotification({ text: "something went wrong", status: "error" });
    }
  })

  const { setNotification } = useNotification()

  async function createBlog(inputs) {
    mutation.mutate({
      ...inputs
    })
  }

  return (
    <BlogForm createBlog={createBlog} setFormVisibility={setFormVisibility} />
  );
}
