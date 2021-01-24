import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const MovieTemplate = ({
  data: {
    wpcontent: {
      movie: {
        Movie
      },
    },
  },
}) => {

  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="movie-container">
          <div className="movie-image">
            <Image
              fluid={Movie.picture.imageFile.childImageSharp.fluid}
            />
          </div>
          <div className="movie-info">
              <h3>
                <span>{Movie.title} -</span> <span>{Movie.genre}</span>
              </h3>
            <p className="description">{Movie.description}</p>
            <p className="info">
              <strong>duration:</strong> {Movie.duration}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MovieTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        Movie {
          title
          producer
          duration
          genre
          picture {
            sourceUrl
            altText
            imageFile {
              childImageSharp {
                fluid(quality: 50) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        id
      }
    }
  }
`