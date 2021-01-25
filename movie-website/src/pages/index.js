import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, MoviePreview} from "../pageStyles/pageStyles"
import SEO from "../components/Seo"
import {COLORS} from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homepageheadertitle,
          homepageheaderdescription,
          homepageheaderpicture,
          homepagefeaturedmovies
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home", idType: URI) {
          homeMeta {
            homepageheadertitle
            homepageheaderdescription
            homepageheaderpicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            homepagefeaturedmovies {
              ... on WPGraphql_Movie {
                slug
                Movie {
                  title
                  producer
                  picture{
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 50) {
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  return(
    <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image fluid={homepageheaderpicture.imageFile.childImageSharp.fluid} alt={homepageheaderpicture.altText}/>
        <div className="inner-div">
         <p className="header-title">{homepageheadertitle}</p>
         <p className="header-description">{homepageheaderdescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
       <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      <div className="movies">
        <h2>Featured movies</h2>
        <div className="movie-items">
          {homepagefeaturedmovies.map(({Movie, slug}) => (
            <MoviePreview to={`/${slug}`} key={slug}>
              <Image fluid={Movie.picture.imageFile.childImageSharp.fluid} altText={Movie.picture.altText}/>
              <div className="movie-info">
                <p>
                  {Movie.title}
                </p>
                <p>{Movie.producer}</p>
              </div>
            </MoviePreview>
          ))}
        </div>
      </div>
    </Wrapper>
   </Layout>
 )
}
export default IndexPage
