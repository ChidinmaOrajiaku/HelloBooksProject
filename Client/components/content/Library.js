import React from 'react';
import map from 'lodash/map';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../../index';
import { borrowRequest, getRequest } from '../../actions/booksAction';

class Library extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          user: (store.getState()).auth.user.id,
          title: '',
          author: '',
          category: '',
          image: '',
          review: '',
          booksId: '',
          data: []
        }
        this.onBorrowBooks = this.onBorrowBooks.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
      }
       
      onBorrowBooks(event) {
        this.props.borrowRequest(this.state.user,this.state).then(
          () => {Materialize.toast(this.state.profileResponse, 2000, 'teal rounded')},
          (errors) =>{
            Materialize.toast(errors.response.data.message, 2000, 'red accent-3 rounded')
         this.setState({ errors: errors.response.data.message  })
          }
        )
      }
      
      componentWillMount() {
        axios.get('/api/v1/users/books').then((res) => {
          localStorage.getItem('jwtToken');
          this.setState({ data: res.data})
        });
      }
       
    render() {

    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
      $('.scrollspy').scrollSpy()
    });
    
    const { data } = this.state
    const { borrowRequest } = this.props
  return (
      <div className= "library">
        <div className=""> <NavigationBar /> </div>
       <div className="row">
        <div className="col s12 m9 l10">
            {/* fictional */}
          <div id="fiction" className="section scrollspy">
          <h1 className = "libraryHeading"> Fiction </h1>
             <div className="row">
             {this.state.data.map ((books, index) =>
               <div className="col s3 " key={index}>
                  <div className="card hoverable">
                     <div className="card-image">
                         <img id="image" value={ books.image } onChange={ this.handleChange } src= { books.image }/>
                         <button value= { books.id } onChange={this.handleChange} className="btn tooltipped btn-floating halfway-fab waves-effect waves-light teal" data-position="bottom" data-delay="50" data-tooltip="Hi! Click to borrow" onClick= { this.onBorrowBooks } type="submit" name="action" ><i className="material-icons">add</i></button>
                     </div>
                      <div className="card-content">
                         <p>{books.review}</p>
                      </div>
                  </div>
             </div>   
          )
          }
          </div>
          </div>
    </div>
    <div className="col hide-on-small-only m3 l2">
      <ul className="section table-of-contents">
        <li><a href="#fiction">Fiction</a></li>
        <li><a href="#educational">Educational</a></li>
        <li><a href="#technology">Technology</a></li>
        <li><a href="#motivational">Motivational</a></li>
        <li><a href="#general">General</a></li>
      </ul>
    </div>
  </div>
  <div className='page'>
  <ul className="pagination">
  <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
  <li className="active"><a href="#!">1</a></li>
  <li className="waves-effect"><a href="#!">2</a></li>
  <li className="waves-effect"><a href="#!">3</a></li>
  <li className="waves-effect"><a href="#!">4</a></li>
  <li className="waves-effect"><a href="#!">5</a></li>
  <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
</ul>
</div>
</div>
   );
};
}


Library.propTypes = {
  borrowRequest: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired
}


export default connect(null, {borrowRequest, getRequest}) (Library);
