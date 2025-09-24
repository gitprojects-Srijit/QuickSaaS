import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import WriteArticle from './Pages/WriteArticle'
import BlogTitles from './Pages/BlogTitles'
import GenerateImages from './Pages/GenerateImages'
import RemoveBackground from './Pages/RemoveBackground'
import RemoveObject from './Pages/RemoveObject'
import ReviewResume from './Pages/ReviewResume'
import Community from './Pages/Community'
// import { useAuth } from '@clerk/clerk-react'
// import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'

const App = () => {

  // const {getToken} = useAuth()

  // useEffect(()=>{
  //   getToken().then((token)=> console.log(token));
  // },[])



  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path='write-article' element={<WriteArticle/>}/>
          <Route path='blog-titles' element={<BlogTitles/>}></Route>
          <Route path='generate-images' element={<GenerateImages/>}></Route>
          <Route path='remove-background' element={<RemoveBackground/>}></Route>
          <Route path='remove-object' element={<RemoveObject/>}></Route>
          <Route path='review-resume' element={<ReviewResume/>}></Route>
          <Route path='community' element={<Community/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
