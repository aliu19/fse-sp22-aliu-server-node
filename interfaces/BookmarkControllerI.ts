import {Request, Response} from "express";

export default interface BookmarkControllerI {
  userBookmarksTuit (req: Request, res: Response): void;
  userUnBookmarksTuit (req: Request, res: Response): void;
  findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
};
