import React, { Component } from 'react';


class DetailMessageBoard extends Component {

  render(){
    return(
      <div>
      <div className="row">
        <div className="page-title">
          <span className="blue-text text-darken-2">RECEIVED MESSAGE FROM GROUP ANDELA FELLOW</span>
          <span className="pull-right"><em>sent by Philip on 07/07/2017 at 4:50pm</em></span>
        </div>

        <div className="">
              <span className="text-justify">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                of Lorem Ipsum.</p>
              </span>
        </div>

      </div>
      </div>
    );
  }
}

export default DetailMessageBoard;
