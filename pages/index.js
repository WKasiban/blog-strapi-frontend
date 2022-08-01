import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

import { getStrapiMedia } from "../lib/media";

import Footer from "../components/footer";

const Home = ({ articles, categories, homepage }) => {
  const homeImage = getStrapiMedia(homepage.attributes.seo.shareImage)

  return (
    <Layout categories={categories}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-section uk-margin-remove-top uk-padding-remove-top uk-width-3-4 uk-margin-auto">
        <div className="uk-cover-container">
          <div
            id="home-banner" 
            className="uk-height-medium uk-flex-center uk-flex-middle uk-gackground-cover uk-background-center-center uk-light uk-padding"
            data-src={homeImage}
            data-srcset={homeImage}
            data-uk-img 
          >
            <h1 uk-h4 className="uk-text-center uk-text-middle uk-margin-xlarge-top">{homepage.attributes.hero.title}</h1>
          </div>
          <hr className="uk-margin-large-top"/>
          <h2 className="uk-text-center uk-margin-large-bottom">Alles Artikelen</h2>
          <Articles articles={articles} />
        </div>
      </div>
      <hr />
      <Footer />
    </Layout>
  )
}

export async function getStaticProps() {
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: ["image", "category"] }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
}

export default Home;

/* <NextImage image={homepage.attributes.seo.shareImage} />*/

