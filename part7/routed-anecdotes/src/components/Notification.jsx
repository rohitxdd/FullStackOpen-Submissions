function Notification({ notify }) {
    return (
        <>
            {notify && <div>a new anecdote {notify} created!</div>}
        </>

    )
}

export default Notification