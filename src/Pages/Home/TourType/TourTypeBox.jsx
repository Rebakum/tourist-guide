import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const TourtypeBox = ({ label, icon: Icon }) => {
    const navigate = useNavigate();

    const handleClick = (tourType) => {
        const url = queryString.stringifyUrl({
            url: '/touristList',
            query: { tourType },
        });
        navigate(url);
    };

    return (
        <div
            onClick={() => handleClick(label)}
            className={`flex 
        flex-col 
        transparent
        items-center 
        justify-center 
        gap-2
        p-10
        rounded-full
        size-52
        mx-3
        text-white
         border-2
        hover:text-orange-500
        transition
        cursor-pointer
      
      `}
        >
            <Icon size={40} />
            <div className='text-lg font-medium '>{label}</div>
        </div>
    );
};

export default TourtypeBox;
