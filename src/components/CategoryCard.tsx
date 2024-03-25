const CategoryCard = ({ label, icon }: { label: string; icon: string }) => {
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-500/30 rounded-xl">
        <img src={icon} alt={label} className="w-10 h-10" />
      </div>
      <p className="text-center font-semibold text-sm">{label}</p>
    </div>
  );
};
export default CategoryCard;
