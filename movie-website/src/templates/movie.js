import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const MovieTemplate = ({
  data: {
    wpcontent: {
      movie: {
        Movie,
        roles: { edges: roles }
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
            <div className="roles">
              {roles.map(({ node: role }) => (
                <div key={role.name} className="role">
                  {role.name}
                </div>
              ))}
            </div>
          </div>
          <div className="movie-info">
              <h3>
                <span>{Movie.title}</span>
              </h3>
            <p className="description"><strong>duration:</strong> {Movie.description}</p>
            <p className="info">
              <strong>duration:</strong> {Movie.duration}
            </p>
            <p className="info">
              <strong>producer:</strong> {Movie.producer}
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
        roles {
          edges {
            node {
              name
            }
          }
        }
        Movie {
          title
          producer
          duration
          description
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