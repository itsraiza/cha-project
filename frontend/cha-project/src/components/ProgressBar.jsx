import { useEffect, useState } from "react";
import api from "../services/api";
import casa from "../assets/casa.png";
import toast from "react-hot-toast";
import Loader from "./Loader";

const ProgressBar = () => {
     const [estatisticas, setEstatisticas] = useState(null);
     const [carregandoProgresso, setCarregandoProgresso] = useState(true);

    async function buscarEstatisticas(){
        setCarregandoProgresso(true)
        try {
            const response = await api.get("/home");
            setEstatisticas(response.data);
        } catch(error){
            toast.error("Erro ao carregar progresso");
            console.log(error);
        } finally {
           setCarregandoProgresso(false);
        }
    }

    useEffect(() => {
        buscarEstatisticas();
    }, []);

    if (carregandoProgresso) {
        return (
            <section className="w-full max-w-2xl flex justify-center py-10">
                <Loader size="md" />
            </section>
        );
    }

    if (!estatisticas) return null;

    return (
        <section className="
            w-full
            max-w-2xl        
        ">

        <div className="flex justify-around items-center gap-10 max-lg:flex-col max-lg:justify-center max-lg:gap-4">

            <div className="flex justify-center items-center gap-2">
                      <img className="w-10" src={casa} alt="casa" />
                      <p>
                        Nosso lar está
                        <br />
                        <span className="font-bold">{estatisticas.porcentagem}% completo</span>
                      </p>
            </div>

            <div className="flex flex-col">

            <div className="
                flex
                justify-between
                mb-3
                text-sm
            ">

                <span>
                    Presentes reservados
                </span>

                <span>
                    {estatisticas.presentesReservados}
                    /
                    {estatisticas.totalPresentes}
                </span>

            </div>

            <div className="
                h-4
                bg-gray-200
                rounded-full
                overflow-hidden
            ">

                <div
                    className="
                        h-full
                        bg-black
                        rounded-full
                        transition-all
                        duration-700
                    "
                    style={{
                        width: `${estatisticas.porcentagem}%`
                    }}
                />
            </div>

            <p className="
                text-center
                mt-3
                text-gray-500
                text-sm
            ">
                {estatisticas.porcentagem}% dos presentes já foram escolhidos
            </p>
                </div>

        </div>

        </section>
     );
}

export default ProgressBar;