import { useState } from "react";
import Button from "./Button";

const PresenceCard = ({
    presenca,
    editar,
    cancelar,
    loading
}) => {

    const [editando, setEditando] = useState(false);

    const [quantidadePessoas, setQuantidadePessoas] = useState(
        presenca.quantidadePessoas
    );

    async function salvarEdicao(){
        await editar(quantidadePessoas);
        setEditando(false);
    }

    return (
        <div>

            <h2 className="
                text-2xl
                font-semibold
            ">
                Presença confirmada ♡
            </h2>

            <p className="mt-4">
                Nome: {presenca.nomePessoa}
            </p>

            {
                editando ? (

                    <div className="mt-4">

                        <p>
                            Quantidade de pessoas (incluindo você)
                        </p>

                        <div className="
                            flex
                            items-center
                            gap-4
                            mt-3
                        ">

                            <button
                                onClick={() =>
                                    setQuantidadePessoas(
                                        Math.max(
                                            1,
                                            quantidadePessoas - 1
                                        )
                                    )
                                }
                                disabled={loading}
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-gray-200
                                    text-xl
                                    disabled:opacity-50
                                "
                            >
                                -
                            </button>

                            <span className="
                                text-xl
                                font-semibold
                            ">
                                {quantidadePessoas}
                            </span>

                            <button
                                onClick={() =>
                                    setQuantidadePessoas(
                                        quantidadePessoas + 1
                                    )
                                }
                                disabled={loading}
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-gray-200
                                    text-xl
                                    disabled:opacity-50
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>

                ) : (

                    <p>
                        Quantidade:
                        {" "}
                        {presenca.quantidadePessoas}
                        {" "}
                        pessoas
                    </p>

                )
            }

            <div className="
                flex
                justify-center
                gap-3
                mt-6
            ">

                {
                    editando ? (

                        <>

                            <Button
                                onClick={salvarEdicao}
                                loading={loading}
                            >
                                Salvar
                            </Button>

                            <Button
                                variant="secondary"
                                disabled={loading}
                                onClick={() => {
                                    setQuantidadePessoas(
                                        presenca.quantidadePessoas
                                    );
                                    setEditando(false);
                                }}
                            >
                                Voltar
                            </Button>

                        </>

                    ) : (

                        <>

                            <Button
                                onClick={() => setEditando(true)}
                            >
                                Editar
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={cancelar}
                                loading={loading}
                            >
                                Cancelar presença
                            </Button>

                        </>

                    )

                }

            </div>

        </div>
    );
};

export default PresenceCard;