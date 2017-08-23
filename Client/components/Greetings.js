import React from 'react';

export default () => {
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '50%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  }
);
  return (
    <div className="main">
       <div className=" container row ">
                  <h1 className="books">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.” 
                 </h1>
                 <h2 className="author"> ~Jane Austen, Northanger Abbey</h2>
                 <div className="row">
                   {/* first Modal */}
                    <div className="col s3 offset-s4">
                      <a className="waves-effect waves-teal btn-large modal-trigger" href="#modal1">Sign Up</a>
                      <div id="modal1" className="modal">
                        <div className="modal-content">
                          <form className="col s12">
                            <div className="row">
                             <div className="input-field col s6">
                                <input id="first_name" type="text" class="validate"/>
                                  <label for="first_name">First Name</label>
                             </div>
                             <div className="input-field col s6">
                                <input id="last_name" type="text" class="validate"/>
                                 <label for="last_name">Last Name</label>
                             </div>
                           </div>
                           <div className="row">
                              <div className="input-field col s12">
                                <input id="user_name" type="text" class="validate"/>
                                  <label for="user_name">User Name</label>
                             </div>
                           </div>
                           <div className="row">
                              <div className="input-field col s12">
                                <input id="password" type="password" class="validate"/>
                                 <label for="password">Password</label>
                             </div>
                           </div>
                           <div className="row">
                             <div className="input-field col s12">
                               <input id="email" type="email" class="validate"/>
                                <label for="email">Email</label>
                             </div>
                           </div>
                         </form>
                       </div>
                       <div className="modal-footer">
                           <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                       </div>
                     </div>
                   </div>
                   {/* second modal */}
                   <div className="col s4">
                   <a className="waves-effect waves-teal btn-large modal-trigger" href="#modal2">Sign In</a>
                   <div id="modal2" className="modal">
                     <div className="modal-content">
                       <form className="col s12">
                         <div className="row">
                          <div className="input-field col s12">
                             <input id="first_name" type="text" class="validate"/>
                               <label for="user_name">User Name</label>
                          </div>
                         </div>  
                        <div className="row">
                           <div className="input-field col s12">
                             <input id="password" type="password" class="validate"/>
                              <label for="password">Password</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <input id="email" type="email" class="validate"/>
                             <label for="email">Email</label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close"><button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                     </button></a>
                    </div>
      </div>
    </div>
  </div>
  </div>
  </div>
   );
};
