--
-- PostgreSQL database dump
--

\restrict 6W43qGgm3NMxWbAbvKxPDRJmkPuRPtLhb8QdMq4uSP44WZUyGxYEPxiohbV4QsA

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--



ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: get_available_slots(uuid, uuid, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date) RETURNS TABLE(slot_start time without time zone, slot_end time without time zone)
    LANGUAGE plpgsql
    AS $$
DECLARE
  v_duration   int;
  v_work_start time;
  v_work_end   time;
  v_gap_start  time;
  v_interval   interval;
  r            record;
  v_s          time;
BEGIN
  SELECT duration_minutes INTO v_duration
  FROM public.services WHERE id = p_service_id;

  IF v_duration IS NULL THEN RETURN; END IF;

  v_interval := (v_duration || ' minutes')::interval;

  -- Dentist works every day, just get their hours
  SELECT start_time, end_time INTO v_work_start, v_work_end
  FROM public.dentist_schedules
  WHERE dentist_id = p_dentist_id;

  IF v_work_start IS NULL THEN RETURN; END IF;

  v_gap_start := v_work_start;

  FOR r IN (
    SELECT start_time, end_time
    FROM public.appointments
    WHERE dentist_id       = p_dentist_id
      AND appointment_date = p_date
      AND status NOT IN ('cancelled')
      AND start_time IS NOT NULL
    ORDER BY start_time
  ) LOOP
    v_s := v_gap_start;
    WHILE v_s + v_interval <= r.start_time LOOP
      slot_start := v_s;
      slot_end   := v_s + v_interval;
      RETURN NEXT;
      v_s := v_s + v_interval;
    END LOOP;

    IF r.end_time > v_gap_start THEN
      v_gap_start := r.end_time;
    END IF;
  END LOOP;

  v_s := v_gap_start;
  WHILE v_s + v_interval <= v_work_end LOOP
    slot_start := v_s;
    slot_end   := v_s + v_interval;
    RETURN NEXT;
    v_s := v_s + v_interval;
  END LOOP;
END;
$$;


ALTER FUNCTION public.get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointment_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment_services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    appointment_id uuid,
    service_id uuid
);


ALTER TABLE public.appointment_services OWNER TO postgres;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid,
    dentist_id uuid,
    status text DEFAULT 'pending'::text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    appointment_date date,
    start_time time without time zone,
    end_time time without time zone,
    CONSTRAINT appointments_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'done'::text, 'cancelled'::text, 'expired'::text])))
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: concerns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.concerns (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.concerns OWNER TO postgres;

--
-- Name: dentist_schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentist_schedules (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    dentist_id uuid,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL
);


ALTER TABLE public.dentist_schedules OWNER TO postgres;

--
-- Name: dentists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    dentist_name text NOT NULL,
    specialty text,
    phone text,
    telegram text NOT NULL,
    background text,
    age integer,
    created_at timestamp with time zone DEFAULT now(),
    image_path text DEFAULT ''::text
);


ALTER TABLE public.dentists OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid,
    dentist_id uuid,
    appointment_id uuid,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    token_hash text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    sex text,
    date_of_birth date,
    address text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_banned boolean
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    role text NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    service_name text NOT NULL,
    description text,
    price numeric(10,2),
    duration_minutes integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    image_url text
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: appointment_services appointment_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: concerns concerns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.concerns
    ADD CONSTRAINT concerns_pkey PRIMARY KEY (id);


--
-- Name: dentist_schedules dentist_schedules_dentist_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentist_schedules
    ADD CONSTRAINT dentist_schedules_dentist_unique UNIQUE (dentist_id);


--
-- Name: dentist_schedules dentist_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentist_schedules
    ADD CONSTRAINT dentist_schedules_pkey PRIMARY KEY (id);


--
-- Name: dentists dentists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentists
    ADD CONSTRAINT dentists_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_token_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_token_hash_key UNIQUE (token_hash);


--
-- Name: patients patients_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_unique UNIQUE (email);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: appointment_services appointment_services_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;


