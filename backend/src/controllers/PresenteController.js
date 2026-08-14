import prisma from "../config/prisma.js";

export const CriarPresentes = async (req, res) => {
    try {

        const { nome, imagem, categoriaId, possuiCotas, totalCotas } = req.body;

        if (!nome || !imagem || !categoriaId) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const categoria = await prisma.categoria.findUnique({
            where: {
                id: categoriaId
            }
        })

        if (!categoria) {
            return res.status(404).json({error: "Categoria não encontrada"})
        }

        const presente = await prisma.presente.create({
            data: {
                nome,
                imagem,
                categoriaId,

                possuiCotas: possuiCotas ?? false,

                totalCotas: possuiCotas 
                ? totalCotas 
                : 1
            }
        });

        res.status(201).json(presente);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao criar presente" });
    }
}

export const ListarPresentes = async (req, res) => {
    try {

        const { categoria, page = 1, limit = 9 } = req.query;

        const pagina = Number(page);
        const quantidade = Number(limit);

        const skip = (pagina - 1) * quantidade;


        const filtro = categoria
            ? {
                categoria: {
                    nome: categoria
                }
            }
            : {};


        const presentes = await prisma.presente.findMany({
            where: filtro,

            include: {
                categoria: true,
                reserva: true,
                cotas:true
            },

            skip,
            take: quantidade
        });

        const presentesFormatados = presentes.map((presente) => ({
            id: presente.id,
            nome: presente.nome,
            imagem: presente.imagem,

            categoria: presente.categoria.nome,

            reservado: !!presente.reserva,

            possuiCotas: presente.possuiCotas,

            totalCotas: presente.totalCotas,

            cotasPreenchidas: presente.cotas.length,

            cotas: presente.cotas.map((cota) => ({
                id: cota.id,
                token: cota.token
            })),
            
            reservadoPor: presente.reserva
                ? presente.reserva.nomePessoa
                : null,

            tokenReserva: presente.reserva
                ? presente.reserva.token
                : null
        }));


        const totalPresentes = await prisma.presente.count({
            where: filtro
        });


        const totalPaginas = Math.ceil(totalPresentes / quantidade);


        res.json({
            presentes: presentesFormatados,
            paginaAtual: pagina,
            totalPaginas,
            totalPresentes
        });


    } catch (error) {

        res.status(500).json({
            erro: "Erro ao buscar presentes"
        });

    }
};

export const AtualizarPresente = async (req, res) => {
    try {
        const { id } = req.params;
        const {nome, imagem, categoriaId} = req.body;

        if (!nome || !imagem || !categoriaId) {
            return res.status(400).json({ error: "Nome, imagem e ID da categoria são obrigatórios" });
        }

        const presenteExiste = await prisma.presente.findUnique({
            where: {
                id: id
            }
        })

        if (!presenteExiste) {
            return res.status(404).json({error: "Presente não encontrado"})
        }

        if (categoriaId) {

            const categoriaExiste = await prisma.categoria.findUnique({
                where: {
                    id: categoriaId
                }
            });


            if (!categoriaExiste) {
                return res.status(404).json({
                    erro: "Categoria não encontrada"
                });
            }

        }

        const presente = await prisma.presente.update({
            where: { id }, 
            data: {nome, imagem, categoriaId}

        });

        res.json(presente)


    } catch (error) {
        res.status(500).json({message: "Erro ao atualizar presente"})
    }
}

export const DeletarPresente = async (req, res) => {
    try {
        const { id } = req.params

        const presenteExiste = await prisma.presente.findUnique({
            where: {
                id
            }
        });


        if (!presenteExiste) {
            return res.status(404).json({
                erro: "Presente não encontrado"
            });
        }


        await prisma.presente.delete({
            where: {
                id
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar presente" });
    }
}