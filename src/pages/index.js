import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import LoginForm from "../components/login-form"
import Video from "../components/video"

const IndexPage = () => {
const [token, setToken] = useState(false);
return(
  <Layout>
    <SEO title="Home" />
    {!token ? <LoginForm storeToken = {setToken} /> : <Video token = {token} />}
  </Layout>
)
}

export default IndexPage
