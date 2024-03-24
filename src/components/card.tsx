import Image from "next/image";

const card = ({ label }: { label: string }) => {
  return (
    <div className="w-40 h-40 flex items-center justify-center">
      <Image src="" alt="" width={10} height={10} />
      <p>{label}</p>
    </div>
  );
};
export default card;
