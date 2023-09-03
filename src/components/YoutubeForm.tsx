import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};
export function YoutubeForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
    //! for Async Default data
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: data.username,
    //     email: data.email,
    //     channel: "10",
    //   };
    // },
  });
  renderCount++;

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <div className="container flex flex-col gap-10 items-center">
      <h1 className="text-lg">YouTube Form --- render ({renderCount})</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-10"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.username?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
              validate: {
                isAdmin: (fieldValue) =>
                  fieldValue !== "admin@admin.com" ||
                  "Enter a different email address",
                notBlackListed: (fieldValue) =>
                  !fieldValue.endsWith("baddomaine.com") ||
                  "this domain is not supported",
              },
            })}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
        <div>
          <label
            htmlFor="channel"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Channel
          </label>
          <input
            type="text"
            id="channel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is Required",
              },
              validate: (fieldValue) =>
                Number(fieldValue) >= 1 || "Channel should be more than 1",
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.channel?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="twitter"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("social.twitter")}
          />
        </div>
        <div>
          <label
            htmlFor="facebook"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            facebook
          </label>
          <input
            type="text"
            id="facebook"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("social.facebook")}
          />
        </div>
        <div>
          <label
            htmlFor="primary-phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            primary phone
          </label>
          <input
            type="text"
            id="primary-phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div>
          <label
            htmlFor="secondary-phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            secondary phone
          </label>
          <input
            type="text"
            id="secondary-phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("phoneNumbers.1")}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
