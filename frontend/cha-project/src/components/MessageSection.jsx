import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import MessageForm from "../forms/MessageForm";
import Button from "./Button";
import Modal from "./Modal";
import MessageList from "./MessageList";
import toast from "react-hot-toast";
import Loader from "./Loader";

const MessageSection = ({ home = false }) => {
  const [mensagens, setMensagens] = useState([]);
  const [mensagemEditar, setMensagemEditar] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [carregandoMensagens, setCarregandoMensagens] = useState(true);


  async function buscarMensagens() {
    try {
      const response = await api.get("/mensagens");

      setMensagens(response.data);

    } catch (error) {

      toast.error("Erro ao carregar mensagens");
      console.log(error);

    } finally {

      setCarregandoMensagens(false);

    }
  }


  async function criarMensagem(dados) {

    setLoading(true);

    try {

      const response = await api.post("/mensagens", dados);

      localStorage.setItem(
        `mensagem-${response.data.id}`,
        response.data.token
      );

      setModalAberto(false);

      toast.success("Mensagem enviada com sucesso!");

      buscarMensagens();

    } catch(error){

      toast.error("Erro ao enviar mensagem");
      console.error(error);

    } finally {

      setLoading(false);

    }
  }



  async function EditarMensagem(id, mensagem, token) {

    setLoading(true);

    try {

      await api.put(`/mensagens/${id}`,{
        mensagem,
        token
      });


      setModalAberto(false);

      toast.success("Mensagem editada com sucesso!");

      buscarMensagens();


    } catch(error){

      toast.error("Erro ao editar mensagem");
      console.log(error);

    } finally {

      setLoading(false);

    }

  }



  async function DeletarMensagem(id, token) {

    setLoadingId(id);

    try {

      await api.delete(`/mensagens/${id}`,{
        data:{
          token
        }
      });


      toast.success("Mensagem deletada com sucesso!");

      buscarMensagens();


    } catch(error){

      toast.error("Erro ao deletar mensagem");
      console.log(error);


    } finally {

      setLoadingId(null);

    }

  }



  useEffect(()=>{
    buscarMensagens();
  },[]);



  function abrirEdicao(mensagem){

    setMensagemEditar(mensagem);
    setModalAberto(true);

  }


  function abrirModal(){

    setMensagemEditar(null);
    setModalAberto(true);

  }



  return (

    <main className="p-10">

      <motion.h1

        className="
        text-4xl
        text-center
        font-dancing
        mb-10
        "

        initial={{
          opacity:0,
          y:-30
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:0.6
        }}

      >
        Recados
      </motion.h1>



      <div className="
      flex
      flex-col
      justify-center
      items-center
      gap-10
      ">


        <motion.div

        className="
        w-full
        h-42
        bg-gray-300
        text-black
        rounded-3xl
        p-10
        mx-10
        flex
        flex-col
        justify-center
        items-center
        gap-4
        overflow-hidden
        max-sm:h-52
        "

        initial={{
          opacity:0,
          scale:0.9
        }}

        whileInView={{
          opacity:1,
          scale:1
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:0.5
        }}

        >


          <div>

            <h2 className="
            text-3xl
            text-center
            font-dancing
            ">
              Deixe um recado 💌
            </h2>


            <p className="mt-2 text-gray-600">
              Ficaremos muito felizes em ler sua mensagem.
            </p>

          </div>


          <Button onClick={abrirModal}>
            Escrever um recado
          </Button>


        </motion.div>



        {
          carregandoMensagens ? (

            <motion.div

            className="
            flex
            justify-center
            py-10
            "

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            >

              <Loader size="lg"/>

            </motion.div>


          ) : (


            <motion.div

            className="
            mx-auto
            w-full
            "

            initial="hidden"

            whileInView="visible"

            viewport={{
              once:true,
              amount:0.2
            }}

            variants={{
              hidden:{
                opacity:0
              },

              visible:{
                opacity:1,

                transition:{
                  staggerChildren:0.15
                }
              }
            }}

            >


              {
                home ? (

                  <MessageList

                  mensagens={mensagens}

                  onEditar={abrirEdicao}

                  onExcluir={DeletarMensagem}

                  limite={3}

                  loading={loadingId}

                  />


                ) : (


                  <MessageList

                  mensagens={mensagens}

                  onEditar={abrirEdicao}

                  onExcluir={DeletarMensagem}

                  loading={loadingId}

                  />


                )
              }


            </motion.div>


          )
        }


        <Modal

        isOpen={modalAberto}

        onClose={()=>{

          setModalAberto(false);
          setMensagemEditar(null);

        }}

        >


          <MessageForm

          fechar={()=>{

            setModalAberto(false);
            setMensagemEditar(null);

          }}

          onEnviar={criarMensagem}

          onEditar={EditarMensagem}

          mensagemEditar={mensagemEditar}

          loading={loading}

          />


        </Modal>


      </div>


    </main>

  );

};


export default MessageSection;