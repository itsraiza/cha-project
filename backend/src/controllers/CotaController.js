import prisma from "../config/prisma.js"
import { randomUUID } from "crypto";


export const CriarCota = async (req,res) => {

    try {

        const {
            nomePessoa,
            presenteId
        } = req.body;


        if(!nomePessoa || !presenteId){
            return res.status(400).json({
                erro:"Nome e presente são obrigatórios"
            });
        }



        const presente = await prisma.presente.findUnique({
            where:{
                id: presenteId
            },

            include:{
                cotas:true
            }
        });



        if(!presente){
            return res.status(404).json({
                erro:"Presente não encontrado"
            });
        }



        if(!presente.possuiCotas){
            return res.status(400).json({
                erro:"Esse presente não aceita cotas"
            });
        }



        if(presente.cotas.length >= presente.totalCotas){

            return res.status(400).json({
                erro:"Todas as cotas já foram preenchidas"
            });

        }



        const token = randomUUID();



        const cota = await prisma.cota.create({

            data:{
                nomePessoa,
                presenteId,
                token
            }

        });



        res.status(201).json({

            mensagem:"Contribuição realizada com sucesso",

            id:cota.id,

            token

        });



    } catch(error){

        console.log(error);

        res.status(500).json({
            erro:"Erro ao criar contribuição"
        });

    }

}

export const CancelarCota = async(req,res)=>{

    try {

        const { id } = req.params;
        const { token } = req.body;


        const cota = await prisma.cota.findUnique({
            where:{
                id
            }
        });



        if(!cota){

            return res.status(404).json({
                erro:"Contribuição não encontrada"
            });

        }



        if(cota.token !== token){

            return res.status(403).json({
                erro:"Você não pode cancelar essa contribuição"
            });

        }



        await prisma.cota.delete({
            where:{
                id
            }
        });



        res.json({
            mensagem:"Contribuição cancelada"
        });



    } catch(error){

        console.log(error);

        res.status(500).json({
            erro:"Erro ao cancelar contribuição"
        });

    }

}