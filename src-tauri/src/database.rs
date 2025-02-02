use rusqlite::{Connection, Result};

pub fn initialize_database() -> Result<()> {
    let conn = Connection::open("study_app.db")?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS study_plans (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY,
            plan_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (plan_id) REFERENCES study_plans(id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS sections (
            id INTEGER PRIMARY KEY,
            subject_id INTEGER,
            title TEXT NOT NULL,
            description TEXT,
            order_index INTEGER,
            FOREIGN KEY (subject_id) REFERENCES subjects(id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS subsections (
            id INTEGER PRIMARY KEY,
            section_id INTEGER,
            title TEXT NOT NULL,
            content TEXT,
            order_index INTEGER,
            FOREIGN KEY (section_id) REFERENCES sections(id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            subsection_id INTEGER,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            due_date TIMESTAMP,
            FOREIGN KEY (subsection_id) REFERENCES subsections(id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY,
            subsection_id INTEGER,
            title TEXT NOT NULL,
            question TEXT NOT NULL,
            solution TEXT,
            notes TEXT,
            FOREIGN KEY (subsection_id) REFERENCES subsections(id)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            color TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        [],
    )?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS plan_tags (
            plan_id INTEGER,
            tag_id INTEGER,
            PRIMARY KEY (plan_id, tag_id),
            FOREIGN KEY (plan_id) REFERENCES study_plans(id),
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        )",
        [],
    )?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS study_sessions (
            id INTEGER PRIMARY KEY,
            plan_id INTEGER,
            subject_id INTEGER,
            section_id INTEGER,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP,
            duration_minutes INTEGER,
            FOREIGN KEY (plan_id) REFERENCES study_plans(id),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (section_id) REFERENCES sections(id)
        )",
        [],
    )?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS progress_tracking (
            id INTEGER PRIMARY KEY,
            plan_id INTEGER,
            subject_id INTEGER,
            section_id INTEGER,
            subsection_id INTEGER,
            status TEXT CHECK(status IN ('not_started', 'in_progress', 'completed')) NOT NULL,
            completion_percentage INTEGER DEFAULT 0,
            last_studied_at TIMESTAMP,
            FOREIGN KEY (plan_id) REFERENCES study_plans(id),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (section_id) REFERENCES sections(id),
            FOREIGN KEY (subsection_id) REFERENCES subsections(id)
        )",
        [],
    )?;

    Ok(())
}