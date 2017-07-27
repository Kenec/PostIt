import React, { Component } from 'react';


class ComposeMessageBoard extends Component {

  render(){
    return(
        <div className="row">
          <div className="page-title blue-text text-darken-2">SEND MESSAGE</div>
          <form className="" action="" method="">
              <div className="form-group">
                  <label htmlFor="groups"><span className="black-text"><b>Select Group:</b></span></label>
                  <select className="form-control" name="groups">
                      <option value="">Andela Fellows</option>
                      <option value="">Football Teams</option>
                      <option value="">Classmates</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="message_priority"><span className="black-text"><b>Message Priority:</b></span></label>
                  <select className="form-control" name="message_priority">
                      <option value="1">Normal</option>
                      <option value="2">Urgent</option>
                      <option value="3">Critical</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="message"><span className="black-text"><b>Message:</b></span></label>
                  <textarea className="form-control" rows="5" id="message"></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
    );
  }
}

export default ComposeMessageBoard;
