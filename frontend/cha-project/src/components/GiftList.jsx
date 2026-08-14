import GiftCard from "./GiftCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { GiftImage } from "../utils/GiftImage";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import ReservationForm from "../forms/ReservationForm";
import Modal from "./Modal";
import CotaForm from "../forms/CotaForm";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { motion } from "framer-motion";

const GiftList = () => {
  const [presentes, setPresentes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaURL = searchParams.get("categoria");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
  categoriaURL || "");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [presenteSelecionado, setPresenteSelecionado] = useState(null);
  const [modalCotaAberto, setModalCotaAberto] = useState(false);

  const [loadingId, setLoadingId] = useState(null);
  const [carregandoPresentes, setCarregandoPresentes] = useState(true);

  function mudarCategoria(categoria){

  setCategoriaSelecionada(categoria);

  setPaginaAtual(1);


  if(categoria){

    setSearchParams({
      categoria
    });

  }else{

    setSearchParams({});

  }

}


  async function buscarCategorias() {
    try {
      const response = await api.get("/categorias");

      setCategorias(response.data);

    } catch (error) {
      toast.error("Erro ao carregar categorias");
      console.log(error);
    }
  }

  async function buscarPresentes() {
    setCarregandoPresentes(true);
    try {
      const response = await api.get("/presentes", {
        params: {
          categoria: categoriaSelecionada || undefined,
          page: paginaAtual,
        },
      });

      setPresentes(response.data.presentes);
      setTotalPaginas(response.data.totalPaginas);
    } catch (error) {
      toast.error("Erro ao carregar presentes");
      console.log(error);
    } finally {
      setCarregandoPresentes(false);
    }
  }

  async function reservarPresente(nomePessoa) {

    setLoadingId(presenteSelecionado.id);

    try {
      const response = await api.post("/reservas", {
        presenteId: presenteSelecionado.id,
        nomePessoa,
      });

      localStorage.setItem(
        `reserva-${presenteSelecionado.id}`,
        response.data.token,
      );

      setModalAberto(false);
      toast.success("Presente reservado!");
    

      buscarPresentes();
    } catch (error) {
      toast.error("Erro ao reservar presente");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  async function cancelarReserva(presenteId, token) {

    setLoadingId(presenteId);

    try {
      await api.delete(`/reservas/${presenteId}`, {
        data: {
          token,
        },
      });

        toast.success("Reserva cancelada com sucesso!");

      buscarPresentes();
    } catch (error) {
      toast.error("Erro ao cancelar reserva");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  async function contribuir(nomePessoa) {
    setLoadingId(presenteSelecionado.id);
    try {
      const response = await api.post("/cotas", {
        nomePessoa,
        presenteId: presenteSelecionado.id,
      });

      localStorage.setItem(
        `cota-${presenteSelecionado.id}`,
        response.data.token,
      );

      setModalCotaAberto(false);

      setPresenteSelecionado(null);

      toast.success("Contribuição realizada com sucesso!");

      buscarPresentes();

    } catch (error) {
      toast.error("Erro ao fazer contribuição");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  async function cancelarCota(id, token, presenteId) {

    setLoadingId(presenteId);

    try {
      await api.delete(`/cotas/${id}`, {
        data: {
          token,
        },
      });

      localStorage.removeItem(`cota-${presenteId}`);

      toast.success("Contribuição cancelada com sucesso!");

      buscarPresentes();
    } catch (error) {
      toast.error("Erro ao cancelar contribuição");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  }

  function abrirModal(presente) {
    setPresenteSelecionado(presente);

    setModalAberto(true);
  }

  function abrirModalCota(presente) {
    setPresenteSelecionado(presente);

    setModalCotaAberto(true);
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  useEffect(() => {
    buscarPresentes();
  }, [categoriaSelecionada, paginaAtual]);

  return (
    <main>
      <motion.div
      className="flex flex-col m-10 gap-4"

      initial={{
        opacity: 0,
        y: -30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.6
      }}
      >
        <h1 className="text-center text-4xl font-dancing">
          Lista de Presentes
        </h1>
        <p className="text-center text-gray-800 font-extralight">
          Escolha um item para nos presentear. Ao reservar, ele ficará marcado
          como escolhido
        </p>
      </motion.div>

      <CategoryFilter
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={mudarCategoria}
      />

      <motion.div className="
      flex 
      justify-start 
      items-center 
      p-10 
      mx-35 
      my-10 
      gap-6 
      bg-gray-900 
      text-white 
      rounded-2xl 
      max-lg:flex-col 
      max-lg:mx-6
      "

      initial={{
        opacity:0,
        scale:0.95
      }}

      whileInView={{
        opacity:1,
        scale:1
      }}

      viewport={{
        once:true,
        amount:0.3
      }}

      transition={{
        duration:0.5
      }}

      >
        <div className="w-full flex justify-between items-center gap-4 max-md:flex-col max-md:justify-center">
        <div className="max-md:text-center">
          <h3 className="text-2xl font-montserrat">
            Cotas para os eletrodomésticos
          </h3>
          <p className="font-extralight max-w-[530px]">
            Alguns eletrodomésticos possuem valores mais altos, então criamos a
            opção de contribuir com cotas. Você pode verificar os itens disponiveis para cota na seção COTAS.
            Cada ajuda nos aproxima do nosso novo lar 💛{" "}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          <h3 className="font-montserrat">
            Valor minimo e maximo de cada cota:
          </h3>
          <div className="flex gap-2">
            <p className="p-2 rounded-2xl bg-gray-600/20 text-center">$35,50</p>
            <p className="p-2 rounded-2xl bg-gray-600/20">$40,00</p>
          </div>
        </div>
        </div>
      </motion.div>
      {
        carregandoPresentes ? (
           <div className="flex justify-center py-20">
          <Loader size="lg" />
          </div>
        ) : (
          <>
          
          <div className="w-full">
            <motion.div className="
            grid
            max-w-6xl
            mx-auto
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            max-sm:max-w-[350px]
            max-md:max-w-[650px]
            "

            initial="hidden"

            animate="visible"

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
              {presentes.map((presente) => (
                <motion.div

                key={presente.id}

                variants={{
                  hidden:{
                    opacity:0,
                    y:40
                  },

                  visible:{
                    opacity:1,
                    y:0
                  }
                }}

                transition={{
                  duration:0.5
                }}

                  >

                
                <GiftCard
                  nome={presente.nome}
                  imagem={GiftImage[presente.imagem]}
                  reservado={presente.reservado}
                  reservadoPor={presente.reservadoPor}
                  tokenReserva={presente.tokenReserva}
                  presenteId={presente.id}
                  onReservar={() => abrirModal(presente)}
                  onCancelar={cancelarReserva}
                  possuiCotas={presente.possuiCotas}
                  totalCotas={presente.totalCotas}
                  cotasPreenchidas={presente.cotasPreenchidas}
                  cotas={presente.cotas}
                  onContribuir={() => abrirModalCota(presente)}
                  onDesfazer={cancelarCota}
                  loading={loadingId === presente.id}
                />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            mudarPagina={setPaginaAtual}
          />
          </>
        )
      }
      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <ReservationForm
          fechar={() => setModalAberto(false)}
          confirmar={reservarPresente}
          loading={loadingId === presenteSelecionado?.id}
        />
      </Modal>

      <Modal isOpen={modalCotaAberto} onClose={() => setModalCotaAberto(false)}>
        <CotaForm
          fechar={() => setModalCotaAberto(false)}
          confirmar={contribuir}
          loading={loadingId === presenteSelecionado?.id}
        />
      </Modal>
    </main>
  );
};

export default GiftList;
