import prisma from "../config/prisma.js";
import { randomUUID } from "crypto";

export const ConfirmarPresenca = async(req,res)=>{

    try {

        const { nomePessoa, quantidadePessoas } = req.body;


        if(!nomePessoa || !quantidadePessoas){
            return res.status(400).json({
                erro:"Nome e quantidade de pessoas são obrigatórios"
            });
        }

        const token = randomUUID();


        const presenca = await prisma.confirmacaoPresenca.create({
            data:{
                nomePessoa,
                quantidadePessoas,
                token
            }
        });


        res.status(201).json({
            mensagem:"Presença confirmada com sucesso",
            id: presenca.id,
            token
        });


    }catch(error){
        console.log(error)
        res.status(500).json({
            erro:"Erro ao confirmar presença"
        });

    }

}

export const ListarPresencas = async(req, res) => {
    try {

        const presencas = await prisma.confirmacaoPresenca.findMany({
            orderBy: {
                createdAt:"desc"
            }
        })

        return res.status(200).json(presencas)
    } catch (error) {
        return res.status(500).json({erro: "Erro ao listar Presenças"})
    }
}

export const AtualizarPresenca = async(req, res) => {
    try {
        const { id } = req.params;

        const { quantidadePessoas, token } = req.body;

        const presencaExiste = await prisma.confirmacaoPresenca.findUnique({
            where:{
                id
            }
        });


        if(!presencaExiste){
            return res.status(404).json({
                erro:"Confirmação de presença não encontrada"
            });
        }


        if(presencaExiste.token !== token){
            return res.status(403).json({
                erro:"Você não pode editar essa presença"
            });
        }

        const presencaAtualizada = await prisma.confirmacaoPresenca.update({

            where:{
                id
            },

            data:{
                quantidadePessoas
            }

        });


        return res.status(200).json(presencaAtualizada);



    } catch (error) {
        return res.status(500).json({erro: "Erro ao atualizar presença"})
        
    }
}

export const CancelarPresenca = async (req, res) => {
    try {
        
        const { id } = req.params
        const { token } = req.body

        const presencaExiste = await prisma.confirmacaoPresenca.findUnique({
            where:{
                id
            }
        });


        if(!presencaExiste){
            return res.status(404).json({
                erro:"Confirmação de presença não encontrada"
            });
        }


        if(presencaExiste.token !== token){
            return res.status(403).json({
                erro:"Você não pode cancelar essa presença"
            });
        }

        await prisma.confirmacaoPresenca.delete({
            where:{
                id
            }
        });


        return res.status(200).json({
            mensagem:"Presença cancelada"
        });

    } catch (error) {
        return res.status(500).json({erro: "Erro ao cancelar presença"})
    }
}