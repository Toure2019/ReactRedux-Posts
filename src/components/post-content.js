import React from 'react';

const PostContent = ({ post }) => {
        return (
            <div>
                <h2>{ post.title }</h2>
                <p>{ post.content }</p>
                <p>Auteur: { post.author }</p>
            </div>
        );
}

export default PostContent;