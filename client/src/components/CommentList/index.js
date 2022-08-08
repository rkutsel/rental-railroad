import React from "react";
import CommentItem from "../CommentItem";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { Link } from "react-router-dom";

// Styles
import "./styles.css";

function CommentList() {
  return (
    <div className="commentList">
      <div class="container">
        <div class="row">
          <h3>Comments</h3>
        </div>
      </div>
      <div class="container mt-1">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <ul class="list-unstyled">
                <CommentItem />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
