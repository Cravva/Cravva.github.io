
-- Add more food products from Jumbo and expand existing store selections
INSERT INTO public.food_products (name, brand, barcode, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, sugar_per_100g, category, store) VALUES

-- Jumbo Products
('Jumbo Volkoren brood', 'Jumbo', '8712566454789', 243, 8.8, 40.2, 4.5, 7.5, 3.2, 'Bread', 'Jumbo'),
('Jumbo Verse melk', 'Jumbo', '8712566123456', 64, 3.3, 4.7, 3.5, 0, 4.7, 'Dairy', 'Jumbo'),
('Jumbo Bananen', 'Jumbo', '8712566789012', 88, 1.0, 19.5, 0.2, 2.8, 16.8, 'Fruit', 'Jumbo'),
('Jumbo Kipfilet', 'Jumbo', '8712566345678', 170, 31.5, 0, 3.8, 0, 0, 'Meat', 'Jumbo'),
('Jumbo Griekse yoghurt', 'Jumbo', '8712566901234', 95, 8.8, 3.8, 4.8, 0, 3.8, 'Dairy', 'Jumbo'),
('Jumbo Eieren', 'Jumbo', '8712566567890', 155, 13.0, 0.7, 11.0, 0, 0.7, 'Dairy', 'Jumbo'),
('Jumbo Zalm filet', 'Jumbo', '8712566234567', 206, 25.2, 0, 12.2, 0, 0, 'Fish', 'Jumbo'),
('Jumbo Avocado', 'Jumbo', '8712566678901', 160, 2.0, 8.5, 14.7, 6.7, 0.7, 'Fruit', 'Jumbo'),
('Jumbo Quinoa', 'Jumbo', '8712566345679', 368, 14.1, 57.2, 6.1, 7.0, 0, 'Grains', 'Jumbo'),
('Jumbo Spinazie', 'Jumbo', '8712566456789', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 'Vegetables', 'Jumbo'),

-- More Albert Heijn products
('AH Eieren M', 'Albert Heijn', '8718906123789', 155, 13.0, 0.7, 11.0, 0, 0.7, 'Dairy', 'Albert Heijn'),
('AH Zalm naturel', 'Albert Heijn', '8718906234567', 208, 25.4, 0, 12.4, 0, 0, 'Fish', 'Albert Heijn'),
('AH Avocado', 'Albert Heijn', '8718906345678', 160, 2.0, 8.5, 14.7, 6.7, 0.7, 'Fruit', 'Albert Heijn'),
('AH Quinoa', 'Albert Heijn', '8718906456789', 368, 14.1, 57.2, 6.1, 7.0, 0, 'Grains', 'Albert Heijn'),
('AH Spinazie vers', 'Albert Heijn', '8718906567890', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 'Vegetables', 'Albert Heijn'),
('AH Amandelen', 'Albert Heijn', '8718906678901', 579, 21.2, 21.6, 49.9, 12.5, 4.4, 'Nuts', 'Albert Heijn'),
('AH Tonijn in water', 'Albert Heijn', '8718906789012', 116, 25.5, 0, 0.8, 0, 0, 'Fish', 'Albert Heijn'),
('AH Havermout', 'Albert Heijn', '8718906890123', 379, 13.2, 67.7, 6.5, 10.1, 0.8, 'Cereals', 'Albert Heijn'),
('AH Appels', 'Albert Heijn', '8718906901234', 52, 0.3, 11.4, 0.2, 2.4, 10.4, 'Fruit', 'Albert Heijn'),
('AH Broccoli', 'Albert Heijn', '8718906012345', 25, 3.0, 4.0, 0.4, 3.0, 1.0, 'Vegetables', 'Albert Heijn'),

