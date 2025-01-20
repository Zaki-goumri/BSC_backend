import StatusCode from "../enums/statusCode.enum";
import { employeModel, Iemploye } from "../models/employe";

const Employee=employeModel;
export const getAllEmployees = async () => {
  try{

  const employees= await Employee.find();
  return {
    data:employees,
    Status:StatusCode.OK}
  }catch(e){
    return {
      data:e,
      Status:StatusCode.INTERNAL_SERVER_ERROR
    }

  }
};

export const getEmployeeById = async (id:string) => {
  const employe=await Employee.findById(id);
  return {
    data:employe,
    Status:StatusCode.OK
  }
};

export const createEmployee = async (employeeData:Iemploye) => {
  const employee = new Employee(employeeData);
  const newEmployee= await employee.save();
  return {
    data:newEmployee,
    Status:StatusCode.CREATED
  }

};

export const updateEmployee = async (id:string, updatedEmployeeData:Iemploye) => {
 try {
  const updated= await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
  return {
    data:updated,
    Status:StatusCode.OK
  }

 } catch (error) {
  
  return {
    data:error,
    Status:StatusCode.INTERNAL_SERVER_ERROR}
 }
};

export const deleteEmployee = async (id:string) => {
try {

   await Employee.findByIdAndDelete(id);
   const employees = await Employee.find();
   return {
    data:employees,
    Status:StatusCode.OK } 
} catch (error) {
  return {
    data:error,
    Status:StatusCode.INTERNAL_SERVER_ERROR
  }
}

};

