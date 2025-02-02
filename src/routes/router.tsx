// src/router.tsx
import {
  Router,
  Route,
  RootRoute,
  Outlet,
  Navigate,
} from "@tanstack/react-router";
import { PlanList } from "../components/study-plan/PlanList";
import { NewPlan } from "../components/study-plan/NewPlan";
import App from "../App";
import { Stats } from "../components/stats/Stats";
import { Header } from "../components/layout/Header";
import { useStudyPlans } from "../hooks/useStudyPlans";

const rootRoute = new RootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-900">
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

// const newPlanRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/new",
//   component: () => (
//     <div className="container mx-auto px-4 py-8 text-white">
//       <h2 className="text-2xl font-bold mb-6">Novo Plano de Estudos</h2>
//       <PlanForm
//         onSubmit={async (data) => {
//           // Implementation will be handled by the component

//           createPlan(data.title, data.description);
//           Navigate({to: '/'});

//           console.log('data', data);

//         }}
//         onCancel={() => window.history.back()}
//       />
//     </div>
//   ),
// });

const newPlanRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/new",
  component: NewPlan,
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
