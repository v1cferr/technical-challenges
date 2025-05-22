type Model = "Arc B570" | "Arc B580 LE" | "Arc B580 OC";
type Manufacturer = "Intel (LE)" | "ASRock" | "GUNNIR" | "Sparkle";
type Color = "Preto" | "Branco" | "RGB";

interface Product {
  id: string;
  title: string;
  variants: {
    model: Model[];
    manufacturer: Manufacturer[];
    color: Color[];
  };
  prices: Record<Model, number>;
  images: Record<Model, string[]>;
}

export const product: Product = {
  id: "arc-gpu-series",
  title: "Intel Arc GPU Series",
  variants: {
    model: ["Arc B570", "Arc B580 LE", "Arc B580 OC"],
    manufacturer: ["Intel (LE)", "ASRock", "GUNNIR", "Sparkle"],
    color: ["Preto", "Branco", "RGB"],
  },
  prices: {
    "Arc B570": 1599.99,
    "Arc B580 LE": 1999.99,
    "Arc B580 OC": 2299.99,
  },
  images: {
    "Arc B570": [
      "a", // Alterar conforme ir adicionando as imagens
    ],
    "Arc B580 LE": ["/images/b580le.jpg"],
    "Arc B580 OC": [
      "a", // Alterar conforme ir adicionando as imagens
    ],
  },
};