--
-- Name: appointment_services appointment_services_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;


--
-- Name: appointments appointments_dentist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_dentist_id_fkey FOREIGN KEY (dentist_id) REFERENCES public.dentists(id) ON DELETE SET NULL;


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE SET NULL;


--
-- Name: dentist_schedules dentist_schedules_dentist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentist_schedules
    ADD CONSTRAINT dentist_schedules_dentist_id_fkey FOREIGN KEY (dentist_id) REFERENCES public.dentists(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_appointment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_dentist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_dentist_id_fkey FOREIGN KEY (dentist_id) REFERENCES public.dentists(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: patients patients_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: appointments patients cancel own appointments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients cancel own appointments" ON public.appointments FOR UPDATE USING ((auth.uid() = patient_id));


--
-- Name: appointments patients create appointments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients create appointments" ON public.appointments FOR INSERT WITH CHECK ((auth.uid() = patient_id));


--
-- Name: notifications patients update own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients update own notifications" ON public.notifications FOR UPDATE USING ((auth.uid() = patient_id));


--
-- Name: patients patients update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients update own profile" ON public.patients FOR UPDATE USING ((auth.uid() = id));


--
-- Name: appointments patients view own appointments; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients view own appointments" ON public.appointments FOR SELECT USING ((auth.uid() = patient_id));


--
-- Name: notifications patients view own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients view own notifications" ON public.notifications FOR SELECT USING ((auth.uid() = patient_id));


--
-- Name: patients patients view own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "patients view own profile" ON public.patients FOR SELECT USING ((auth.uid() = id));


--
-- Name: dentists public view dentists; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "public view dentists" ON public.dentists FOR SELECT USING (true);


--
-- Name: services public view services; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "public view services" ON public.services FOR SELECT USING (true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date) TO anon;
GRANT ALL ON FUNCTION public.get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date) TO authenticated;
GRANT ALL ON FUNCTION public.get_available_slots(p_dentist_id uuid, p_service_id uuid, p_date date) TO service_role;


--
-- Name: TABLE appointment_services; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.appointment_services TO anon;
GRANT ALL ON TABLE public.appointment_services TO authenticated;
GRANT ALL ON TABLE public.appointment_services TO service_role;


--
-- Name: TABLE appointments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.appointments TO anon;
GRANT ALL ON TABLE public.appointments TO authenticated;
GRANT ALL ON TABLE public.appointments TO service_role;


--
-- Name: TABLE concerns; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.concerns TO anon;
GRANT ALL ON TABLE public.concerns TO authenticated;
GRANT ALL ON TABLE public.concerns TO service_role;


--
-- Name: TABLE dentist_schedules; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dentist_schedules TO anon;
GRANT ALL ON TABLE public.dentist_schedules TO authenticated;
GRANT ALL ON TABLE public.dentist_schedules TO service_role;


--
-- Name: TABLE dentists; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dentists TO anon;
GRANT ALL ON TABLE public.dentists TO authenticated;
GRANT ALL ON TABLE public.dentists TO service_role;


--
-- Name: TABLE notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.notifications TO anon;
GRANT ALL ON TABLE public.notifications TO authenticated;
GRANT ALL ON TABLE public.notifications TO service_role;


--
-- Name: TABLE password_reset_tokens; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.password_reset_tokens TO anon;
GRANT ALL ON TABLE public.password_reset_tokens TO authenticated;
GRANT ALL ON TABLE public.password_reset_tokens TO service_role;


--
-- Name: TABLE patients; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.patients TO anon;
GRANT ALL ON TABLE public.patients TO authenticated;
GRANT ALL ON TABLE public.patients TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE services; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.services TO anon;
GRANT ALL ON TABLE public.services TO authenticated;
GRANT ALL ON TABLE public.services TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--

\unrestrict 6W43qGgm3NMxWbAbvKxPDRJmkPuRPtLhb8QdMq4uSP44WZUyGxYEPxiohbV4QsA

