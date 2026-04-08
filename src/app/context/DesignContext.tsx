import { createContext, useContext, useState, ReactNode } from "react";

interface DesignSelections {
  zipCode?: string;
  category?: string;
  product?: {
    id: string;
    title: string;
    description: string;
  };
  tier?: {
    id: string;
    title: string;
    subtitle: string;
  };
  background?: string;
  visualizer?: {
    wallFinish: string;
    tubStyle: string;
    fixture: string;
    flooring: string;
  };
  selectedProductsData?: {
    [category: string]: {
      id: string;
      name: string;
      imageUrl: string;
      color: "white" | "golden";
    };
  };
}

interface DesignContextType {
  selections: DesignSelections;
  updateSelections: (newSelections: Partial<DesignSelections>) => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<DesignSelections>({});

  const updateSelections = (newSelections: Partial<DesignSelections>) => {
    setSelections((prev) => ({ ...prev, ...newSelections }));
  };

  return (
    <DesignContext.Provider value={{ selections, updateSelections }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
}
