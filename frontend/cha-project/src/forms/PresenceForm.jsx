import { useState } from "react";
import Button from "../components/Button";

const PresenceForm = ({ onConfirmar, cancelar, loading }) => {
  const [nomePessoa, setNomePessoa] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);

  function confirmar(e) {
    
    e.preventDefault();

    if (!nomePessoa.trim()) {
      return;
    }

    onConfirmar({
      nomePessoa,
      quantidadePessoas,
    });

    setNomePessoa("");
    setQuantidadePessoas(1);
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Confirmar presença</h2>

        <p className="text-gray-500 mt-2">
          Confirme sua presença para conseguirmos organizar tudo.
        </p>
      </div>

      <form onSubmit={confirmar}>
      <div className="flex flex-col gap-4">

        <input
          placeholder="Digite seu nome"
          type="text"
          value={nomePessoa}
          onChange={(e) => setNomePessoa(e.target.value)}
          required
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div>
          <label className="text-sm">Quantidade de pessoas (incluindo você)</label>

          <div
            className="
        flex
        items-center
        gap-4
        mt-2
    "
          >
            <button
              type="button"
              onClick={() =>
                setQuantidadePessoas(Math.max(1, quantidadePessoas - 1))
              }
              disabled={loading}
              className="
                w-10
                h-10
                rounded-full
                bg-gray-200
                cursor-pointer
            "
            >
              -
            </button>

            <span
              className="
            text-xl
            font-semibold
        "
            >
              {quantidadePessoas}
            </span>

            <button
              type="button"
              onClick={() => setQuantidadePessoas(quantidadePessoas + 1)}
              disabled={loading}
              className="
                w-10
                h-10
                rounded-full
                bg-gray-200
                cursor-pointer
            "
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-5">
        <Button variant="secondary" onClick={cancelar} disabled={loading}>
          Cancelar
        </Button>

        <Button type="submit" loading={loading}>Confirmar Presença</Button>
      </div>
      </form>
    </>
  );
};

export default PresenceForm;
