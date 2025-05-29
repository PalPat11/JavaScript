import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run()



export const getAllBlogs = () => db.prepare(`SELECT * FROM blogs`).all()
export const getBlogById = (id) => db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id)
export const createBlog = (author, title, category, content) => 
    db.prepare(`INSERT INTO blogs (author, title, category, content) VALUES (?, ?, ?, ?)`).run(author, title, category, content)
export const updateBlog = (id, author, title, category, content) => 
    db.prepare(`UPDATE blogs SET author = ?, title = ?, category = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .run(author, title, category, content, id)
export const deleteBlog = (id) => db.prepare(`DELETE FROM blogs WHERE id = ?`).run(id)


// for (const user of users) createUser(user.name, user.age)