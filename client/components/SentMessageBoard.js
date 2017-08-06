import React, { Component } from 'react';


class SentMessageBoard extends Component {

  render(){
    return(
      <div className="row">
        <div className="page-title blue-text text-darken-2">
        <span>SENT MESSAGES</span>
        <span className="pull-right"></span>
        </div>
        <table className="table highlight striped">
          <thead>
            <tr>
              <th><span className="glyphicon glyphicon-trash"></span></th>
              <th>Sent To</th>
              <th>Messages</th>
              <th>Read By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="1" />
                <label htmlFor="1"></label>
              </td>
              <td>Andela Fellows</td>
              <td>Hello Guys, Please who is in Abuja now?.... <a href="#">Read</a></td>
              <td><em><a href="detailMessage">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="2" />
                <label htmlFor="2"></label>
              </td>
              <td>Classmates</td>
              <td>Hey! I want us to have a get together <a href="#">Read</a></td>
              <td><em><a href="detailMessage">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" className="filled-in" id="3" />
                <label htmlFor="3"></label>
              </td>
              <td>Football Team</td>
              <td>We shall be having our training on Sunday. Be punctual <a href="#">Read</a></td>
              <td><em><a href="detailMessage">Kene, Obi, Philip and 9 others</a></em></td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

export default SentMessageBoard;
