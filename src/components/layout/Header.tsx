export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 justify-center">
          <div className="flex items-center space-x-8 justify-center">
            <button className="text-lg font-medium hover:text-blue-600">
              Planos
            </button>
            <button className="text-lg font-medium hover:text-blue-600">
              Estatística
            </button>
            <button className=" text-lg font-medium hover:text-blue-600">
              Novo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
