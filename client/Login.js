import React,{Component} from 'react';

class Login extends Component {
  render(){
    return (
      <div className="page-wrapper">
          <div className="container-fluid">
              <div className="col-lg-12 col-xlg-12 col-md-12">
                  <div className="card">
                      <div className="card-block">
                          <form className="form-horizontal form-material">
                              <div className="form-group">
                                  <label className="col-md-12">First Name</label>
                                  <div className="col-md-12">
                                      <input type="text" placeholder="Johnathan Doe" className="form-control form-control-line"/>
                                  </div>
                              </div>
                              <div className="form-group">
                                  <label className="col-md-12">Password</label>
                                  <div className="col-md-12">
                                      <input type="password" value="password" className="form-control form-control-line"/>
                                  </div>
                              </div>
                              <div className="form-group">
                                  <div className="col-sm-12">
                                      <button className="btn btn-success">Login</button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default Login;
