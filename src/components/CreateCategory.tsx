import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryNameState, categoryState, toDoState } from "../atoms";

interface IForm {
  categoryName: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategoryName = useSetRecoilState(categoryNameState);
  const onSubmit = ({ categoryName }: IForm) => {
    setCategoryName((oldCategoryName) => {
      console.log([...oldCategoryName]);
      return [
        ...oldCategoryName,
        { id: oldCategoryName.length + 1, categoryName },
      ];
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("categoryName", {
          required: "Please write",
        })}
        placeholder="New Category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
