import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';
import NavigationBar from '../NavigationBar';
import { getRequest } from '../../actions/getAllBooks';
import { adminModifyRequest } from '../../actions/modifyBooks';
import { adminDeleteRequest } from '../../actions/deleteBooks';

/**
 * @class Books
 */
class Books extends React.Component {
  /**
     * @constructor
     * @param {object} props 
     */
  constructor(props) {
    super(props);
    this.state = {
      getAllBooks: [],
      loading: true,
      pointer: false,
    };
  }

  /**
   * 
   * @constructor
   * @param {any} nextProps 
   * @memberof Books
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.getAllBooksData) {
      this.setState({
        loading: false,
        getAllBooks: nextProps.getAllBooksData
      });
    }
  }

  /**
   * 
   * @constructor
   * @memberof Books
   */
  componentDidMount() {
    this.props.getRequest();
  }
  /**
     * 
     * 
     * @constructor 
     * @memberof Books
     */
  render() {
    console.log(this.state.getAllBooks);
    return (
      <div className="adminAddBooks row ontainer">
        <div className=""> <NavigationBar /> </div>
        <div className="row col m8 offset-m3">
          <div className="col s12 ">
            <div className="card">
              <div className="card-content teal-text">
                <table className="bordered highlight centered responsive-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Item Name</th>
                      <th>Item Price</th>
                    </tr>
                  </thead>

                  <tbody>
            
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div> <Footer/></div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    getAllBooksData: state.getAllBooks[0].response
  }
);

export default connect(mapStateToProps, { adminModifyRequest, adminDeleteRequest, getRequest })(Books);
