import React from "react";
import Link from "next/link";
import NextImage from "./image";

const Card = ({ article }) => {
    return (
        <Link href={`/article/${article.attributes.slug}`}>
            <a className="uk-link-reset">
                <div className="uk-card uk-card-default uk-card-hover">
                    <div className="uk-card-media-top">
                        <NextImage image={article.attributes.image} />
                    </div>
                    <div className="uk-card-body">
                        <p id="category" className="uk-text-uppercase">
                            {article.attributes.category.data.attributes.name}
                        </p>
                        <h2 id="title" className="uk-text-large">
                            {article.attributes.title}
                        </h2>
                        <p>{article.attributes.description}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Card;