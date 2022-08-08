import React from "react";
import CommentItem from "../CommentItem";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";

// Styles
import "./styles.css";

function CommentList() {
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT);

  const comments = data?.product.comments || [];

  console.log(data);

  return (
    <>
      <div className="commentList">
        <div className="container">
          <div className="row">
            <h3>Comments</h3>
          </div>
        </div>
        {comments.length ? (
          <div className="container mt-1">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <ul className="list-unstyled">
                    <CommentItem
                      author={comments.author}
                      comment={comments.comment}
                      createdAt={comments.createdAt}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mt-1">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <h5>No comments yet!</h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentList;
