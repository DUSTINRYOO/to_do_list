import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryNameState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const categoryName = useRecoilValue(categoryNameState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setTodos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categoryName?.map((name) => (
        <div key={name.id}>
          {category !== name.categoryName && (
            <button name={name.categoryName} onClick={onClick}>
              {name.categoryName}
            </button>
          )}
        </div>
      ))}
    </li>
  );
}

export default ToDo;
