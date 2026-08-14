const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-4 mt-2 shadow">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Raiza Sousa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
