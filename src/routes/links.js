import { Router } from 'express';
const linksRouter = Router();

import { 
  deleteLink,
  postEdit,
  renderAdd, 
  renderEdit, 
  renderLinks, 
  renderList 
} from '../controllers/links.controller.js';

import { isLoggedIn } from "../helpers/auth.js";

linksRouter.get("/add", isLoggedIn, renderLinks);

linksRouter.post("/add", isLoggedIn, renderAdd);

linksRouter.get("/", isLoggedIn, renderList);

linksRouter.get("/edit/:id", isLoggedIn, renderEdit);

linksRouter.post("/edit/:id", isLoggedIn, postEdit);

linksRouter.get("/delete/:id", isLoggedIn, deleteLink);

export default linksRouter;
