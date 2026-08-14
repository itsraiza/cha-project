import { Link } from "react-router-dom"

const CategoryCard = ({ nome, icone: Icon, categoria }) => {
  
  return (
    <>
      <Link to={`/presentes?categoria=${categoria}`}>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-between text-center min-w-[200px] h-[190px] shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex-grow flex items-center justify-center"> 
                <div className="text-gray-900 text-9xl flex items-center justify-center h-full">
                    <Icon 
                    size={55} 
                    strokeWidth={1}
                    />
                </div>      
            </div>
            <div className="mt-4 flex flex-col items-center flex-shrink-0">
                <h3 className="font-semibold text-xl text-gray-950 capitalize">{nome}</h3>
            </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
