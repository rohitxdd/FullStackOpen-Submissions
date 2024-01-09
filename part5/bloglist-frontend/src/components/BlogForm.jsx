import { useRef } from "react";
import { useMessage } from "../services/MessageContext";

const formStyle = {
    margin: "5px",
};
export default function BlogForm({ createBlog, setFormVisibility }) {
    const { showMessage } = useMessage();
    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const urlRef = useRef(null);

    function handleSubmit() {
        if (titleRef.current.value && authorRef.current.value && urlRef.current.value) {
            const inputs = {
                title: titleRef.current.value,
                author: authorRef.current.value,
                url: urlRef.current.value,
            }
            createBlog(inputs)
        } else {
            showMessage({ text: "All Fields are required", status: "error" });
        }
    }


    return (
        <div>
            <h3>Create New Blog</h3>
            <div style={formStyle}>
                <span>
                    <strong>Title: </strong>
                </span>
                <input data-testid="input-title" type="text" ref={titleRef} name="title"></input>
            </div>
            <div style={formStyle}>
                <span>
                    <strong>Authur: </strong>
                </span>
                <input data-testid="input-author" type="text" ref={authorRef} name="authur"></input>
            </div>
            <div style={formStyle}>
                <span>
                    <strong>Url: </strong>
                </span>
                <input data-testid="input-url" type="text" ref={urlRef} name="url"></input>
            </div>
            <div style={formStyle}>
                <button data-testid="button-submit" onClick={handleSubmit}>Create</button>
                <button onClick={() => setFormVisibility(false)}>Cancel</button>
            </div>
        </div>
    )
}
