import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// Post content depends on external data (ex. local file md in this case)
// NEED to fetch `postData` before this page can be pre-rendered.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // params contains called the post `id`.
  // ex. `/post/1` => then `params.id` is `1`
  // Fetch necessary data for the blog post using `params.id`
  const postData = await getPostData(params.id)

  // By returning { props: { postData } }, the Post component will receive `postData` as a prop at build time
  return {
    props: {
      postData
    }
  }
}