-- More Delhaize products
('Delhaize Oeufs', 'Delhaize', '5400141234567', 155, 13.0, 0.7, 11.0, 0, 0.7, 'Dairy', 'Delhaize'),
('Delhaize Saumon', 'Delhaize', '5400141345678', 208, 25.4, 0, 12.4, 0, 0, 'Fish', 'Delhaize'),
('Delhaize Avocat', 'Delhaize', '5400141456789', 160, 2.0, 8.5, 14.7, 6.7, 0.7, 'Fruit', 'Delhaize'),
('Delhaize Quinoa', 'Delhaize', '5400141567890', 368, 14.1, 57.2, 6.1, 7.0, 0, 'Grains', 'Delhaize'),
('Delhaize Épinards', 'Delhaize', '5400141678901', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 'Vegetables', 'Delhaize'),
('Delhaize Amandes', 'Delhaize', '5400141789012', 579, 21.2, 21.6, 49.9, 12.5, 4.4, 'Nuts', 'Delhaize'),
('Delhaize Thon au naturel', 'Delhaize', '5400141890123', 116, 25.5, 0, 0.8, 0, 0, 'Fish', 'Delhaize'),
('Delhaize Flocons d\'avoine', 'Delhaize', '5400141901234', 379, 13.2, 67.7, 6.5, 10.1, 0.8, 'Cereals', 'Delhaize'),
('Delhaize Brocolis', 'Delhaize', '5400141012345', 25, 3.0, 4.0, 0.4, 3.0, 1.0, 'Vegetables', 'Delhaize'),
('Delhaize Tomates', 'Delhaize', '5400141123456', 18, 0.9, 3.9, 0.2, 1.2, 2.6, 'Vegetables', 'Delhaize'),

-- More Carrefour products
('Carrefour Oeufs frais', 'Carrefour', '3560070123456', 155, 13.0, 0.7, 11.0, 0, 0.7, 'Dairy', 'Carrefour'),
('Carrefour Saumon atlantique', 'Carrefour', '3560070234567', 208, 25.4, 0, 12.4, 0, 0, 'Fish', 'Carrefour'),
('Carrefour Avocat', 'Carrefour', '3560070345678', 160, 2.0, 8.5, 14.7, 6.7, 0.7, 'Fruit', 'Carrefour'),
('Carrefour Quinoa Bio', 'Carrefour', '3560070456789', 368, 14.1, 57.2, 6.1, 7.0, 0, 'Grains', 'Carrefour'),
('Carrefour Épinards frais', 'Carrefour', '3560070567890', 23, 2.9, 3.6, 0.4, 2.2, 0.4, 'Vegetables', 'Carrefour'),
('Carrefour Amandes', 'Carrefour', '3560070678901', 579, 21.2, 21.6, 49.9, 12.5, 4.4, 'Nuts', 'Carrefour'),
('Carrefour Thon naturel', 'Carrefour', '3560070789012', 116, 25.5, 0, 0.8, 0, 0, 'Fish', 'Carrefour'),
('Carrefour Flocons avoine', 'Carrefour', '3560070890123', 379, 13.2, 67.7, 6.5, 10.1, 0.8, 'Cereals', 'Carrefour'),
('Carrefour Brocolis', 'Carrefour', '3560070901234', 25, 3.0, 4.0, 0.4, 3.0, 1.0, 'Vegetables', 'Carrefour'),
('Carrefour Tomates', 'Carrefour', '3560070012345', 18, 0.9, 3.9, 0.2, 1.2, 2.6, 'Vegetables', 'Carrefour'),

-- Common European products
('Pasta penne', 'Barilla', '8076809513708', 353, 12.0, 71.2, 1.5, 3.0, 3.2, 'Pasta', 'Multiple'),
('Pasta spaghetti', 'Barilla', '8076809513715', 353, 12.0, 71.2, 1.5, 3.0, 3.2, 'Pasta', 'Multiple'),
('Riz basmati', 'Taureau Ailé', '3245411234567', 345, 7.5, 78.0, 0.5, 1.3, 0.1, 'Grains', 'Multiple'),
('Pommes de terre', 'Various', '1111111111111', 77, 2.0, 17.0, 0.1, 2.2, 0.8, 'Vegetables', 'Multiple'),
('Carottes', 'Various', '2222222222222', 35, 0.9, 7.6, 0.2, 2.8, 4.7, 'Vegetables', 'Multiple'),
('Courgettes', 'Various', '3333333333333', 17, 1.2, 3.1, 0.3, 1.0, 2.5, 'Vegetables', 'Multiple'),
('Poivrons rouges', 'Various', '4444444444444', 31, 1.0, 6.0, 0.3, 2.5, 4.2, 'Vegetables', 'Multiple'),
('Concombre', 'Various', '5555555555555', 12, 0.7, 2.2, 0.1, 0.5, 1.7, 'Vegetables', 'Multiple'),
('Laitue', 'Various', '6666666666666', 13, 1.4, 2.9, 0.2, 1.3, 0.8, 'Vegetables', 'Multiple'),
('Fromage gouda', 'Various', '7777777777777', 356, 25.0, 2.2, 27.4, 0, 2.2, 'Dairy', 'Multiple'),

