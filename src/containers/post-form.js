import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

const formConfig = {
    form: 'createPostForm',
    fields: ['title', 'content', 'author'],
    validate: validate,
    initialValues: { author: 'Moi' }
}

class PostForm extends Component {
    render() {
        const { fields: {title, content, author}, handleSubmit, errors } = this.props;
        console.log(errors);
        return (
            <div>
                <h1>Nouveau post</h1>
                <form onSubmit={handleSubmit(this.createPost.bind(this))}>
                    <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                        <label>Titre</label>
                        <input className="form-control" type="text" { ...title }/>
                        <div className={`${title.touched && title.invalid ? 'text-danger' : ''}`}>{title.touched && errors.title}</div>
                    </div>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                        <label>Description</label>
                        <input className="form-control" type="textarea" { ...content }/>
                        <div className={`${content.touched && content.invalid ? 'text-danger' : ''}`}>{content.touched && errors.content}</div>
                    </div>
                    <div className={`form-group ${author.touched && author.invalid ? 'has-danger' : ''}`}>
                        <label>Auteur</label>
                        <input className="form-control" type="text" { ...author }/>
                        <div className={`${author.touched && author.invalid ? 'text-danger' : ''}`}>{author.touched && errors.author}</div>
                    </div>
                    <Link to={'/'} className="button_space"><button className="btn btn-danger">Retour</button></Link>
                    <button type="submit" className="btn btn-primary" disabled={this.props.invalid}>Créer</button>
                </form>
            </div>
        );
    }

    createPost(post) {
        this.props.createPost(post);
        browserHistory.push('/');  // redirection à la page d'accueil
    }
}

function validate(values) {     // Les erreurs retournées par validate se retrouvent dans les props "errors": (cette fonction est utilisé dans formConfig)
    const errors = {};
    if (!values.title) {
        errors.title = 'Veuillez remplir le titre';
    } 
    if (!values.content) {
        errors.content = 'Veuillez remplir la description';
    }
    if (!values.author) {
        errors.author = 'Veuillez saidir le nom de l\'auteur';
    }
    return errors;
}
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({createPost}, dispatch)
})

export default connect(null,mapDispatchToProps)(reduxForm(formConfig)(PostForm));