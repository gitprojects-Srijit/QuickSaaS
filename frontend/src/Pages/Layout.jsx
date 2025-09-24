import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../Components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border border-b border-gray-200'>   
        <div onClick={()=> navigate('/')} className='flex justify-start items-center gap-1'>
          <img src={assets.logo401} alt="logo" className='cursor-pointer w-10 sm:w-10' />
          <span className='w-32 sm:w-44 cursor-pointer text-primary text-3xl font-semibold'>Saas.ai</span>
        </div>
        {
          sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-gray-700 sm:hidden'/> 
          : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-gray-700 sm:hidden'/>
        }
      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet/>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout
