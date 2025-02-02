use rusqlite::Connection;
use std::fs;
use tauri::api::path;

pub struct DatabaseManager {
    conn: Connection,
}

impl DatabaseManager {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        // Get the app data directory
        let app_dir = path::app_data_dir(&tauri::Config::default())
            .ok_or("Failed to get app data directory")?;

        // Create the directory if it doesn't exist
        fs::create_dir_all(&app_dir)?;

        // Create the database file path
        let db_path = app_dir.join("study_app.db");

        // Open connection
        let conn = Connection::open(db_path)?;

        // Initialize database tables
        Self::initialize_tables(&conn)?;

        Ok(Self { conn })
    }
    fn initialize_database() -> Result<()> {
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
    pub fn get_connection(&self) -> &Connection {
        &self.conn
    }
}

// State management for Tauri
pub struct AppState {
    db: DatabaseManager,
}

impl AppState {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self {
            db: DatabaseManager::new()?,
        })
    }
}
