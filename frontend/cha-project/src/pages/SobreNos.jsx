import sobrenos from "../assets/sobrenos.png";
import Layout from "./Layout";
import { motion } from "framer-motion";


const SobreNos = () => {


  return (

    <Layout>


      <div className="
        flex 
        justify-evenly 
        items-center 
        max-w-7xl 
        mx-auto 
        px-5 
        py-5 
        
        max-lg:flex-col
        gap-10
      ">



        {/* TEXTO */}

        <motion.div


          className="
            relative 
            flex 
            flex-col 
            bg-gray-50 
            w-96 
            max-h-[650px] 
            p-10 
            rounded-2xl 
            shadow-2xl 
            overflow-hidden
            
            max-lg:w-full 
            max-md:mx-2
          "


          initial={{
            opacity:0,
            x:-60
          }}


          whileInView={{
            opacity:1,
            x:0
          }}


          viewport={{
            once:true,
            amount:0.3
          }}


          transition={{
            duration:0.8,
            ease:"easeOut"
          }}


        >


          <h2 className="
            font-montserrat 
            mb-2
          ">

            SOBRE NÓS

          </h2>



          <p className="
            font-light 
            text-justify
          ">

            Nossa história começou em 2021, quando nos conhecemos pela internet através de uma amiga em comum. O que começou como uma amizade, entre conversas, conselhos e muitas brincadeiras, acabou se transformando em amor. Em março de 2022, começamos a nos olhar com outros olhos e, em maio, oficializamos nosso namoro. Em dezembro daquele ano, nos encontramos pessoalmente pela primeira vez e, desde então, nunca mais nos desgrudamos. Já vivemos mudanças, distâncias e muitos momentos juntas, e hoje, depois de 4 anos, seguimos escolhendo uma à outra todos os dias. ❤️

          </p>


        </motion.div>





        {/* IMAGEM */}

        <motion.div


          className="
            w-full 
            max-w-[610px] 
            h-[450px] 
            overflow-hidden
            rounded-3xl
            shadow-xl
          "


          initial={{
            opacity:0,
            x:60,
            scale:0.95
          }}


          whileInView={{
            opacity:1,
            x:0,
            scale:1
          }}


          viewport={{
            once:true,
            amount:0.3
          }}


          transition={{
            duration:0.8,
            ease:"easeOut"
          }}


        >


          <img
            className="
              h-full 
              w-full 
              object-cover
            "
            src={sobrenos}
            alt="Nossa história"
          />


        </motion.div>



      </div>






      {/* FRASE FINAL */}

      <motion.div

        className="
          flex 
          items-center 
          gap-4 
          mt-10
        "


        initial={{
          opacity:0,
          y:30
        }}


        whileInView={{
          opacity:1,
          y:0
        }}


        viewport={{
          once:true
        }}


        transition={{
          duration:0.7,
          delay:0.2
        }}

      >


        <div className="
          h-1 
          flex-1 
          rounded-full 
          bg-gradient-to-r 
          from-red-400 
          via-yellow-300 
          to-purple-500
        "></div>



        <p className="
          text-center 
          font-extralight
        ">

          Lar é onde a gente é feliz

        </p>



        <div className="
          h-1 
          flex-1 
          rounded-full 
          bg-gradient-to-r 
          from-purple-500 
          via-blue-400 
          to-red-400
        "></div>



      </motion.div>



    </Layout>

  );

};


export default SobreNos;