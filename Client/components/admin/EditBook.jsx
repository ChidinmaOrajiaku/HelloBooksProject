import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { saveImageCloudinary } from '../../actions/booksAction';
import { adminModifyRequest } from '../../actions/modifyBooks';
import { getBookRequest } from '../../actions/getABook';
import { getAllCategoryRequest } from '../../actions/getCategory';

/**
 * @class EditBook
 */
class EditBook extends React.Component {
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
      imagePreview: '',
      preview: '',
      review: '',
      modified: '',
      bookData: '',
      categoryData: [],
      currentBookId: localStorage.getItem('currentBookId'),
      pointer: false,
      loading: true,
      categoryLoader: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onEditCloudinaryRequest = this.onEditCloudinaryRequest.bind(this);
    this.onEditRequest = this.onEditRequest.bind(this);
  }

  /**
 * 
 * @returns {object} mounted components
 * @memberof EditBook
 */
  componentDidMount() {
    this.props.getBookRequest(this.state.currentBookId);
    this.props.getAllCategoryRequest().then(() => {
      $('select').material_select();
      $('select').change(event => this.handleChange(event));
    });
  }

  /**
 * 
 * @returns {nextProps} nextProps
 * @param {any} nextProps 
 * @memberof EditBook
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.getABookData && this.state.loading) {
      this.setState({
        loading: false,
        bookData: nextProps.getABookData,
        title: nextProps.getABookData.title,
        author: nextProps.getABookData.author,
        category: nextProps.getABookData.category,
        imagePreview: nextProps.getABookData.image,
        image: nextProps.getABookData.image,
        review: nextProps.getABookData.review
      });
    }
    if (nextProps.imageInputUrl && this.state.pointer) {
      this.setState({
        image: nextProps.imageInputUrl,
        pointer: false }),
      setTimeout(() => {
        this.props.adminModifyRequest(this.state.currentBookId, this.state);
      }, 1000);
      if (nextProps.modifyBookData.isModified === true) {
        this.props.history.push('/books');
        Materialize.toast('Successfully Updated', 2000, 'teal rounded');
      } else {
        Materialize.toast('Not Updated', 2000, 'red rounded');
      }
    }

    if (nextProps.getCategoryData) {
      this.setState({
        categoryLoader: false,
        spliceCategoryData: nextProps.getCategoryData.splice(this.state.category, 1),
        categoryData: nextProps.getCategoryData
      });
    }
  }

  /**
 * 
 * @returns {event} event
 * @param {any} event 
 * @memberof EditBook
 */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
 * 
 * @returns {event} handle Image change
 * @param {any} event 
 * @memberof EditBook
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
          this.setState({
            tempImage: imageInput,
            imagePreview: imageInput.name,
            preview: newUpload.src
          });
        };
      };
    }
    imageInputReader.readAsDataURL(imageInput);
  }

  /**
 * 
 * @returns {SyntheticEvent} event
 * @param {any} event 
 * @memberof EditBook
 */
  onEditCloudinaryRequest(event) {
    event.preventDefault();
    this.props.saveImageCloudinary(this.state.tempImage);
    this.setState({ pointer: true });
  }

  /**
 * 
 * @returns {SyntheticEvent} event
 * @param {any} event 
 * @memberof EditBook
 */
  onEditRequest(event) {
    event.preventDefault();
    this.props.adminModifyRequest(this.state.currentBookId, this.state);
    setTimeout(() => {
      if (this.props.modifyBookData.isModified === true) {
        this.props.history.push('/books');
        Materialize.toast('Successfully Updated', 2000, 'teal rounded');
      } else {
        Materialize.toast('Not Updated', 2000, 'red rounded');
      }
    }, 1000);
  }

  /**
     * 
     * 
     * @returns {ReactElement} Markup 
     * @memberof EditBook
     */
  render() {
    const category = this.state.categoryLoader ? <div> Loading... </div> :
      <div className="row">
        <div className="input-field col s12 status">
          <select className="teal-text" id= "category" value="1"
            onChange={this.handleChange}>
            <option value={this.state.category}> {this.state.category} </option>
            { Object.keys(this.state.categoryData).map(key =>
              (<option key = {key} value={this.state.categoryData[key].category}
              >
                {this.state.categoryData[key].category }
              </option>)
            )}
          </select>
          <label className="black-text sort">Category</label>
        </div>
      </div>;
    return (
      <div className="adminAddBooks row">
        <div className=""> <NavigationBar /> </div>
        <div className="col m4 offset-m5">
          <div className="card">
            <form
              onSubmit={this.state.tempImage === '' ? this.onEditRequest :
                this.onEditCloudinaryRequest}
              id="form">
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.title} onChange={this.handleChange}
                    id="title" type="text" className="validate"/>
                  <label className="active" htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.author} onChange={this.handleChange}
                    id="author" type="text" className="validate"/>
                  <label className="active" htmlFor="author">Author</label>
                </div>
              </div>
              { category }
              <div className="row">
                <div className="file-field input-field col s12">
                  <div className="btn file">
                    <span><i className="material-icons">file_upload</i></span>
                    <input type="file" onChange={this.handleImageChange}
                      id="image"/>
                  </div>
                  <div className="file-path-wrapper">
                    <input value={this.state.imagePreview}
                      className="file-path validate" type="text"
                      placeholder="Upload Image"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea value={this.state.review}
                    onChange={this.handleChange}
                    id="review" className="materialize-textarea"></textarea>
                  <label className="active" htmlFor="review">Review</label>
                </div>
              </div>
              <button className="btn waves-effect waves-light" type="submit"
                name="action">Update<i className="material-icons right">
                send</i>
              </button>
            </form>
          </div>
        </div>
        <div> <Footer /></div>
      </div>
    );
  }
}

EditBook.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    modifyBookData: state.modifyBooks[0],
    imageInputUrl: state.uploadImage[0].response,
    getBookId: state.editBookId[0].response,
    getABookData: state.getABook[0].response,
    getCategoryData: state.getCategory[0].response,
  }
);

export default connect(mapStateToProps,
  { adminModifyRequest, getBookRequest, saveImageCloudinary, getAllCategoryRequest
  })(EditBook);
