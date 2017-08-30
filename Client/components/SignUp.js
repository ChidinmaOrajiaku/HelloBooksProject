import React from 'react';

export default () => {
  return (
      <div className="row container signUp">
  <div className="col s12 m6 push-m2">
    <div className="card">
    <div className="card-content black-text">
    <form onSubmit={this.onSubmit}>
    <div className="row">
     <div className="input-field col s6">
        <input value={this.state.firstname} onChange={this.handleChange} id="firstname" type="text"  required="required" className="validate"/>
          <label htmlFor="firstname">First Name</label>
     </div>
     <div className="input-field col s6">
        <input value={this.state.lastname} onChange={this.handleChange} required="required" id="lastname" type="text" className="validate"/>
         <label htmlFor="lastname">Last Name</label>
     </div>
   </div>
   <div className="row">
      <div className="input-field col s12">
        <input value={this.state.username} onChange={this.handleChange} required="required" id="username" type="text" className="validate"/>
          <label htmlFor="username">User Name</label>
     </div>
   </div>
   <div className="row">
      <div className="input-field col s12">
        <input value={this.state.password} onChange={this.handleChange} required="required" id="password" type="password" className="validate"/>
         <label htmlFor="password">Password</label>
     </div>
   </div>
   <div className="row">
     <div className="input-field col s12">
       <input value={this.state.email} onChange={this.handleChange} required="required" id="email" type="email" className="validate"/>
        <label htmlFor="email">Email</label>
     </div>
   </div>
   <button className="btn waves-effect waves-light" type="submit" name="action">Submit
<i className="material-icons right">send</i>
</button>
 </form>
 </div>
 </div>
 </div>
 </div>
  );
};


