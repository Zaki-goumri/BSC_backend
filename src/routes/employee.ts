import { Router } from "express";
import { createEmployee, getAllEmployees, getEmployeeById } from "../services/employees";


export const EmployeeRouter=Router()
EmployeeRouter.get('/',async(req,res)=>{
  const output=await getAllEmployees();
  res.status(output.Status).send(output.data);
})
EmployeeRouter.get('/:id',async(req,res)=>{
  const id=req.params.id;
  const output=await getEmployeeById(id);
  res.status(output.Status).send(output.data);
})

EmployeeRouter.post('/',async(req,res)=>{
  const employee=req.body;
  const output=await createEmployee(employee);
  res.status(output.Status).send(output.data);
})
EmployeeRouter.put('/:id',async(req,res)=>{
  const id=req.params.id;
  const employee=req.body;
  const output=await createEmployee(employee);
  res.status(output.Status).send(output.data);
})
EmployeeRouter.delete('/:id',async(req,res)=>{
  const id=req.params.id;
  const output=await getEmployeeById(id);
  res.status(output.Status).send(output.data);
})
