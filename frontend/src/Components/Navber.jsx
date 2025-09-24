import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowBigRight } from 'lucide-react'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navber = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
        <div className='flex justify-start items-center gap-1'>
          <img src={assets.logo401} alt='' className='w-10 sm:w-10 cursor-pointer' onClick={()=>navigate('/')}></img>
          <span className='w-32 sm:w-44 cursor-pointer text-primary text-3xl font-semibold'>Saas.ai</span>
        </div>
        {
          user ? <UserButton/> : 
          (
            <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get started <ArrowBigRight className='w-4 h-4'/></button>
          )
        }
    </div>
  )
}

export default Navber
