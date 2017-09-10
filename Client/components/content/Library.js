import React from 'react';
import map from 'lodash/map';
import axios from 'axios';

class Library extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          title: '',
          author: '',
          category: '',
          image: '',
          review: '',
          data: []
        }
    
        // this.handleChange = this.handleChange.bind(this);
        // this.onAddSubmit = this.onAddSubmit.bind(this);
      }

      componentWillMount() {
        axios.get('/api/v1/users/books').then((res) => {
          localStorage.getItem('jwtToken');
          this.setState({ data: res.data})
          console.log(this.state.data);
        });
       };
       
       componentDidMount() {
        $('.scrollspy').scrollSpy()
        $('.tooltipped').tooltip({delay: 50});
      } 

    render() {

    // $(document).ready(function(){
      
    // });
    const { data } = this.state
  return (
      <div className= "library">
    <div className="row">
        <div className="col s12 m9 l10">
            {/* fictional */}
          <div id="fiction" className="section scrollspy">
          <h1 className = "libraryHeading"> Fiction </h1>
             <div className="row">
               <div className="col s3 ">
                  <div className="card hoverable">
                     <div className="card-image">
                         <img src={this.state.data.map (books => books.image)} />
                         <a href="#" className="btn tooltipped btn-floating halfway-fab waves-effect waves-light teal" data-position="bottom" data-delay="50" data-tooltip="Hi! Click to borrow"><i className="material-icons">add</i></a>
                     </div>
                      <div className="card-content">
                         <p>{this.state.data.map (books => books.review)}</p>
                      </div>
                  </div>
             </div>   
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
export default Library;
