import sqlite3
from werkzeug.security import generate_password_hash

def db_generation():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    ''')
    generate_test_data()
    conn.commit()
    conn.close()

def generate_test_data():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    test_users = [
        ('usuario1', 'test1@example.com', generate_password_hash('password123')),
        ('usuario2', 'test2@example.com', generate_password_hash('otra_pass_segura')),
        ('admin', 'admin@example.com', generate_password_hash('admin_pass')),
        ('guest', 'guest@example.com', generate_password_hash('guest'))
    ]

    try:
        cursor.executemany("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", test_users)
        conn.commit()
    except sqlite3.IntegrityError:
        pass
    finally:
        conn.close()


def show_all_users():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    if not users:
        print("User table is empty.")
        return

    headers = users[0].keys()
    header_line = " | ".join([f"{header:<20}" for header in headers])
    print("-" * (len(header_line) + 4))
    print(f"| {header_line} |")
    print("-" * (len(header_line) + 4))

    for user in users:
        row_values = [f"{str(user[header]):<20}" for header in headers]
        row_line = " | ".join(row_values)
        print(f"| {row_line} |")
    print("-" * (len(header_line) + 4))

    conn.close()

show_all_users()

