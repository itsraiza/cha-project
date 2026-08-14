import { useState } from "react";
import Button from "../components/Button";

const CotaForm = ({ fechar, confirmar, loading }) => {
  const [nome, setNome] = useState("");
  const [copiado, setCopiado] = useState(false);

  function enviar(e) {
    e.preventDefault();

    if (!nome.trim()) return;

    confirmar(nome);

    setNome("");
  }

  const copiarPix = () => {
    navigator.clipboard.writeText("raizaksilva@gmail.com");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="mb-6 flex justify-center">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-lg border border-slate-100">
        <h2 className="text-2xl font-semibold mb-1 text-center text-slate-800">
          Contribuir com presente 💛
        </h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          ℹ️ As imagens são meramente ilustrativas
        </p>

        <div className="bg-amber-50/60 rounded-xl p-4 mb-5 border border-amber-100">
          <h3 className="font-semibold text-amber-900 mb-3 text-center text-sm uppercase tracking-wide">
            Valores de cada cota:
          </h3>
          <div className="space-y-2 text-sm text-slate-700 font-light">
            <div className="flex justify-between items-center bg-white/80 px-3 py-2 rounded-lg border border-amber-100/50">
              <span>Air-fryer</span>
              <span className="font-semibold text-amber-800">R$ 40,00</span>
            </div>
            <div className="flex justify-between items-center bg-white/80 px-3 py-2 rounded-lg border border-amber-100/50">
              <span>Panela de arroz</span>
              <span className="font-semibold text-amber-800">R$ 35,50</span>
            </div>
            <div className="flex justify-between items-center bg-white/80 px-3 py-2 rounded-lg border border-amber-100/50">
              <span>Multiprocessador</span>
              <span className="font-semibold text-amber-800">R$ 35,50</span>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-xs sm:text-sm text-center text-slate-600">
            Para apoiar, após clicar em contribuir, faça o envio do valor correspondente para a chave Pix:
          </p>
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs sm:text-sm font-mono text-slate-700 font-medium truncate mr-2">
              raizaksilva@gmail.com
            </span>
            <button
              type="button"
              onClick={copiarPix}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
            >
              {copiado ? "Copiado! ✓" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Formulário original */}
        <form onSubmit={enviar}>
          <input
            placeholder="Digite seu nome"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-3 mb-5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={fechar}>
              Cancelar
            </Button>

            <Button type="submit" loading={loading}>
              Contribuir
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CotaForm;