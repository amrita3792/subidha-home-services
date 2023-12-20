import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {links.map((link, idx) => (
          <li key={idx}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
