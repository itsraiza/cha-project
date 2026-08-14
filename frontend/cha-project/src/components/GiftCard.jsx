import Button from "./Button";

const GiftCard = ({
  nome,
  imagem,
  reservado,
  reservadoPor,
  tokenReserva,
  presenteId,

  possuiCotas,
  totalCotas,
  cotasPreenchidas,
  cotas,

  onReservar,
  onCancelar,
  onContribuir,
  onDesfazer,
  loading,
}) => {
  const minhaReserva =
    localStorage.getItem(`reserva-${presenteId}`) === tokenReserva;

  const tokenMinhaCota = localStorage.getItem(`cota-${presenteId}`);

  const minhaCota = cotas?.find(
      (cota) => cota.token === tokenMinhaCota
  );

  const progressoCotas = totalCotas
    ? Math.round((cotasPreenchidas / totalCotas) * 100)
    : 0;

  return (
    <div
      className="
            flex 
            flex-col
            
            items-start
            gap-6
            rounded-2xl 
            p-8 
            w-full
            h-[420px] 
            bg-white 
            shadow-md 
            hover:shadow-lg 
            transition-shadow 
            duration-300
        "
    >
      {/* Imagem */}
      <div
        className="
                flex 
                items-center 
                justify-center 
                w-full 
                h-40 
                shrink-0
                rounded-xl
               
            "
      >
        <img
          className="
                        w-full 
                        h-full 
                        object-contain
                    "
          src={imagem}
          alt={nome}
        />
      </div>

      {/* Informações */}
      <div
        className="
                flex 
                flex-col 
                w-full
                h-full
                gap-4
                flex-1
            "
      >
        <div>
          <h3
            className="
                        font-poppins 
                        text-lg 
                        font-semibold
                    "
          >
            {nome}
          </h3>

          <p className="text-sm text-gray-500">Compre onde você quiser!</p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Cores de preferência:</h3>

          <div className="flex gap-2 mt-2">
            <div className="w-5 h-5 bg-black border rounded-full"></div>

            <div className="w-5 h-5 bg-gray-200 border rounded-full"></div>

            <div className="w-5 h-5 bg-white border rounded-full"></div>
          </div>
        </div>

        {possuiCotas ? (

          minhaCota ? (

            <div>
              <Button
                variant="secondary"
                className="w-full h-9"
                onClick={() => onDesfazer(minhaCota.id, minhaCota.token, presenteId)}
                loading={loading}
              >
                Cancelar contribuição
              </Button>
            </div>

          ) : (

            <div
            className="
        mt-auto
        flex
        flex-col
        justify-center 
        gap-2
        "
          >
            <div className="flex justify-center items-center">

              {cotasPreenchidas >= totalCotas ? (
                <Button className="w-full h-9" disabled>Cotas completas</Button>
              ) : (
                <Button className="w-full h-9" onClick={onContribuir} loading={loading}>Contribuir</Button>
              )}

            </div>

            <div className="flex justify-between items-center gap-4">
              <div
                className="
                flex
                justify-between
                text-sm
                text-gray-600
                "
                >
                <span>Cotas</span>
              </div>

              <div
                className="
                w-full
                h-2
                bg-gray-200
                rounded-full
                overflow-hidden
                
            "
            >
                <div
                  className="
                  h-full
                    bg-black
                    "
                  style={{
                    width: `${progressoCotas}%`,
                  }}
                />
              </div>
              <span>
                {cotasPreenchidas}/{totalCotas}
              </span>
            </div>
          </div>
                    )

        ) : reservado ? (

          minhaReserva ? (
            <div>
              <Button
                variant="secondary"
                className="w-full h-9"
                onClick={() => onCancelar(presenteId, tokenReserva)}
                loading={loading}
              >
                Cancelar reserva
              </Button>

              <div className="flex items-center gap-3 mt-3">
                <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 to-purple-500" />

                <span className="text-sm text-gray-500">{reservadoPor}</span>

                <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-red-400" />
              </div>
            </div>
          ) : (
            <div>
              <Button disabled className="w-full h-9">
                Presente reservado
              </Button>

              <div className="flex items-center gap-3 mt-3">
                <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 to-purple-500" />

                <span className="text-sm text-gray-500">{reservadoPor}</span>

                <div className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-red-400" />
              </div>
            </div>
          )
        ) : (
          <Button onClick={onReservar} className="w-full h-9" loading={loading}>
            Reservar
          </Button>
        )}
      </div>
    </div>
  );
};

export default GiftCard;
