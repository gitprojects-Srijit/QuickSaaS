import { Image, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { FaDownload } from "react-icons/fa";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

    const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style', '4K Style', 'B&W style']
    
    const [imageCategories, setImageCategories] = useState("Realistic")
    const [input, setInput] = useState('')
    const [publish, setPublish] = useState(false)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    
    const {getToken} = useAuth()

    const onSubmitHandel = async (e)=>{
      e.preventDefault();
      try {
        setLoading(true)

        const prompt = `Generate an image of ${input} in the style ${imageCategories}`
        
        const {data} = await axios.post('/api/ai/generate-image',{prompt, publish}, {
          headers: {Authorization: `Bearer ${await getToken()}`}
        })

        if(data.success){
          setContent({ content: data.content, download: data.download })
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

      {/* left column  */}
      <form onSubmit={onSubmitHandel} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea onChange={(e)=> setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to see in your image.......' required/>

        <p className='mt-4 text-sm font-medium'>Styles</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageStyle.map((item)=>(
            <span onClick={()=> setImageCategories(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${imageCategories === item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`} 
            key={item}>{item}</span>
          ) )}
        </div>

        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e)=> setPublish(e.target.checked)} checked={publish} className='sr-only peer'/>
            <div className='w-9 h-5 bg-slate-400 rounded-full peer-checked:bg-green-500 transition'></div>

            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm'>Make This Image Public</p>
        </div>

        <button disabled={loading} className='flex items-center justify-center w-full gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> 
            : <Image className='w-5'/>
          }
          Generate Image
        </button>
      </form>

      {/* right column  */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-123'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#00AD25]'/>
          <h1 className='text-xl font-semibold'>Generated Image</h1>
        </div>

        {!content ? (
          <div className='flex items-center flex-1 justify-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Image className='w-9 h-9'/>
              <p>Enter a topic and click on "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          // <div className='mt-3 h-full'>
          //   <img src={content} alt="image" className='w-full h-full'/>
          // </div>

          <div className='mt-3 h-full flex flex-col gap-2 relative group'>
            {/* Image container */}
            <div className='relative w-full h-full rounded overflow-hidden'>
              
              {/* Generated image */}
              <img 
                src={content.content} 
                alt="image" 
                className='w-full h-full object-cover rounded'
              />

              {/* Download icon, visible only on hover */}
              <a
                href={content.download ? content.download : content.content}
                download="ai-image.png"
                className='absolute top-2 right-2 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black'
              >
                <FaDownload />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default GenerateImages
