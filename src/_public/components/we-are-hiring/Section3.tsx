import { Button } from "@/components/ui/button"

const Section3 = () => {
    const handleClickContactUs = () => {
      window.open(
        `https://wa.me/715335640`
      );
    };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-28">
      <div>
        <h2 className="text-center font-bold text-2xl md:text-3xl">
          Current Job vacancies at srilanka Business
        </h2>
        <h3 className="text-center text-xl md:text-2xl">
          See where you fit in Search jobs by location or team
        </h3>
      </div>

      <Button className="mt-4 px-20 rounded-xl" onClick={handleClickContactUs}>
        Contact Us
      </Button>
    </div>
  );
}
export default Section3