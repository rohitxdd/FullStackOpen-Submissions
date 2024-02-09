const Anecdote = ({ data }) => {
    return (
        <>
            <h2>{data.content} by {data.author}</h2>
            <h3>has {data.votes} votes</h3>
            <h3>for more info see <a href={data.info}>{data.info}</a></h3>
        </>
    )
}

export default Anecdote;