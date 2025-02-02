// src/components/layout/Header.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 justify-center">
          {/* Burger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              activeProps={{ className: "text-lg font-medium text-blue-600" }}
            >
              Planos
            </Link>
            <Link
              to="/stats"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              activeProps={{ className: "text-lg font-medium text-blue-600" }}
            >
              Estatística
            </Link>
            <Link
              to="/new"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              activeProps={{ className: "text-lg font-medium text-blue-600" }}
            >
              Novo
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
            md:hidden 
            fixed inset-x-0 top-16 bg-white shadow-lg transition-transform duration-200 ease-in-out
            ${
              isMenuOpen
                ? "transform translate-y-0"
                : "transform -translate-y-full"
            }
          `}
          >
            <div className="flex flex-col p-4">
              <Link
                to="/"
                className="py-2 text-lg font-medium hover:text-blue-600 transition-colors"
                activeProps={{
                  className: "py-2 text-lg font-medium text-blue-600",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link
                to="/stats"
                className="py-2 text-lg font-medium hover:text-blue-600 transition-colors"
                activeProps={{
                  className: "py-2 text-lg font-medium text-blue-600",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Estatística
              </Link>
              <Link
                to="/new"
                className="py-2 text-lg font-medium hover:text-blue-600 transition-colors"
                activeProps={{
                  className: "py-2 text-lg font-medium text-blue-600",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Novo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
