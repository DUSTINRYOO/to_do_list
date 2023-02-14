import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryNameState, categoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categoryName = useRecoilValue(categoryNameState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categoryName?.map((name) => (
          <option key={name.id} value={name.categoryName}>
            {name.categoryName}
          </option>
        ))}
      </select>
      <CreateCategory />
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo}></ToDo>
      ))}
    </div>
  );
}

export default ToDoList;