-- More protein sources
('Boeuf haché 5%', 'Various', '8888888888888', 137, 20.7, 0, 5.1, 0, 0, 'Meat', 'Multiple'),
('Porc côtelette', 'Various', '9999999999999', 242, 27.3, 0, 14.0, 0, 0, 'Meat', 'Multiple'),
('Dinde escalope', 'Various', '1010101010101', 189, 29.0, 0, 7.4, 0, 0, 'Meat', 'Multiple'),
('Crevettes', 'Various', '1111111111112', 99, 18.0, 0.9, 1.4, 0, 0, 'Fish', 'Multiple'),
('Moules', 'Various', '1111111111113', 86, 11.9, 7.0, 2.2, 0, 0, 'Fish', 'Multiple'),
('Tofu nature', 'Various', '1111111111114', 76, 8.1, 1.9, 4.8, 0.4, 0.7, 'Protein', 'Multiple'),
('Lentilles cuites', 'Various', '1111111111115', 116, 9.0, 20.1, 0.4, 7.9, 1.8, 'Legumes', 'Multiple'),
('Haricots rouges', 'Various', '1111111111116', 127, 8.7, 22.8, 0.5, 6.4, 0.3, 'Legumes', 'Multiple'),
('Pois chiches', 'Various', '1111111111117', 164, 8.9, 27.4, 2.6, 7.6, 4.8, 'Legumes', 'Multiple'),
('Noix', 'Various', '1111111111118', 654, 15.2, 13.7, 65.2, 6.7, 2.6, 'Nuts', 'Multiple'),

-- Breakfast items
('Céréales muesli', 'Kellogg\'s', '1111111111119', 367, 10.1, 66.6, 5.9, 7.4, 26.8, 'Cereals', 'Multiple'),
('Corn flakes', 'Kellogg\'s', '1111111111120', 357, 7.5, 84.0, 0.9, 3.0, 8.0, 'Cereals', 'Multiple'),
('Confiture fraise', 'Bonne Maman', '1111111111121', 246, 0.4, 60.0, 0.1, 1.1, 58.0, 'Spreads', 'Multiple'),
('Miel', 'Various', '1111111111122', 304, 0.3, 82.4, 0, 0.2, 82.1, 'Spreads', 'Multiple'),
('Beurre', 'Various', '1111111111123', 717, 0.9, 0.7, 81.1, 0, 0.7, 'Dairy', 'Multiple'),
('Margarine', 'Various', '1111111111124', 717, 0.2, 0.4, 80.0, 0, 0.4, 'Spreads', 'Multiple'),

-- Snacks and drinks
('Chips nature', 'Lay\'s', '1111111111125', 536, 6.6, 53.0, 34.0, 4.8, 0.9, 'Snacks', 'Multiple'),
('Chocolat noir 70%', 'Lindt', '1111111111126', 579, 9.6, 24.2, 42.6, 12.2, 19.4, 'Snacks', 'Multiple'),
('Biscuits digestive', 'McVitie\'s', '1111111111127', 471, 6.5, 62.1, 20.9, 3.6, 16.4, 'Snacks', 'Multiple'),
('Jus d\'orange', 'Tropicana', '1111111111128', 45, 0.7, 10.4, 0.2, 0.2, 8.4, 'Beverages', 'Multiple'),
('Eau minérale', 'Evian', '1111111111129', 0, 0, 0, 0, 0, 0, 'Beverages', 'Multiple'),
('Thé vert', 'Lipton', '1111111111130', 1, 0.2, 0, 0, 0, 0, 'Beverages', 'Multiple'),
('Café noir', 'Various', '1111111111131', 2, 0.3, 0, 0, 0, 0, 'Beverages', 'Multiple'),
('Lait d\'amande', 'Alpro', '1111111111132', 13, 0.5, 0.3, 1.1, 0.1, 0, 'Beverages', 'Multiple');
