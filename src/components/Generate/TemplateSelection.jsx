import { React, useState} from 'react'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import { decryptData } from '../../utils/crypto'

const TemplateSelection = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => decryptData(state.user.userId)); 
    const [isLoading, setIsLoading] = useState(false);

    const handlingTemplateSection = (template) => {
        setIsLoading(true);
        navigate(`/dashboard/${template}`);
        setIsLoading(false);
    };
    
  return userId ? (
    <div className='h-screen'>
        { isLoading ? <Loader/> : (
            <>
        <p className='text-[24px] py-5 text-center'>Choose a template of your choice</p>
        <div className='flex justify-evenly p-10 gap-10'>
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={() => handlingTemplateSection(1)}>
                <img src={assets.template1} className='w-[350px] border-2' alt="" />
                <p className='text-[20px] text-center font-bold'>Template 1</p>
            </div>
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={() => handlingTemplateSection(2)}>
              <img src={assets.template2} className='w-[350px] border-2' alt="" />
              <p className='text-[20px] text-center font-bold'>Template 2</p>
            </div>
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={() => handlingTemplateSection(3)}>
              <img src={assets.template3} className='w-[350px] border-2' alt="" />
              <p className='text-[20px] text-center font-bold'>Template 3</p>
            </div>
        </div>
        </>
    )}
    </div>
  ) : (
    <div>
        <h1 className='font-bold text-[40px] text-center'>Login or create an account first mate</h1>
    </div>
  )
}

export default TemplateSelection;