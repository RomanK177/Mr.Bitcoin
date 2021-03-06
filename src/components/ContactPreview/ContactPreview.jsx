import React from "react";
import { Link } from "react-router-dom";
import "./ContactPreview.scss";

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`}>
      <li className="contact-preview flex space-between">
        <img src={"https://robohash.org/" + contact._id} alt="" />
        <div className="flex column">
          <p>{contact.name}</p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </div>
      </li>
    </Link>
  );
}
