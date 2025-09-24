import { useEffect, useState } from "react"
import { dummyCreationData } from "../assets/assets"
import { Gem, Sparkles } from "lucide-react"
import { Protect, useAuth } from "@clerk/clerk-react"
import CreationItems from "../Components/CreationItems"
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const {getToken} = useAuth()

  useEffect(() => {
  const getDashboardData = async () => {
    setLoading(true);
    try {
      const token = await getToken(); // get token first
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // always at the end
    }
  };

  getDashboardData();
}, []);


  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Card creation  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-700">
            <p className="text-sm">Total Creation</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white"/>
          </div>
        </div>

        {/* Active plan card  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-700">
            <p className="text-sm">Active plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan='premium' fallback='Free'>Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white"/>
          </div>
        </div>
      </div>

      {
        loading ? (
          <div className='flex justify-center items-center h-3/4'>
            <div className='w-11 h-11 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="mt-6 mb-4">Recent Creation</p>
            {
              creations.map((item)=> <CreationItems key={item.id} item={item}/>)
            }
          </div>
        )
      }

      
    </div>
  )
}

export default Dashboard
