import React from "react";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store";
import { addEmployee } from "../../redux/reducers/employeesSlice";

const EmployeeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    mode: "onChange",
  });

  type FormValues = {
    // id: number,
    name: string;
    email: string;
    position: string;
    cadreLevel: string;
    basic: number;
    transport: number;
    overtime: number;
    housing: number;
    tax: number;
    pension: number;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   if (name === "earnings" || name === "deductions") {
  //     const category = e.target.getAttribute("data-category");
  //     const updatedCategory = {
  //       ...employeeData[name as keyof Employee],
  //       [category]: parseInt(value),
  //     };

  //     setEmployeeData((prevData) => ({
  //       ...prevData,
  //       [name]: updatedCategory,
  //     }));
  //   } else {
  //     setEmployeeData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(createEmployeeAsync(employeeData));
  //   // Reset form data
  //   setEmployeeData({
  //     id: 0,
  //     name: "",
  //     position: "",
  //     cadreLevel: "",
  //     earnings: {
  //       basic: 0,
  //       transport: 0,
  //     },
  //     deductions: {
  //       tax: 0,
  //       pension: 0,
  //     },
  //   });
  // };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    dispatch(
      addEmployee({
        // employee: {
          id: Date.now(),
          name: data.name,
          email: data.email,
          position: data.position,
          cadreLevel: data.cadreLevel,
          isAdmin: false,
          earnings: {
            basic: data.basic,
            transport: data.transport,
            overtime: data.overtime,
            housing: data.housing
          },
          deductions: {
            tax: data.tax,
            pension: data.pension,
          // },
        },
      })
    );
    reset();
  };

  return (
    <section className="employee mx-4 mb-12">
      <h2 className="bg-very-light-gray font-bold p-4 py-12 w-fit">
        Add Employee
      </h2>
      <form
        className="bg-white flex flex-col border border-gray rounded-md flex-1 h-fit w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          {/* EMPLOYEE DETAILS */}
          <div className="">
            <h2 className="bg-zinc-300 text-white font-bold p-4 w-full">
              Employee Details
            </h2>
            <div className="p-4 pb-0">
              <div className="mb-8">
                <label htmlFor="name" className="block mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  // name="name"
                  type="text"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Full Name"
                  {...register("name")}
                  required
                />
              </div>

              <div className="mb-8">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  // name="email"
                  type="email"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Email"
                  {...register("email")}
                  required
                />
              </div>
            </div>

            {/* POSITIION*/}
            <div className="px-4 mb-8">
              <label htmlFor="position" className="block mb-2">
                Position
              </label>
              <select
                id="position"
                // name="position"
                className="form-select form-select-lg !shadow-none bg-clip-padding bg-no-repeat appearance-none px-3 py-2 w-full h-10 border border-gray rounded-md transition ease-in-out text-dark-gray bg-white cursor-pointer focus:text-dark-gray focus:border-cyan-500 focus:outline-none"
                aria-label="position"
                {...register("position")}
                required
                // onChange={(e) => dispatch(setposition(e.target.value))}
              >
                <option value="" hidden>
                  Select a postition
                </option>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="graphic-designer">Graphic Designer</option>
                <option value="accountant">Accountant</option>
                <option value="project-manager">Project Manager</option>
                <option value="hr-manager">HR Manager</option>
                <option value="data-analyst">Data Analyst</option>
              </select>
            </div>

            {/* CADRE LEVEL */}
            <div className="px-4 mb-8">
              <label htmlFor="position" className="block mb-2">
                Cadre Level
              </label>
              <select
                id="cadreLevel"
                // name="cadre"
                className="form-select form-select-lg !shadow-none bg-clip-padding bg-no-repeat appearance-none px-3 py-2 w-full h-10 border border-gray rounded-md transition ease-in-out text-dark-gray bg-white cursor-pointer focus:text-dark-gray focus:border-cyan-500 focus:outline-none"
                aria-label="cadreLevel"
                {...register("cadreLevel")}
                required

                // onChange={(e) => dispatch(setposition(e.target.value))}
              >
                <option value="" hidden>
                  Select a cadre level
                </option>
                <option value="entry">Entry Level</option>
                <option value="junior">Junior Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="associate">Associate Level</option>
                <option value="executive">Executive Level</option>
                <option value="director">Director Level</option>
                <option value="consultant">Consultant Level</option>
              </select>
            </div>
          </div>

          {/* EARNINGS */}
          <div className="">
            <h2 className="bg-zinc-300 text-white font-bold p-4 w-full">
              Earnings
            </h2>
            <div className="p-4 pb-0">
              <div className="mb-8">
                <label htmlFor="basic" className="block mb-2">
                  Basic Earnings
                </label>
                <input
                  id="basic"
                  // name="basic"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Basic Earnings"
                  {...register("basic")}
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="transport" className="block mb-2">
                  Transport
                </label>
                <input
                  id="transport"
                  // name="transport"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Transport"
                  {...register("transport")}
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="overtime" className="block mb-2">
                  Over time
                </label>
                <input
                  id="overtime"
                  // name="overtime"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Over time"
                  {...register("overtime")}
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="housing" className="block mb-2">
                  Housing
                </label>
                <input
                  id="housing"
                  // name="housing"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Housing"
                  {...register("housing")}
                  required
                />
              </div>
            </div>
          </div>

          {/* DEDUCTIONS */}
          <div className="">
            <h2 className="bg-zinc-300 text-white font-bold p-4 w-full">
              Deduction
            </h2>
            <div className="p-4 pb-0">
              <div className="mb-8">
                <label htmlFor="pension" className="block mb-2">
                  Pension
                </label>
                <input
                  id="pension"
                  // name="pension"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Pension"
                  {...register("pension")}
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="tax" className="block mb-2">
                  Tax
                </label>
                <input
                  id="tax"
                  // name="tax"
                  type="number"
                  className="h-10 p-3 w-full border border-gray placeholder-gray focus:outline-none focus:border-cyan-500 rounded-md"
                  placeholder="Tax"
                  {...register("tax")}
                  required
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="p-4">
            <button
              type="submit"
              className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
