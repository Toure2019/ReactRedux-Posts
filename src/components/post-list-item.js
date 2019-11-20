import React from 'react';
import { Link } from 'react-router';

const PostListItem = (props) => {
    const { post } = props;
    return (
        <tr>
            <td><Link to={`post/${post.id}`}>{post.title}</Link></td>
            <td><button className="btn btn-danger" onClick={() => deletePost(post)}>Supprimer</button></td>
        </tr>
    );

    function deletePost(post) {
        props.deletePostCallback(post);
    }
}

export default PostListItem;