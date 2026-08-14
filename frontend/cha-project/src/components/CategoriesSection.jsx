import {
  CookingPot,
  Microwave,
  Sofa,
  BedDouble,
  ShowerHead,
  WashingMachine,
  DollarSign
} from "lucide-react";

import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";


const CategoriesSection = () => {


  const categorias = [
    {
      nome: "Cozinha",
      categoria: "Cozinha",
      icone: CookingPot,
    },
    {
      nome: "Eletrodomésticos",
      categoria: "Eletrodomésticos",
      icone: Microwave,
    },
    {
      nome: "Sala",
      categoria: "Sala",
      icone: Sofa,
    },
    {
      nome: "Quarto",
      categoria: "Quarto",
      icone: BedDouble,
    },
    {
      nome: "Banheiro",
      categoria: "Banheiro",
      icone: ShowerHead,
    },
    {
      nome: "Lavanderia",
      categoria: "Lavanderia",
      icone: WashingMachine,
    },
    {
      nome: "Cotas",
      categoria: "Cotas",
      icone: DollarSign,
    },
  ];



  return (

    <section className="
      w-full 
      px-12 
      py-16
    ">


      <div className="
        max-w-7xl 
        mx-auto
      ">



        {/* TÍTULO */}
        <motion.div

          initial={{
            opacity:0,
            y:-30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true,
            amount:0.3
          }}

          transition={{
            duration:0.6
          }}

        >

          <h2 className="
            text-3xl 
            font-light 
            text-center 
            text-gray-900 
            mb-10
          ">
            escolha um cômodo
          </h2>


          <p className="
            text-center 
            text-gray-600 
            mb-12 
            max-w-2xl 
            mx-auto
          ">
            Clique no cômodo e veja os presentes que ainda faltam
          </p>

        </motion.div>





        {/* GRID DOS CARDS */}
        <motion.div

          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3 
            lg:px-20 
            gap-6 
            cursor-pointer
          "


          initial="hidden"

          whileInView="visible"

          viewport={{
            once:true,
            amount:0.2
          }}


          variants={{

            hidden:{},

            visible:{
              transition:{
                staggerChildren:0.12
              }
            }

          }}

        >


          {
            categorias.map((categoria)=>(


              <motion.div

                key={categoria.nome}


                variants={{

                  hidden:{
                    opacity:0,
                    y:40,
                    scale:0.95
                  },


                  visible:{
                    opacity:1,
                    y:0,
                    scale:1,

                    transition:{
                      duration:0.5
                    }
                  }

                }}

              >

                <CategoryCard

                  nome={categoria.nome}

                  categoria={categoria.categoria}

                  icone={categoria.icone}

                />


              </motion.div>


            ))
          }


        </motion.div>


      </div>


    </section>

  );

};


export default CategoriesSection;