import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Articles from "../../components/articles";
import Footer from "../../components/footer";

import { fetchAPI } from "../../lib/api";

const Category = ({ category, categories }) => {
    const seo = {
        mataTitle: category.attributes.name,
        metaDescription: `All ${category.attributes.name} articles`,
    }

    return (
        <Layout categories={categories.data}>
            <Seo seo={seo} />
            <div className="uk-section uk-margin-remove-top uk-padding-remove-top uk-width-3-4 uk-margin-auto">
                <div className="uk-container uk-container-xsmall">
                    <h1>{category.attributes.name}</h1>
                    <p className="uk-margin-large-bottom">{category.attributes.description}</p>
                    <Articles articles={category.attributes.articles.data} />
                </div>
            </div>
            <hr/>
            <Footer />
        </Layout>
    )
};

export async function getStaticPaths() {
    const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });
    
    return {
        paths: categoriesRes.data.map((category) => ({
            params: {
                slug: category.attributes.slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const matchingCategories = await fetchAPI("/categories", {
        filters: { slug: params.slug },
        populate: {
            articles: {
                populate: "*",
            }
        }
    });

    const allCategories = await fetchAPI("/categories");

    return {
        props: {
            category: matchingCategories.data[0],
            categories: allCategories,
        },
        revalidate: 1,
    }
}

export default Category;