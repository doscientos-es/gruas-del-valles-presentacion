import { Route, Routes } from "react-router";

import { PresentationLayout } from "@/app/PresentationLayout";
import { FinalPage } from "@/pages/FinalPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SectionPage } from "@/pages/SectionPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PresentationLayout />}>
        <Route index element={<HomePage />} />
        <Route path="final" element={<FinalPage />} />
        <Route path=":sectionId" element={<SectionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
