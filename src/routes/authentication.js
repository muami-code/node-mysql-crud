import { Router } from 'express';
const authRouter = Router();

import { 
  isLoggedIn, 
  isNotLoggedIn 
} from '../helpers/auth.js';

import { 
  authLocal, 
  authPost, 
  authSignin, 
  authSignup, 
  renderLogout, 
  renderProfile 
} from '../controllers/auth.controller.js';

authRouter.get("/signup", isNotLoggedIn, authSignup);

authRouter.post("/signup", isNotLoggedIn, authLocal);

authRouter.get("/signin", isNotLoggedIn, authSignin);

authRouter.post("/signin", isNotLoggedIn, authPost);

authRouter.get("/profile", isLoggedIn, renderProfile);

authRouter.get("/logout", isLoggedIn, renderLogout);

export default authRouter;