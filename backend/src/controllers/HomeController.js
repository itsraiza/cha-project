import prisma from "../config/prisma.js";


export const EstatisticasHome = async (req, res) => {

    try {

        const totalPresentes = await prisma.presente.count();


        const presentesReservados = await prisma.reserva.count();


        const porcentagem = totalPresentes === 0
            ? 0
            : Math.round(
                (presentesReservados / totalPresentes) * 100
            );


        res.json({
            totalPresentes,
            presentesReservados,
            porcentagem
        });


    } catch(error) {

        res.status(500).json({
            erro: "Erro ao buscar estatísticas"
        });

    }

};