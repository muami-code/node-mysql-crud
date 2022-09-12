import { Router } from "express";
const indexRoutes = Router();

indexRoutes.get('/', (req, res) => {
    res.render('index')
});

export default indexRoutes;