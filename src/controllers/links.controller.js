import pool from '../database.js';

export const renderLinks = (req, res) => {
    res.render("links/add");
}

export const renderAdd = async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
      title,
      url,
      description,
      user_id: req.user.id
    };
    await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "Link saved successfully");
    res.redirect("/links");
}

export const renderList = async (req, res) => {
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?;", [req.user.id]);
    res.render("links/list", { links });
}

export const renderEdit = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query("SELECT * FROM links WHERE ID = ?", [id]);
    res.render("links/edit", { link: links[0] });
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
      title,
      url,
      description,
    };
    await pool.query("UPDATE links set ? WHERE ID = ?", [newLink, id]);
    req.flash("success", "Link updated successfully");
    res.redirect("/links");
}

export const deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);
    req.flash("success", "Link removed successfully");
    res.redirect("/links");
}