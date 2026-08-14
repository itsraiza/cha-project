import { useState } from "react";
import Button from "../components/Button";
import { CircleAlert } from 'lucide-react';

const ReservationForm = ({ confirmar, fechar, loading }) => {
  const [nome, setNome] = useState("");

  function enviarReserva(e) {
    e.preventDefault();

    if (!nome.trim()) return;

    confirmar(nome);

    setNome("");
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Reservar presente</h2>

        <p className="mt-2">ℹ️ As imagens são meramente ilustrativas</p>

        <p className="text-gray-500 mt-2">
          Informe seu nome para reservar este presente.
        </p>
      </div>

      <form onSubmit={enviarReserva}>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="
          w-full
          border
          rounded-xl
          p-3
          mb-6
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={fechar}>
          Cancelar
        </Button>

        <Button type="submit" loading={loading}>Reservar</Button>
      </div>
      </form>
    </>
  );
};

export default ReservationForm;
