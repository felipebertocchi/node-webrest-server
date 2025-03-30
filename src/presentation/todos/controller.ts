import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/DTOs';

export class TodosController {

  //* DI
  constructor() { }


  public getTodos = (req: Request, res: Response) => {
    prisma.todo.findMany()
      .then(todos => res.json(todos))
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          return res.status(500).json({ error: err.meta?.cause || err.message })
        }
        return res.status(500).json({ error: err.message });
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    prisma.todo.findUnique({
      where: { id: id }
    }).then(todo => res.json(todo))
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          return res.status(500).json({ error: err.meta?.cause || err.message })
        }
        return res.status(500).json({ error: err.message });
      });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error || !createTodoDto) {
      return res.status(400).json({ error });
    }

    prisma.todo.create({
      data: createTodoDto
    })
      .then(todo => res.json(todo))
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          return res.status(500).json({ error: err.meta?.cause || err.message })
        }
        return res.status(500).json({ error: err.message });
      });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error || !updateTodoDto) {
      return res.status(400).json({ error });
    }

    prisma.todo.update({
      where: { id: id },
      data: updateTodoDto.values
    })
      .then(todo => res.json(todo))
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          return res.status(500).json({ error: err.meta?.cause || err.message })
        }
        return res.status(500).json({ error: err.message });
      });
  }


  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    prisma.todo.delete({
      where: { id: id }
    })
      .then(() => res.status(202).json({ message: "ToDo succesfully deleted" }))
      .catch(err => {
        if (err instanceof PrismaClientKnownRequestError) {
          return res.status(500).json({ error: err.meta?.cause || err.message })
        }
        return res.status(500).json({ error: err.message });
      });
  }
}
