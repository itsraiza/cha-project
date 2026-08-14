import { Quote } from "lucide-react";
import Button from "./Button";


const MessageCard = ({
    id,
    nome,
    mensagem,
    token,
    onEditar,
    onExcluir,
    loading,
}) => {
    const minhaMensagem =
    localStorage.getItem(`mensagem-${id}`) === token;

    

    return (
        <div className="
            w-full h-72
            bg-white
            rounded-2xl
            p-6
            shadow-md
            overflow-hidden
            flex
            flex-col
            
        ">
            <Quote size={20}/>

            <h3 className="
                font-semibold
                text-lg
            ">
                {nome}
            </h3>


            <p className="
                mt-3
                text-gray-600
                wrap-break-word
                flex-1
            ">
                {mensagem}
            </p>



            {
                minhaMensagem && (

                    <div className="
                        flex
                        justify-center
                        
                        gap-3
                        mt-auto
                    ">

                        <Button
                            size="small"
                            variant="secondary"
                            onClick={() => onEditar({
                                id,
                                nome,
                                mensagem,
                                token
                            })}
                            disabled={loading}
                        >
                            Editar
                        </Button>


                        <Button
                            size="small"
                            onClick={() => onExcluir(id, token)}
                            loading={loading}
                        >
                            Excluir
                        </Button>

                    </div>

                )
            }

            <div className="flex items-center gap-3 mt-3">
                            <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 to-purple-500"/>

                            <span className="text-sm text-gray-500">
                                {nome}
                            </span>

                            <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-red-400"/>
                </div>
        </div>
    );
};


export default MessageCard;