import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};
export function YoutubeForm() {
  const { register, control, handleSubmit } = useForm<FormValues>();
  renderCount++;

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <div>
      <h1>YouTube Form --- render ({renderCount})</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button className="border ">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
