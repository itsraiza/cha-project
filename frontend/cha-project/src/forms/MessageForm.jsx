import { useState, useEffect } from "react";
import Button from "../components/Button";


const MessageForm = ({
    onEnviar,
    onEditar,
    fechar,
    mensagemEditar,
    loading,
}) => {


    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");
    
    


    useEffect(() => {

        if(mensagemEditar){

            setNome(mensagemEditar.nome);
            setMensagem(mensagemEditar.mensagem);

        } else {

            setNome("");
            setMensagem("");

        }

    }, [mensagemEditar]);




    function enviar(e){
        e.preventDefault();
        


        if(!nome.trim() || !mensagem.trim()){
            return;
        }



        if(mensagemEditar){

            onEditar(
                mensagemEditar.id,
                mensagem,
                mensagemEditar.token
            );


        } else {


            onEnviar({
                nomePessoa: nome,
                mensagem
            });


        }


        
        setNome("");
        setMensagem("");

    }




    return (
        <>

        <h2 className="
            text-2xl
            font-semibold
            text-center
            mb-4
        ">
            {
                mensagemEditar
                ? "Editar recado"
                : "Deixe um recado"
            }
        </h2>

        <form onSubmit={enviar}>

        <div className="
            flex
            flex-col
            gap-3
            mb-2
        ">


            <input
                placeholder="Seu nome"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                maxLength={11}
                disabled={!!mensagemEditar}
                required
                className="
                    border
                    rounded-xl
                    p-3
                    disabled:bg-gray-100
                "
            />



            <textarea
                placeholder="Deixe uma mensagem para nós ❤️"
                value={mensagem}
                onChange={(e)=>setMensagem(e.target.value)}
                maxLength={100}
                required
                className="
                    border
                    rounded-xl
                    p-3
                    h-32
                    resize-none
                "
            />


        </div>



        <div className="
            flex
            justify-center
            gap-3
        ">


            <Button
                variant="secondary"
                onClick={fechar}
                disabled={loading}
            >
                Cancelar
            </Button>



            <Button
                type="submit"
                loading={loading}
            >
            
                {
                    mensagemEditar
                    ? "Salvar"
                    : "Enviar mensagem"
                }
            </Button>


        </div>
        </form>


        </>

    );
};


export default MessageForm;