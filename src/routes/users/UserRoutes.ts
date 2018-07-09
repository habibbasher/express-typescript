import { Request, Response, Router } from 'express';
import * as _ from 'lodash';
import User from '../../models/users/User';
import Crud from '../../crud/Crud';

export class UserRoutes extends Crud{
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  // Get all of the user in the database
  public fetchAllData(req: Request, res: Response): void {
    super.findAll(User, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  // Get a single user by params of 'username'
  /*** 
   * To delete by id send { _id: id } insted of { username }
   ****/
  public fetchSingleData(req: Request, res: Response): void {
    const { username } = req.params;
    super.findOne(User, { username }, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }
  // Create a new user
  public create(req: Request, res: Response): void {
    const { firstName, lastName, username, email, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    super.createOne(user, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }
  // Update user by params of 'username'
  public update(req: Request, res: Response): void {
    const { username } = req.params;
    super.updateOne(User, { username }, req.body, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }
  // Delete user by params of 'username'
  /*** 
   * To delete by id send { _id: id } insted of { username }
   ****/
  public delete(req: Request, res: Response): void {
    const { username } = req.params;
    super.deleteOne(User, { username }, (errors) => {
      if (_.isEmpty(errors)){
        res.status(204).end();
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  // Set up our routes
  public routes() {
    this.router.get('/', this.fetchAllData);
    this.router.get('/:username', this.fetchSingleData);
    this.router.post('/', this.create);
    this.router.put('/:username', this.update);
    this.router.delete('/:username', this.delete);
  }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;
