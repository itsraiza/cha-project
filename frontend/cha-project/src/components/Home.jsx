import we from "../assets/we.jpg";
import CountDown from "./CountDown";
import ProgressBar from "./ProgressBar";
import CategoriesSection from "./CategoriesSection";
import Button from "./Button";
import MessageSection from "./MessageSection";
import HowItWorks from "./HowItWorks";
import Modal from "./Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Home = () => {

  const [modalComoFunciona, setModalComoFunciona] = useState(false);


  return (
    <>
      <div className="
        flex 
        justify-evenly 
        items-center 
        max-w-7xl 
        mx-auto 
        px-5 
        py-5 
        max-md:justify-center
      ">


        
        <motion.div

          className="
            w-[430px] 
            p-5 
            max-md:w-full 
            max-md:h-[400px] 
            max-sm:h-[350px] 
            max-md:flex 
            max-md:flex-col 
            max-md:justify-center 
            max-md:items-center 
            max-md:text-center 
            max-md:bg-white 
            max-md:rounded-2xl
          "

          initial={{
            opacity: 0,
            x: -60
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.8
          }}

        >

          <h1 className="text-5xl font-dancing">
            nosso
          </h1>


          <h2 className="
            text-9xl 
            font-poppins 
            leading-none 
            max-md:text-7xl
          ">
            Lar

            <span className="
              ml-5 
              text-4xl 
              font-extralight 
              max-sm:text-3xl
            ">
              ♡
            </span>

          </h2>


          <p className="font-normal">
            cada detalhe importa.
          </p>

          <p className="font-normal">
            cada gesto constroi nosso sonho.
          </p>


          <div className="
            flex 
            gap-2 
            mt-5 
            max-lg:flex-col 
            max-md:w-full
          ">


            <div>

              <Link to={"/presentes"}>

                <Button>
                  Ver lista de presentes
                </Button>

              </Link>

            </div>


            <div>

              <Button
                variant="secondary"
                onClick={() => setModalComoFunciona(true)}
              >
                Como funciona?
              </Button>

            </div>


          </div>


        </motion.div>


        <motion.div

          className="
            h-[450px] 
            w-[610px] 
            rounded-[40px] 
            overflow-hidden 
            shadow-xl 
            max-md:hidden
          "

          initial={{
            opacity: 0,
            x: 60
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 0.8,
            delay: 0.2
          }}

        >

          <img
            src={we}
            alt="foto"
            className="
              h-full 
              w-full 
              object-cover
            "
          />

        </motion.div>


      </div>


      <motion.div

        className="
          w-[90%] 
          h-25 
          flex 
          justify-around 
          items-center 
          gap-2 
          shadow 
          rounded-2xl 
          m-auto 
          mt-2 
          py-16 
          bg-white 
          max-lg:flex-col 
          max-lg:h-80 
          max-lg:justify-center 
          overflow-hidden
        "

        initial={{
          opacity: 0,
          y: 50
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        viewport={{
          once: true,
          amount: 0.3
        }}

        transition={{
          duration: 0.7
        }}

      >

        <ProgressBar />

        <CountDown />

      </motion.div>


      <motion.div

        initial={{
          opacity: 0,
          y: 50
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        viewport={{
          once:true,
          amount:0.2
        }}

        transition={{
          duration:0.6
        }}

      >

        <CategoriesSection />

      </motion.div>


      <motion.div

        initial={{
          opacity:0,
          y:50
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true,
          amount:0.2
        }}

        transition={{
          duration:0.6
        }}

      >

        <MessageSection
          home={true}
        />

      </motion.div>


      <Modal

        isOpen={modalComoFunciona}

        onClose={() => setModalComoFunciona(false)}

      >

        <HowItWorks

          fechar={() => setModalComoFunciona(false)}

        />

      </Modal>


    </>
  );
};


export default Home;