// import
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Display fitered messages
 * @method FilterMessages
 * @param {any} props 
 * @returns {DOM} DOM Components
 */
export default function FilterMessages(props) {
  return (
    <div key={props.groupMessage.id}>
      <Link to={`/group/${props.groupSelectedId}/${props.groupMessage.id}`}>
        <div className="well well-sm white no_spacing">
          <p id={props.groupMessage.id}>
            <span className="left black-text cyan span_spacing lighten-5">
              <i><b>{props.groupMessage.Users.username}</b></i>
            </span>
            <span className="left yellow lighten-5">
              <i>{props.groupMessage.priorityLevel}</i>
            </span>
            <span className="right red-text lighten-5">
              {moment(props.groupMessage.createdAt, moment.ISO_8601).fromNow()}
            </span>
          </p>
          <div>
            <hr />
            <p className="black-text lighten-3" id={props.groupMessage.id}>
              {props.groupMessage.message}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

FilterMessages.propTypes = {
  groupMessage: PropTypes.object.isRequired,
  groupSelectedId: PropTypes.node.isRequired
};
