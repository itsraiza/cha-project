import prisma from "../config/prisma.js";
import { randomUUID } from "crypto";

export const CriarMensagem = async (req, res) => {
    try {
        const {nomePessoa, mensagem} = req.body;
         
        if(!nomePessoa || !mensagem) {
            return res.status(400).json({erro: "Nome e mensagem são obrigatórios"})
        }

        const token = randomUUID();

        const novaMensagem = await prisma.mensagem.create({
            data: {
                nomePessoa,
                mensagem,
                token
            }
        });

        return res.status(201).json({message: "Mensagem enviada com sucesso", id: novaMensagem.id, token})

    } catch (error) {
        return res.status(500).json({erro: "Erro ao salvar mensagem"})
    }
}

export const ListarMensagens = async (req,res)=>{

    try {

        const mensagens = await prisma.mensagem.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });


        res.json(mensagens);


    } catch(error){

        res.status(500).json({
            erro:"Erro ao buscar mensagens"
        });

    }

}

export const AtualizarMensagem = async (req, res) => {

    try {

        const { id } = req.params;

        const { mensagem, token } = req.body;


        const mensagemExiste = await prisma.mensagem.findUnique({
            where:{
                id
            }
        });


        if(!mensagemExiste){
            return res.status(404).json({
                erro:"Mensagem não encontrada"
            });
        }


        if(mensagemExiste.token !== token){
            return res.status(403).json({
                erro:"Você não pode editar essa mensagem"
            });
        }


        const atualizada = await prisma.mensagem.update({

            where:{
                id
            },

            data:{
                mensagem
            }

        });


        res.json(atualizada);


    } catch(error){

        res.status(500).json({
            erro:"Erro ao atualizar mensagem"
        });

    }

}

export const DeletarMensagem = async(req,res)=>{

    try{

        const {id}=req.params;

        const {token}=req.body;


        const mensagem = await prisma.mensagem.findUnique({
            where:{
                id
            }
        });


        if(!mensagem){
            return res.status(404).json({
                erro:"Mensagem não encontrada"
            });
        }


        if(mensagem.token !== token){
            return res.status(403).json({
                erro:"Você não pode deletar essa mensagem"
            });
        }


        await prisma.mensagem.delete({
            where:{
                id
            }
        });


        res.json({
            mensagem:"Mensagem removida"
        });


    }catch(error){

        res.status(500).json({
            erro:"Erro ao deletar mensagem"
        });

    }

}