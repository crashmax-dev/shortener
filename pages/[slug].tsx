import Layout from '~/components/Layout'
import { findUrl } from './api/shortener'

export default function Slug() {
  return (
    <Layout>
      <div className="text-gray-500 font-light text-3xl mb-2 text-center">
        Please wait...
      </div>
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