

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";

const PageHeader = ({
  title,
  description,
  length,
  showBack,
}: {
  title: string;
  description: string;
  length?: number;
  showBack?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold uppercase tracking-widest text-foreground">
              {title}
            </h1>
            {length && (
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                {length}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground max-w-150 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader