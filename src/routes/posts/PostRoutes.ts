import { Request, Response, Router } from 'express';
import * as _ from 'lodash';
import Post from '../../models/posts/Post';
import Crud from '../../crud/Crud';

export class PostRoutes extends Crud {

  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  // Get all of the posts in the database
  public fetchAllData(req: Request, res: Response): void {

    super.findAll(Post, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });

  }

  // Get a single post by params of 'slug'
  /*** 
   * To find by id send { _id: id } insted of { slug }
   * ***/
  public fetchSingleData(req: Request, res: Response): void {
    const { slug } = req.params;
    super.findOne(Post, { slug }, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  // Create a new post
  public create(req: Request, res: Response): void {
    const {
      title,
      slug,
      content,
      featuredImage,
      category,
      published,
    } = req.body;

    const post = new Post({
      title,
      slug,
      content,
      featuredImage,
      category,
      published,
    });

    super.createOne(post, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  // Update post by params of 'slug'
  public update(req: Request, res: Response): void {
    const { slug } = req.body;

    super.updateOne(Post, { slug }, req.body, (data, errors) => {
      if (_.isEmpty(errors)){
        res.status(200).json({ data });
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  // Delete post by params of 'slug'
  /*** 
   * To delete by id send { _id: id } insted of { slug }
   * ***/
  public delete(req: Request, res: Response): void {
    const { slug } = req.params;
    super.deleteOne(Post, { slug }, (errors) => {
      if (_.isEmpty(errors)){
        res.status(204).end();
      } else {
        res.status(500).json({ errors });
      }
    });
  }

  public routes() {
    this.router.get('/', this.fetchAllData);
    this.router.get('/:slug', this.fetchSingleData);
    this.router.post('/', this.create);
    this.router.put('/:slug', this.update);
    this.router.delete('/:slug', this.delete);
  }
}

const postRoutes = new PostRoutes();
postRoutes.routes();

export default postRoutes.router;
