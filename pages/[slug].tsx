import Layout from '~/components/Layout'
import { findUrl } from './api/shortener'

export default function Slug() {
  return (
    <Layout>
      <h1>Please wait...</h1>
    </Layout>
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

  return {
    props: {
      data
    },
    redirect: {
      destination: !data ? '/' : data.url
    }
  }
}