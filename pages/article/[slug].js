import Moment from "react-moment";
import ReactMarkdown from "react-markdown"

import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Footer from "../../components/footer";
import NextImage from "../../components/image";

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
    const imageUrl = getStrapiMedia(article.attributes.image)

    const seo = {
        metaTitle: article.attributes.title,
        mataDescription: article.attributes.description,
        shareImage: article.attributes.image,
        article: true,
    }

    return (
        <Layout categories={categories.data}>
            <Seo seo={seo} />
            <div className="uk-section uk-margin-remove-top uk-padding-remove-top uk-width-3-4 uk-margin-auto">
                <h2>{article.attributes.title}</h2>
                <NextImage image={article.attributes.image} />
                <div className="uk-section">
                    <div className="uk-container uk-container-small">
                        <ReactMarkdown children={article.attributes.content} />
                        <hr className="uk-divider-small" />
                        <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                            <div>
                                {article.attributes.author.data.attributes.picture && (
                                    <img 
                                        src={getStrapiMedia(
                                            article.attributes.author.data.attributes.picture
                                        )}
                                        alt={
                                            article.attributes.author.data.attributes.picture.data.attributes.alternativeText
                                        }
                                        style={{
                                            position: "static",
                                            borderRadius: "20%",
                                            height: 60,
                                        }}
                                    />
                                )}
                            </div>
                            <div className="uk-width-expand">
                                <p className="uk-margin-remove-bottom">
                                    By {article.attributes.author.data.attributes.name}
                                </p>
                                <p className="uk-text-meta uk-margin-remove-top">
                                    <Moment format="MMM Do YYYY">
                                        {article.attributes.published_at}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <Footer />
        </Layout>
    )
}

export async function getStaticPaths() {
    const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

    return {
        paths: articlesRes.data.map((article) => ({
            params: {
                slug: article.attributes.slug,
            },
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const articlesRes = await fetchAPI("/articles", {
        filters: {
            slug: params.slug,
        },
        populate: ["image", "category", "author.picture"],
    })
    const categoriesRes = await fetchAPI("/categories")

    return {
        props: { article: articlesRes.data[0], categories: categoriesRes },
        revalidate: 1,
    }
}

export default Article;