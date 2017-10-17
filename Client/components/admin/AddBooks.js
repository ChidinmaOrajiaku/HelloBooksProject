import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { saveImageCloudinary } from '../../actions/booksAction';
import { adminAddRequest } from '../../actions/createBooks';
import { getAllCategoryRequest } from '../../actions/getCategory';

/**
 * @class AddBooks
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
      categoryData: [],
      tempImage: '',
      image: '',
      review: '',
      pointer: false,
      loader: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * 
   * @returns {nextProps} nextprops
   * @param {any} nextProps 
   * @memberof AddBooks
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageInputUrl && this.state.pointer) {
      this.setState({
        image: nextProps.imageInputUrl,
        pointer: false }),
      setTimeout(() => {
        this.props.adminAddRequest(this.state).then(
          () => {
            Materialize.toast(this.props.createBooksResponse, 2000, 'teal rounded');
          }
        );
      }, 1000);
    }
    this.setState({
      loader: false,
      categoryData: nextProps.getCategoryData
    });
  }

  /**
   * 
   * @returns {data} get Category
   * @memberof AddBooks
   */
  componentDidMount() {
    this.props.getAllCategoryRequest().then(() => {
      $('select').material_select();
      $('select').change(event => this.handleChange(event));
    });
  }

  /**
 * 
 * @returns {event} SyntheticEvent
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
 * @returns {event} handle Image change
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
     * @returns {ReactElement} MarkUp
     * @memberof AddBooks
     */
  render() {
    const category = this.state.loading ? <div> Loading... </div> :
      <div className="row">
        <div className="input-field col s12 status">
          <select className="teal-text" id= "category" value="1" onChange={this.handleChange}>
            {<option className="default" value="..." disabled value> Select One </option>}
            { Object.keys(this.state.categoryData).map(key => (<option key = {key} value={this.state.categoryData[key].category }>{this.state.categoryData[key].category } </option>)
            )}
          </select>
          <label className="black-text sort">Category</label>
        </div>
      </div>;
    return (
      <div className="adminAddBooks row ontainer">
        <div className=""> <NavigationBar /> </div>
        <h4 className="col m8 offset-m3"> ADMIN UPLOAD BOOKS </h4>
        <div className="col m4 offset-m5">
          <div className="card">
            <form onSubmit={this.onAddSubmit} id="form">
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.title} onChange={this.handleChange} id="title" type="text" className="validate" required="required"/>
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input value={this.state.author} onChange={this.handleChange} id="author" type="text" className="validate" required="required"/>
                  <label htmlFor="author">Author</label>
                </div>
              </div>
              {category}
              <div className="row">
                <div className="file-field input-field col s12">
                  <div className="btn file">
                    <span><i className="material-icons">file_upload</i></span>
                    <input type="file" onChange={this.handleImageChange} id="image"/>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload Image" required="required"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea value={this.state.review} onChange={this.handleChange} id="review" className="materialize-textarea" required="required"></textarea>
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
    createBooksResponse: state.createBooks[0].response.message,
    imageInputUrl: state.uploadImage[0].response || state.uploadImage[0].error,
    getCategoryData: state.getCategory[0].response
  }
);

export default connect(mapStateToProps, { adminAddRequest, saveImageCloudinary, getAllCategoryRequest })(AddBooks);
