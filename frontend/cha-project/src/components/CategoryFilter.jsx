import Button from "./Button";

const CategoryFilter = ({
  categorias,
  categoriaSelecionada,
  setCategoriaSelecionada,
}) => {


  return (
    <div
      className="
        flex
        flex-wrap
        justify-center
        gap-3
        mb-10
      "
    >

      <Button
        size="small"
        variant={
          categoriaSelecionada === ""
            ? "primary"
            : "secondary"
        }
        onClick={() => setCategoriaSelecionada("")}
      >
        Todos
      </Button>


      {categorias.map((categoria) => (

        <Button
          key={categoria.id}
          size="small"
          variant={
            categoriaSelecionada === categoria.nome
              ? "primary"
              : "secondary"
          }
          onClick={() =>
            setCategoriaSelecionada(categoria.nome)
          }
        >
          {categoria.nome}
        </Button>

      ))}


    </div>
  );
};

export default CategoryFilter;