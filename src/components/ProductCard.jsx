// src/components/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price.jsx";
import Availability from "./Availability.jsx";
import AddToCartPlaceholder from "./AddToCartPlaceholder.jsx";
import { publicUrl } from "../config/site.js";

export default function ProductCard({ product }) {
  return (
    <article className="card card--product">
      <div className="card__media">
        <img src={publicUrl(product.image)} alt={`${product.title} (placeholder image)`} loading="lazy" />
      </div>
      <div className="card__body">
        <span className="card__eyebrow">
          {product.category}
          {product.language ? ` · ${product.language}` : ""}
          {product.format ? <span className="card__format"> · {product.format}</span> : null}
        </span>
        <h3 className="card__title">{product.title}</h3>
        <p className="card__desc">{product.description}</p>
        <div className="card__footer card__footer--stack">
          <div className="card__links">
            <Price price={product.price} />
            <Availability available={product.available} />
          </div>
          <div className="card__actions">
            {product.detailTo ? (
              <Link to={product.detailTo} className="btn btn--secondary btn--sm">
                View Details
              </Link>
            ) : null}
            <AddToCartPlaceholder size="sm" />
          </div>
        </div>
      </div>
    </article>
  );
}
