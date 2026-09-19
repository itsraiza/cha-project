import prisma from "../config/prisma.js"
import { randomUUID } from "crypto";

export const CriarReserva = async (req, res) => {
    try {
        
        const { nomePessoa, presenteId } = req.body 

        if (!nomePessoa || !presenteId) {
            return res.status(400).json({erro: "Todos os campos são obrigatórios"});
        }

        const presente = await prisma.presente.findUnique({
            where: {
                id: presenteId
            },

            include: {
                reserva: true
            }
        })

        if (!presente) {
            return res.status(404).json({erro: "Presente não encontrado"})
        }


        if (presente.reserva) {
            return res.status(400).json({erro: "Este presente já foi reservado"})
        }

        const token = randomUUID();

        const reserva = await prisma.reserva.create({

            data: {
                nomePessoa,
                presenteId,
                token
            }

        });

        return res.status(201).json({message: "Presente reservado com sucesso!", token})

    } catch (error) {
        return res.status(500).json({erro: "Erro ao reservar presente"})
    }
}

export const ListarReservas = async (req, res) => {
    try {
        const reservas = await prisma.reserva.findMany({
            include: {
                presente: true
            }
        });
        return res.status(200).json({ reservas });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao listar reservas" });
    }
};

export const CancelarReserva = async (req, res) => {
    try {
        const { presenteId } = req.params
        const { token } = req.body

        const reserva = await prisma.reserva.findUnique({
            where: {
                presenteId
            }
        });


        if (!reserva) {
            return res.status(404).json({
                erro: "Reserva não encontrada"
            });
        }


        if (reserva.token !== token) {
            return res.status(403).json({
                erro: "Você não tem permissão para cancelar essa reserva"
            });
        }


        await prisma.reserva.delete({
            where: {
                id: reserva.id
            }
        });


        res.json({message: "Reserva cancelada com sucesso"});
        
    } catch (error) {
        res.status(500).json({erro: "Erro ao cancelar reserva"});
    }

    

}

