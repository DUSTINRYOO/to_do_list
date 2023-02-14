import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IToDo {
  text: string;
  category: string;
  id: number;
}

export interface CategoryName {
  id: number;
  categoryName: string;
}

export const categoryNameState = atom<CategoryName[]>({
  key: "categoryName",
  default: [
    { id: 1, categoryName: "To Do" },
    { id: 2, categoryName: "Doing" },
    { id: 3, categoryName: "Done" },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: "To Do",
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
