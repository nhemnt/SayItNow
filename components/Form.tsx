import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generate } from '../lib/helper';

const schema = z.object({
  thought: z
    .string()
    .min(60, "Your thought must be at least 60 characters long")
    .nonempty("Please enter your thought"),
});

type Schema = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(async (data: Schema) => {
    try{
      await generate(data.thought)
      reset();
      toast(
        "Your thoughts have been sent to our thought police for review. Hang tight, we'll display it soon once it passes our rigorous approval process!"
      );
    }catch(err){
      toast(
        "Oh no! It looks like our thought police are currently napping on the job. Please try again later when they wake up from their beauty sleep."
      );
    }
    
  });

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label
        htmlFor="thought"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your thought
      </label>
      <textarea
        {...register("thought")}
        id="thought"
        rows={7}
        className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Speak your mind and share what's been on your heart. Is there something you've been wanting to say but haven't had the chance to? Is there a message you wish you had conveyed but haven't been able to? Don't hold back, use this space to express yourself and share your thoughts anonymously."
        defaultValue={""}
      />
      {errors?.thought && <p className='text-red-700'>{errors.thought.message}</p>}

      <button
        type="submit"
        className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-6 mt-4 hover:bg-black/80 w-80"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
