import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Card ({ title, description, link, className = "" }) {
  const isExternal = link && (link.startsWith("http") || link.startsWith("www"));

  const content = (
    <div className={`card h-full flex flex-col justify-between transition-transform duration-300 hover:scale-[1.10] ${className}`}>
      <div>
        <h3 className="text-2xl font-bold mb-2 text-primary-400">{title}</h3>
        <p className="text-secondary-400">{description}</p>
      </div>
      <span className="mt-4 text-primary-500 font-semibold inline-block hover:text-primary-300">
        {isExternal ? "Ver en GitHub →" : "Ver Documentación →"}
      </span>
    </div>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link to={link} className="block h-full">
      {content}
    </Link>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Card;