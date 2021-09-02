import React from 'react';

const CreateForm = (props) => {
    return (
        <div>
            <h2>Create new</h2>

            <form id="createForm" onSubmit={(event) => props.handleCreate(event)}>
                title <input type="text" name="title" id="title" onChange={({ target }) => props.setTitle(target.value)} />
                <br />
                author <input type="text" name="author" id="author" onChange={({ target }) => props.setAuthor(target.value)} />
                <br />
                url <input type="text" name="link" id="link" onChange={({ target }) => props.setUrl(target.value)} />
                <br />
                likes <input type="text" name="likes" id="likes" onChange={({ target }) => props.setLikes(target.value)} />
                <br />
                <input type="submit" value="create" />
            </form>
        </div>
    );
};

export default CreateForm;