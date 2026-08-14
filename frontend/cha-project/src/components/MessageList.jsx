import MessageCard from "./MessageCard";


const MessageList = ({
    mensagens,
    onExcluir,
    onEditar,
    limite,
    loading,
}) => {


    const mensagensExibidas = limite
        ? mensagens.slice(0, limite)
        : mensagens;


    if(mensagensExibidas.length === 0){

        return (
            <p className="
                text-center
                text-gray-500
            ">
                Ainda não há recados. ❤️
            </p>
        )

    }
      
      return (

        <div
            className="    
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-10    
                "
            
        >

            {
                mensagensExibidas.map((msg)=>(
                    <MessageCard
                    key={msg.id}
                    id={msg.id}
                    nome={msg.nomePessoa}
                    mensagem={msg.mensagem}
                    token={msg.token}
                    onEditar={onEditar}
                    onExcluir={onExcluir}
                    loading={loading === msg.id}
                    />
                ))
            }

        </div>

);
};


export default MessageList;