/*
  # PetitsSoins — Guide Pédiatrique de Premiers Secours

  ## Tables créées

  ### 1. first_aid_entries
  Fiches de gestes d'urgence (étouffement, brûlures, chutes, intoxications, etc.)
  - id, title, category, age_range[], steps[], pharmacist_note, illustration_color,
    illustration_icon, has_emergency_link, sources[], severity, created_at

  ### 2. medications
  Médicaments et suppléments pédiatriques avec badges et dosages
  - id, name, age_range[], symptoms[], description, badge, forbidden_age,
    administration, conservation, dosage, sources[], created_at

  ### 3. articles
  Articles de fond vérifiés par des professionnels de santé
  - id, title, excerpt, content, author, category, read_time, image_url,
    published_at, created_at

  ### 4. quiz_questions
  Questions interactives pour le quiz "Réflexe Parent"
  - id, question, scenario, options[], correct_answer, explanation, category, created_at

  ## Sécurité
  - RLS activé sur toutes les tables
  - Lecture publique (contenu éducatif public)
  - Écriture réservée aux utilisateurs authentifiés (admin)
*/

-- First Aid Entries
CREATE TABLE IF NOT EXISTS first_aid_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  age_range text[] NOT NULL DEFAULT '{}',
  steps text[] NOT NULL DEFAULT '{}',
  pharmacist_note text NOT NULL DEFAULT '',
  illustration_color text NOT NULL DEFAULT '#cfe9f9',
  illustration_icon text NOT NULL DEFAULT '🩹',
  has_emergency_link boolean NOT NULL DEFAULT false,
  sources text[] NOT NULL DEFAULT '{}',
  severity text NOT NULL DEFAULT 'medium',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE first_aid_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read first aid entries"
  ON first_aid_entries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert first aid entries"
  ON first_aid_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update first aid entries"
  ON first_aid_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete first aid entries"
  ON first_aid_entries FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Medications
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  age_range text[] NOT NULL DEFAULT '{}',
  symptoms text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  badge text NOT NULL DEFAULT 'attention',
  forbidden_age text,
  administration text NOT NULL DEFAULT '',
  conservation text NOT NULL DEFAULT '',
  dosage text,
  sources text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read medications"
  ON medications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert medications"
  ON medications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update medications"
  ON medications FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete medications"
  ON medications FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  read_time integer NOT NULL DEFAULT 5,
  image_url text NOT NULL DEFAULT '',
  published_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL DEFAULT '',
  scenario text,
  options text[] NOT NULL DEFAULT '{}',
  correct_answer integer NOT NULL DEFAULT 0,
  explanation text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read quiz questions"
  ON quiz_questions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quiz questions"
  ON quiz_questions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update quiz questions"
  ON quiz_questions FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete quiz questions"
  ON quiz_questions FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
