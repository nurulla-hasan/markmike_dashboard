import { lazy, Suspense } from "react";
import PageLayout from "@/components/common/page-layout";
import { Skeleton } from "@/components/ui/skeleton";

const EditorContainer = lazy(() => import("@/components/management/canvas-editor/EditorContainer"));

const CanvasEditor = () => {
  return (
    <PageLayout>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorContainer />
      </Suspense>
    </PageLayout>
  );
};

const EditorSkeleton = () => (
  <div className="flex h-[calc(100vh-120px)] w-full gap-4 p-4">
    <Skeleton className="w-64 h-full" />
    <div className="flex flex-col flex-1 gap-4">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="flex-1 w-full" />
    </div>
  </div>
);

export default CanvasEditor;
