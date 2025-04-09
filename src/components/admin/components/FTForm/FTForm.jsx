import { FormProvider, useForm } from "react-hook-form";

const FTForm = ({ children, onSubmit, resolver }) => {
  const formConfig = resolver ? { resolver } : {};
  const methods = useForm(formConfig);
  const { handleSubmit } = methods;
  const submit = (data) => {
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="relative">
        {children}
      </form>
    </FormProvider>
  );
};

export default FTForm;
