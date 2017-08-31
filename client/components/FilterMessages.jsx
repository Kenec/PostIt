// import
import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
/**
 * FilterMessages - display the messages in a formatted form
 *
 * @return {DOM}  returns
 */
export default function FilterMessages(props) {
  return(
    <div key={props.groupMessage.id}>
    <Link to={`/group/${props.groupSelectedId}/${props.groupMessage.id}`}>
      <div className='well well-sm white no_spacing'>
          <p id={props.groupMessage.id}>
          <span className='left black-text cyan span_spacing lighten-5'>
            <i><b>{props.groupMessage.Users.username}</b></i>
            </span>
            <span className='left yellow lighten-5'>
              <i>{props.groupMessage.priority_level}</i>
              </span>
              <span className='right red-text lighten-5'>
              {moment(props.groupMessage.createdAt, moment.ISO_8601).fromNow()}
              </span>
            </p>
            <div>
              <hr/>
              <p className='black-text lighten-3' id={props.groupMessage.id}>
                {props.groupMessage.message}
              </p>
            </div>
          </div>
          </Link>
        </div>
      )
}
