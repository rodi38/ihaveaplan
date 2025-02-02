// src/router.tsx
import { Router, Route, RootRoute, Outlet } from "@tanstack/react-router";
import { PlanList } from "../components/study-plan/PlanList";
import { PlanForm } from "../components/study-plan/PlanForm";
import App from "../App";
import { Stats } from "../components/stats/Stats";
import { Header } from "../components/layout/Header";

const rootRoute = new RootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet /> {/* Isso renderizará as rotas filhas */}
    </div>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PlanList,
});

const newPlanRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/new",
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Novo Plano de Estudos</h2>
      <PlanForm
        onSubmit={async (data) => {
          // Implementation will be handled by the component
        }}
        onCancel={() => window.history.back()}
      />
    </div>
  ),
});

const statsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/stats",
  component: Stats,
});

const routeTree = rootRoute.addChildren([indexRoute, newPlanRoute, statsRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
