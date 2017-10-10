import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { saveImageCloudinary, adminAddRequest } from '../../actions/booksAction';

/**
 * @class Dashboard
 */
class AddBooks extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: '',
      tempImage: '',
      image: '',
      review: '',
      pointer: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof AddBooks
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.imageInputUrl);
    if (nextProps.imageInputUrl && this.state.pointer) {
      this.setState({
        image: nextProps.imageInputUrl,
        pointer: false }),
      setTimeout(() => {
        this.props.adminAddRequest(this.state);
      }, 1000);
    }
  }

  /**
 * 
 * @constructor
 * @param {any} event 
 * @memberof AddBooks
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
 * 
 * @constructor
 * @param {any} event 
 * @memberof AddBooks
 */
  onAddSubmit(event) {
    event.preventDefault();
    this.props.saveImageCloudinary(this.state.tempImage);
    this.setState({ pointer: true });
  }
  /**
 * 
 * @constructor
 * @param {any} event 
 * @memberof AddBooks
 */
  handleImageChange(event) {
    event.preventDefault();
    const imageInput = event.target.files[0];
    const imageInputReader = new FileReader();
    if (imageInput) {
      imageInputReader.onload = () => {
        const newUpload = new Image();
        newUpload.src = imageInputReader.result;
        newUpload.onload = () => {
          this.setState({ tempImage: imageInput });
        };
      };
    }
    imageInputReader.readAsDataURL(imageInput);
  }

  /**
     * 
     * 
     * @constructor 
     * @memberof AddBooks
     */
  render() {
    return (
      <div className="adminAddBooks row ontainer">
        <div className=""> <NavigationBar /> </div>
        <div className="col m4 offset-m5">
          <div className="card">
            <form onSubmit={this.onAddSubmit} id="form">
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.title} onChange={this.handleChange} id="title" type="text" className="validate"/>
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.author} onChange={this.handleChange} id="author" type="text" className="validate"/>
                  <label htmlFor="author">Author</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.category} onChange={this.handleChange} id="category" type="text" className="validate"/>
                  <label htmlFor="category">Category</label>
                </div>
              </div>
              <div className="row">
                <div className="file-field input-field col s12">
                  <div className="btn file">
                    <span><i className="material-icons">file_upload</i></span>
                    <input type="file" onChange={this.handleImageChange} id="image"/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload Image"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea value={this.state.review} onChange={this.handleChange} id="review" className="materialize-textarea"></textarea>
                  <label htmlFor="review">Review</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Add<i className="material-icons right">send</i></button>
            </form>
          </div>
        </div>
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    imageInputUrl: state.uploadImage[0].response
  }
);

export default connect(mapStateToProps, { adminAddRequest, saveImageCloudinary })(AddBooks);
