-- Tabla de temporizadores activos del local
CREATE TABLE public.timers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  console TEXT NOT NULL,
  hours NUMERIC(4,2) NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ NOT NULL,
  finished BOOLEAN NOT NULL DEFAULT false,
  notified BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.timers ENABLE ROW LEVEL SECURITY;

-- Lectura pública: cualquiera puede ver el contador (es un local físico)
CREATE POLICY "Public can read timers"
ON public.timers FOR SELECT
USING (true);

-- Solo usuarios autenticados (dueño / dev) pueden crear, modificar o borrar
CREATE POLICY "Authenticated can insert timers"
ON public.timers FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update timers"
ON public.timers FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete timers"
ON public.timers FOR DELETE
TO authenticated
USING (true);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_timers_updated_at
BEFORE UPDATE ON public.timers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Realtime
ALTER TABLE public.timers REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.timers;

CREATE INDEX idx_timers_active ON public.timers (ends_at) WHERE finished = false;