import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
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
  age: number;
  birthDate: Date;
  phoneNumbers: string[];
  phnumbers: {
    number: string;
  }[];
};
export function YoutubeForm() {
  renderCount++;

  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      age: 0,
      birthDate: new Date(),
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phnumbers: [{ number: "" }],
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
  const watchValue = watch();

  const { fields, append, remove } = useFieldArray({
    name: "phnumbers",
    control: control,
  });

  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  console.log({ touchedFields, dirtyFields, isDirty, isValid });
  console.log({ isSubmitting, isSubmitSuccessful, isSubmitted, submitCount });

  return (
    <div className="container flex flex-col gap-10 items-center">
      <h1 className="text-lg">YouTube Form --- render ({renderCount})</h1>
      <span>{JSON.stringify(watchValue)}</span>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
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
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <label
            htmlFor="birthDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of birth
          </label>
          <input
            type="date"
            id="birthDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("birthDate", {
              valueAsDate: true,
            })}
          />
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
            {...register("social.twitter", {
              disabled: watch("channel") === "",
            })}
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

        <div>
          <label htmlFor="">List of phone numbers</label>
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-10"
            onClick={() => append({ number: "" })}
          >
            Add phone Number
          </button>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex gap-10">
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register(`phnumbers.${index}.number`)}
                  />
                  {index > 0 ? (
                    <button
                      className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
                      onClick={() => remove(index)}
                    >
                      Remove phone Number
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => reset()}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => console.log(getValues())}
          >
            GetValues
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => {
              setValue("username", "Codevolution", {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            SetValue
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            disabled={!isDirty || !isValid}
          >
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}
