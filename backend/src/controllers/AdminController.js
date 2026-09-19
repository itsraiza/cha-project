import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CriarAdmin = async (req, res) => {

    try {

        const {
            nome,
            email,
            senha
        } = req.body;


        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios"
            });
        }


        const adminExiste = await prisma.admin.findUnique({
            where: {
                email
            }
        });


        if (adminExiste) {
            return res.status(409).json({
                erro: "Admin já cadastrado"
            });
        }


        const senhaHash = await bcrypt.hash(senha, 10);


        const admin = await prisma.admin.create({
            data: {
                nome,
                email,
                senha: senhaHash
            }
        });


        res.status(201).json({
            mensagem: "Admin criado com sucesso",
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            }
        });


    } catch(error) {

        res.status(500).json({
            erro: "Erro ao criar admin"
        });

    }

};


export const LoginAdmin = async (req, res) => {

    try {

        const {
            email,
            senha
        } = req.body;


        const admin = await prisma.admin.findUnique({
            where:{
                email
            }
        });


        if(!admin){
            return res.status(404).json({
                erro:"Admin não encontrado"
            });
        }


        const senhaValida = await bcrypt.compare(
            senha,
            admin.senha
        );


        if(!senhaValida){
            return res.status(401).json({
                erro:"Informações inválidas"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );


        res.json({
            mensagem:"Login realizado",
            token,
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            }
        });


    } catch(error){
        console.log(error)
        res.status(500).json({
            erro:"Erro no login"
        });

    }

};

export const DashboardAdmin = async (req, res) => {

    try {

        const totalPresentes = await prisma.presente.count();


        const presentesReservados = await prisma.reserva.count();


        const totalMensagens = await prisma.mensagem.count();


        const totalConfirmados = await prisma.confirmacaoPresenca.count();


        const porcentagemReservados = totalPresentes === 0
            ? 0
            : Math.round(
                (presentesReservados / totalPresentes) * 100
            );


        res.json({

            presentes: {
                total: totalPresentes,
                reservados: presentesReservados,
                porcentagem: porcentagemReservados
            },

            mensagens: totalMensagens,

            confirmacoesPresenca: totalConfirmados

        });


    } catch(error) {

        res.status(500).json({
            erro:"Erro ao carregar dashboard"
        });

    }

};