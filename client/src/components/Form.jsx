import react from "react";
import { useForm } from "react-hook-form";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const Form = () => {
  const { register, handleSubmit, watch, setValue, formState, formState: { errors } } = useForm({
    mode: "onTouched",
  });
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;


  const onSubmit = async (data) => {
    await wait(2000);

  setValue('welcomeMessage', `Bienvenue, ${data.firstname} ${data.lastname} !`);
  };

  const welcomeMessage = watch('welcomeMessage', '');

  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Mon formulaire hook form</h1>
{isSubmitSuccessful && <div>Merci pour tout!</div>}
        <label htmlFor="firstname">Firstname</label>
        <input
          className="border form-control"
          type="text"
          id="firstname"
          name="firstname"
          {...register("firstname", { required: 'need your firstname', minLength: {value: 3, message: '+ de carac!'} })}
        />
        {errors.firstname && ( <span>{errors.firstname.message}</span>)}

        <label htmlFor="lastname">Lastname</label>
        <input
          className="border form-control"
          type="text"
          id="lastname"
          name="lastname"
          {...register("lastname", { required: 'need your lastname', minLength: { value: 3, message: "need more cara!"} })}
        />
                {errors.lastname && ( <span>{errors.lastname.message}</span>)}
<p>{welcomeMessage}</p>
        <button disabled={isSubmitting} type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
