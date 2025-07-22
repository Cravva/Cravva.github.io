-- Create food products table with nutritional information
CREATE TABLE public.food_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  barcode TEXT UNIQUE,
  calories_per_100g DECIMAL(6,2) NOT NULL,
  protein_per_100g DECIMAL(5,2) NOT NULL DEFAULT 0,
  carbs_per_100g DECIMAL(5,2) NOT NULL DEFAULT 0,
  fat_per_100g DECIMAL(5,2) NOT NULL DEFAULT 0,
  fiber_per_100g DECIMAL(5,2) DEFAULT 0,
  sugar_per_100g DECIMAL(5,2) DEFAULT 0,
  sodium_per_100mg DECIMAL(7,2) DEFAULT 0,
  category TEXT,
  store TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read food products (public data)
CREATE POLICY "Food products are viewable by everyone" 
ON public.food_products 
FOR SELECT 
USING (true);

-- Create index for faster barcode lookups
CREATE INDEX idx_food_products_barcode ON public.food_products(barcode);

-- Create index for faster name searches
CREATE INDEX idx_food_products_name ON public.food_products USING gin(to_tsvector('english', name));

-- Create index for store filtering
CREATE INDEX idx_food_products_store ON public.food_products(store);

-- Insert sample food products from popular European supermarkets
INSERT INTO public.food_products (name, brand, barcode, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, sugar_per_100g, category, store) VALUES
-- Albert Heijn Products
('AH Volkoren brood', 'Albert Heijn', '8718906463889', 247, 8.5, 41.0, 4.2, 7.1, 3.8, 'Bread', 'Albert Heijn'),
('AH Magere melk', 'Albert Heijn', '8718906508896', 42, 3.4, 4.8, 0.1, 0, 4.8, 'Dairy', 'Albert Heijn'),
('AH Bananen', 'Albert Heijn', '8718906467147', 89, 1.1, 20.0, 0.3, 2.6, 17.2, 'Fruit', 'Albert Heijn'),
('AH Kipfilet naturel', 'Albert Heijn', '8718906472185', 165, 31.0, 0, 3.6, 0, 0, 'Meat', 'Albert Heijn'),
('AH Griekse yoghurt naturel', 'Albert Heijn', '8718906508124', 97, 9.0, 4.0, 5.0, 0, 4.0, 'Dairy', 'Albert Heijn'),

-- Delhaize Products
('Delhaize Pain complet', 'Delhaize', '5400141359701', 250, 9.2, 40.5, 4.8, 8.2, 4.1, 'Bread', 'Delhaize'),
('Delhaize Lait demi-écrémé', 'Delhaize', '5400141308549', 46, 3.2, 4.8, 1.5, 0, 4.8, 'Dairy', 'Delhaize'),
('Delhaize Pommes', 'Delhaize', '5400141456789', 52, 0.3, 11.4, 0.2, 2.4, 10.4, 'Fruit', 'Delhaize'),
('Delhaize Escalope de poulet', 'Delhaize', '5400141789456', 172, 32.5, 0, 4.2, 0, 0, 'Meat', 'Delhaize'),
('Delhaize Fromage blanc 0%', 'Delhaize', '5400141123789', 45, 8.5, 4.5, 0.1, 0, 4.5, 'Dairy', 'Delhaize'),

-- Carrefour Products
('Carrefour Pain de mie complet', 'Carrefour', '3560070462537', 265, 10.0, 43.0, 5.2, 6.8, 4.5, 'Bread', 'Carrefour'),
('Carrefour Lait entier', 'Carrefour', '3560070508964', 64, 3.2, 4.6, 3.6, 0, 4.6, 'Dairy', 'Carrefour'),
('Carrefour Bananes Bio', 'Carrefour', '3560070789123', 90, 1.2, 19.8, 0.4, 2.7, 16.8, 'Fruit', 'Carrefour'),
('Carrefour Blanc de poulet', 'Carrefour', '3560070456789', 168, 30.8, 0, 4.1, 0, 0, 'Meat', 'Carrefour'),
('Carrefour Yaourt nature', 'Carrefour', '3560070123456', 61, 4.3, 4.5, 3.2, 0, 4.5, 'Dairy', 'Carrefour'),

-- More variety
('Coca Cola', 'Coca Cola', '5000112546415', 42, 0, 10.6, 0, 0, 10.6, 'Beverages', 'Multiple'),
('Nutella', 'Ferrero', '8000500037522', 539, 6.3, 57.5, 30.9, 0, 56.3, 'Spreads', 'Multiple'),
('Oatmeal', 'Quaker', '8712100849687', 379, 13.2, 67.7, 6.5, 10.1, 0.8, 'Cereals', 'Multiple'),
('Salmon fillet', 'Various', '1234567890123', 208, 25.4, 0, 12.4, 0, 0, 'Fish', 'Multiple'),
('Brown rice', 'Various', '9876543210987', 112, 2.6, 22.0, 0.9, 1.8, 0.4, 'Grains', 'Multiple');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_food_products_updated_at
BEFORE UPDATE ON public.food_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();