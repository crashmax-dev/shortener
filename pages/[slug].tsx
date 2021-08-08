import { findUrl } from './api/shortener'

export default function Slug() {
  return (
    <div className="main-container">
      <h1>Please wait...</h1>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const data = await findUrl(params.slug)
  const destination = data ? data.url : '/'

  return {
    props: {
      data
    },
    redirect: {
      destination
    }
  }
}