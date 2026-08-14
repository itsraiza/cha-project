import prisma from "../config/prisma.js";

export const CriarCategorias = async (req, res) => {
    try {
        const { nome } = req.body; 

        if (!nome) {
            return res.status(400).json({ error: "Nome da categoria é obrigatório" });
        }

        const existingCategoria = await prisma.categoria.findUnique({
            where: {
                nome: nome
            }
        })

        if (existingCategoria) {
            return res.status(400).json({error: "Essa categoria já existe"})
        }

        const categoria = await prisma.categoria.create({
            data: {
                nome,
            },
        });

        res.status(201).json(categoria);

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar categoria" });
    }
}

export const ListarCategorias = async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        
        res.json(categorias);
    
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar categorias" });
    }
}

export const AtualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: "Nome da categoria é obrigatório" });
        }

        const existingCategoria = await prisma.categoria.findUnique({
            where: {
                id: id
            }
        })

        if (!existingCategoria) {
            return res.status(404).json({erro: "Categoria não encontrada"})
        }

        const categoriaExistente = await prisma.categoria.findUnique({
            where: {
                nome: nome
            }
        })

        if (categoriaExistente) {
            return res.status(400).json({erro: "Essa categoria já existe"})
        }
        

        const categoria = await prisma.categoria.update({
            where: { id },
            data: { nome },
        });

        res.status(200).json(categoria);

    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar categoria" });
    }
}

export const DeletarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCategoria = await prisma.categoria.findUnique({
            where: {
                id: id
            }
        })

        if (!existingCategoria) {
            return res.status(404).json({erro: "Categoria não encontrada"})
        }

        const categoria = await prisma.categoria.delete({
            where: { id },
        });

        res.status(204).json({ message: "Categoria deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar categoria" });
    }
}