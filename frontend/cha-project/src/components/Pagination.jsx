const Pagination = ({
    paginaAtual,
    totalPaginas,
    mudarPagina
}) => {
    return (
        <div className="
            flex
            justify-center
            items-center
            gap-3
            mt-10
        ">

            <button
                disabled={paginaAtual === 1}
                onClick={() => mudarPagina(paginaAtual - 1)}
                className="
                    px-4
                    py-2
                    rounded-full
                    border
                    disabled:opacity-50
                    cursor-pointer
                "
            >
                Anterior
            </button>


            <span>
                {paginaAtual} de {totalPaginas}
            </span>


            <button
                disabled={paginaAtual === totalPaginas}
                onClick={() => mudarPagina(paginaAtual + 1)}
                className="
                    px-4
                    py-2
                    rounded-full
                    border
                    disabled:opacity-50
                    cursor-pointer
                "
            >
                Próxima
            </button>

        </div> 

     );
}
 
export default Pagination;