import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles.css";

function CommentList() {
  return (
    <li class="media">
      <span class="round pt-2">
        <img
          src="https://img.icons8.com/bubbles/100/000000/groups.png"
          class="align-self-start mr-3"
        />
      </span>
      <div class="media-body">
        <div class="row d-flex">
          <h6 class="user pt-2">Michael Andrews</h6>
          <div class="ml-auto">
            <p class="text">3m</p>
          </div>
        </div>
        <p class="text">Liked four of your artworks</p>
      </div>
    </li>
  );
}

export default CommentList;
