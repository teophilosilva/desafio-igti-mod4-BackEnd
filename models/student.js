import mongoose from "mongoose";

//Capturar data atual
const date = new Date();

const Student = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 50,
    minlength: 5,
    validate(name) {
      if (name.lenght < 5)
        throw new Error("Nome não pode conter menos de 5 caracteres");
      if (name === Number) throw new Error("Nome não pode ser Números");
    },
  },
  subject: {
    type: String,
    require: true,
    maxlength: 20,
    minlength: 5,
    validate(subject) {
      if (subject.lenght < 5)
        throw new Error("Disciplina não pode conter menos de 5 caracteres");
      if (subject === Number) throw new Error("Disciplina não pode ser Números");
    },
  },
  type: {
    type: String,
    require: true,
    maxlength: 20,
    minlength: 5,
    validate(type) {
      if (type.lenght < 5)
        throw new Error("Tipo não pode conter menos de 5 caracteres");
      if (type === Number) throw new Error("Tipo não pode ser Números");
    },
  },
  value: {
    type: Number,
    require: true,
    maxlength: 1,
    minlength: 30,
    validate(value) {
      if (value.lenght < 1) throw new Error("Nota não pode ser menor que 0");
      if (value === String) throw new Error("Nota não pode ser String");
    },
  },
  lastModified: {
    type: Date,
    default: Date,
  },
});

mongoose.model("student", Student, "student");

const conta = mongoose.model("student");

export default conta;
