import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import PresenceForm from "../forms/PresenceForm";
import api from "../services/api";
import PresenceCard from "./PresenceCard";
import toast from "react-hot-toast";

const PresenceButton = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [presenca, setPresenca] = useState(
    JSON.parse(localStorage.getItem("presenca")),
  );
  const [loading, setLoading] = useState(false);

  async function confirmarPresenca(dados) {
    setLoading(true);
    try {
      const response = await api.post("/presenca", dados);

      const novaPresenca = {
        id: response.data.id,
        token: response.data.token,
        ...dados,
      };

      localStorage.setItem("presenca", JSON.stringify(novaPresenca));

      setPresenca(novaPresenca);
      setModalAberto(false);

      toast.success("Presença confirmada com sucesso!");
    } catch (error) {
      toast.error("Erro ao confirmar presença");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function cancelarPresenca() {
    setLoading(true);
    try {
      await api.delete(`/presenca/${presenca.id}`, {
        data: {
          token: presenca.token,
        },
      });

      localStorage.removeItem("presenca");

      setPresenca(null);
      setModalAberto(false);

      toast.success("Presença cancelada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cancelar presença");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function editarPresenca(quantidadePessoas) {
    setLoading(true);
    try {
      const response = await api.put(`/presenca/${presenca.id}`, {
        quantidadePessoas,
        token: presenca.token,
      });

      const novaPresenca = {
        ...presenca,
        quantidadePessoas: response.data.quantidadePessoas,
      };

      localStorage.setItem("presenca", JSON.stringify(novaPresenca));

      setPresenca(novaPresenca);

      toast.success("Presença editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar presença");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function abrirModal() {
    setModalAberto(true);
  }

  return (
    <>
      <Button
        variant={presenca ? "confirmed" : "primary"}
        className="mt-2"
        onClick={abrirModal}
      >
        {presenca ? "Visualizar presença" : "Confirmar presença"}
      </Button>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        {presenca ? (
          <PresenceCard
            presenca={presenca}
            editar={editarPresenca}
            cancelar={cancelarPresenca}
            loading={loading}
          />
        ) : (
          <PresenceForm
            cancelar={() => setModalAberto(false)}
            onConfirmar={confirmarPresenca}
            loading={loading}
          />
        )}
      </Modal>
    </>
  );
};

export default PresenceButton;