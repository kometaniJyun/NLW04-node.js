import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerControlller {
  //http://localhost:3333/answers/1?u=9871d7d7-29a9-4347-904a-61a848aa5d3a
  /**
     * 
      Route Params => Parametros que compõe a rota /route/value
      routes.get("/answers/:value")

      Query Params => Busca, Paginação, não obrigatórios
      ?
      key=value
     *
     */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
      /*
      return response.status(400).json({
        error: "Survey User does not exists!",
      });
      */
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswerControlller };
