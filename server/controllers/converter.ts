import { Request, Response } from 'express';

import database from '../utils/database';
import { Controller } from './abstract';

export default class Converter extends Controller {
  static async getConverter(
    request: Request,
    response: Response,
  ): Promise<any> {
    try {
      const result = await database
        .getClient()
        .query(Converter.queryBuilder.getCollection('converter'));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async addCurrency(request: Request, response: Response): Promise<any> {
    try {
      const { currency } = request.body;

      if (!currency) throw new Error('Missing currency');

      const result = await database
        .getClient()
        .query(Converter.queryBuilder.create('converter', { currency }));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }

  static async deleteCurrency(
    request: Request,
    response: Response,
  ): Promise<any> {
    try {
      const { id } = request.params;

      if (!id) throw new Error('Missing id');

      const result = await database
        .getClient()
        .query(Converter.queryBuilder.delete(id));

      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
