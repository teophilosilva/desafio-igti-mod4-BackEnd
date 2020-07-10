import express from "express";
import { logger } from '../config/logger.js';
import mongoose from "mongoose";
import { db } from "../models/index.js";
import myModel from "./../models/student.js";

const create = async (req, res) => {
  try {
    // Pegar o BODY
    const data = await new myModel(req.body);  

    //Inserir no DB
    if (req.body) {
      
      await data.save();
    }
    res.send(req.body);
    //logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  //condicao para o filtro no findAll
  var condition = req.params.name;
  const result = await myModel.find(
    { name: { $regex: new RegExp(condition), $options: "i" } },
    {}
  );

  try {
    res.send(result);
    //logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    const result = await myModel.find({_id:id});
    res.send(result);    
    //logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const id = req.params.id;

  try {

    const update = req.body;

    await myModel.updateOne({_id:id},update);


    res.send({ message: "Grade atualizado com sucesso" });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id + error});
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await myModel.findByIdAndDelete({_id:id});
    res.send({ message: "Grade excluida com sucesso" });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    await myModel.deleteMany();
    res.send({
      message: `Grades excluidos`,
    });
    //logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
