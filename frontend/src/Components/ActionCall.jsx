import { useNavigate } from "react-router-dom";

export default function ActionCall() {

    const navigate = useNavigate()
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="max-w-5xl py-16 md:pl-20 md:w-full mx-2 md:mx-auto flex items-center justify-between text-left bg-gradient-to-b from-[#4C0083] to-[#180047] rounded-2xl p-10 text-white mt-18">
                <div>
                    <h1
                        className="text-4xl md:text-[46px] md:leading-[60px] font-semibold bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
                        Ready to try-out this app?
                    </h1>
                    <p className="bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text text-lg">
                        Your next favourite tool is just one click away.
                    </p>
                </div>
                <button onClick={()=> navigate('/ai')} className="px-12 py-3 text-slate-800 bg-white rounded-full text-sm mt-4 cursor-pointer">
                    Get Started
                </button>
            </div>
        </>
    );
};
