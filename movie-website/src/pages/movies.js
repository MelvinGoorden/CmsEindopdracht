import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  MoviePreview
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const MoviesPage = () => {
  const {
    wpcontent: {
      page: {
        movieMeta: { moviepageheaderdescription, moviepageheaderpicture },
      },
      movies: { edges: movies },
    },
  } = useStaticQuery(graphql`
  query MyQuery {
    wpcontent {
      page(id: "movies", idType: URI) {
        movieMeta {
          moviepageheaderdescription
          moviepageheaderpicture {
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
      movies {
        edges {
          node {
            Movie {
              title
              producer
              picture {
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
            slug
          }
        }
      }
    }
  }
  `)
  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper moviesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={moviepageheaderpicture.imageFile.childImageSharp.fluid}
            alt={moviepageheaderpicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are World Movies</h2>
          <p>{moviepageheaderdescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="movies">
          <h2>Our Movies</h2>
          <div className="movie-items">
            {movies.map(({ node: { Movie, slug } }) => (
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

export default MoviesPage