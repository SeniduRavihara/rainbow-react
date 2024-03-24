import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormSuccessProps = {
  message: string | undefined;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return;
  }

  return (
    <div className="bg-blue-400/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-blue-400">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
export default FormSuccess;
