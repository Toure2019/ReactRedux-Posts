import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  bindActionCreators } from 'redux';
import { readAllPost, deletePost } from '../actions/index';
import PostListItem from '../components/post-list-item';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6 ==> <CSSTransitionGroup></CSSTransitionGroup> remplace <tbody></tbody> sa balise parente 
import { Link } from 'react-router';

class PostList extends Component {
    constructor(props){
        super(props);
        this.state = { displayOnlyMines: false }
    }
    componentWillMount() {
        this.props.readAllPost();
    }
    renderPosts() {
        const { posts } = this.props;
        let arrayPosts;
        if (posts) {
            if (this.state.displayOnlyMines) {
                arrayPosts = this.filterMyPosts(posts);
            }else{
                arrayPosts = posts;
            }
            return arrayPosts.map(post => {
                return <PostListItem key={post.id} post={post} deletePostCallback={(post) => this.deletePostCallback(post)} />
            });
        }
    }
    deletePostCallback(post) {
        console.log('delete', post);
        this.props.deletePost(post.id);
    }
    filterMyPosts(postList) {
        return postList.filter(post => post.author == 'Moi');
    }

    render() {
        return (
            <div>
                <h1>Liste des posts</h1>
                <input type="checkbox" onChange={(e) => this.setState({ displayOnlyMines: e.target.checked })} /> Afficher uniquement mes posts
                <div className="button_add">
                    <Link to={'create-post'}><button className="btn btn-primary btn-circle btn-lg">+</button></Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody > */} 
                        <CSSTransitionGroup 
                            component="tbody"
                            transitionName="fade"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            { this.renderPosts() }
                        </CSSTransitionGroup>
                    {/* </tbody> */}
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ readAllPost, deletePost }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);