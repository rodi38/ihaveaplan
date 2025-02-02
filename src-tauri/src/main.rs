// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use rusqlite::{Connection, params};

#[derive(Debug, Serialize, Deserialize)]
struct StudyPlan {
    id: Option<i64>,
    title: String,
    description: Option<String>,
    created_at: Option<String>,
    updated_at: Option<String>,
}

#[tauri::command]
fn create_study_plan(title: String, description: Option<String>) -> Result<StudyPlan, String> {
    let conn = Connection::open("study_app.db").map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare(
        "INSERT INTO study_plans (title, description) VALUES (?1, ?2) RETURNING *"
    ).map_err(|e| e.to_string())?;
    
    let plan = stmt.query_row(params![title, description], |row| {
        Ok(StudyPlan {
            id: Some(row.get(0)?),
            title: row.get(1)?,
            description: row.get(2)?,
            created_at: row.get(3)?,
            updated_at: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;
    
    Ok(plan)
}

#[tauri::command]
fn get_study_plans() -> Result<Vec<StudyPlan>, String> {
    let conn = Connection::open("study_app.db").map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM study_plans ORDER BY created_at DESC").map_err(|e| e.to_string())?;
    
    let plans = stmt.query_map([], |row| {
        Ok(StudyPlan {
            id: Some(row.get(0)?),
            title: row.get(1)?,
            description: row.get(2)?,
            created_at: row.get(3)?,
            updated_at: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;
    
    let result: Result<Vec<_>, _> = plans.collect();
    result.map_err(|e| e.to_string())
}

#[tauri::command]
fn update_study_plan(id: i64, title: String, description: Option<String>) -> Result<StudyPlan, String> {
    let conn = Connection::open("study_app.db").map_err(|e| e.to_string())?;
    
    conn.execute(
        "UPDATE study_plans SET title = ?1, description = ?2, updated_at = CURRENT_TIMESTAMP WHERE id = ?3",
        params![title, description, id],
    ).map_err(|e| e.to_string())?;
    
    let plan = conn.query_row(
        "SELECT * FROM study_plans WHERE id = ?1",
        params![id],
        |row| {
            Ok(StudyPlan {
                id: Some(row.get(0)?),
                title: row.get(1)?,
                description: row.get(2)?,
                created_at: row.get(3)?,
                updated_at: row.get(4)?,
            })
        },
    ).map_err(|e| e.to_string())?;
    
    Ok(plan)
}

#[tauri::command]
fn delete_study_plan(id: i64) -> Result<(), String> {
    let conn = Connection::open("study_app.db").map_err(|e| e.to_string())?;
    
    conn.execute(
        "DELETE FROM study_plans WHERE id = ?1",
        params![id],
    ).map_err(|e| e.to_string())?;
    
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_study_plan,
            get_study_plans,
            update_study_plan,
            delete_study_plan
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}