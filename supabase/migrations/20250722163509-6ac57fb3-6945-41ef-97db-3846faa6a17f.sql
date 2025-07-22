-- Fix function search path security issue
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- The function should be rewritten to be more secure
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = clock_timestamp();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';