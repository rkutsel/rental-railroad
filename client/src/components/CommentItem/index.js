import React from "react";

// Styles
import "./styles.css";

function CommentItem() {
  return (
    <li className="media">
      <span className="round pt-2">
        <img
          src="https://img.icons8.com/bubbles/100/000000/groups.png"
          className="align-self-start mr-3"
        />
      </span>
      <div className="media-body">
        <div className="row d-flex">
          <h6 className="user pt-2">{this.props.author}</h6>
          <div className="ml-auto">
            <p className="text">{this.props.createdAt}</p>
          </div>
        </div>
        <p className="text">{this.props.comment}</p>
      </div>
    </li>
  );
}

export default CommentItem;
