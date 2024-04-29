const Section2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full mt-10">
      <div className="flex flex-col gap-2 md:w-1/2">
        <img src="/it-room1.jpg" className="w-full h-[200px]" alt="" />
        <div className="flex gap-[10px]">
          <img src="/it-room2.jpg" className="w-[49%]" alt="" />
          <img src="/it-room3.jpeg" className="w-[49%]" alt="" />
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 ml-5">
        <h1 className="text-3xl font-bold">Our Story</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
          iusto sapiente dolore alias, nemo placeat sit a dolorum, rerum totam
          voluptatum sint ad. Facere saepe aperiam quas quaerat nam similique.
          Debitis porro ducimus adipisci, quidem omnis autem nam! Dicta officiis
          commodi cupiditate magni veniam dolore quo qui eius velit eaque saepe
          enim incidunt, quaerat nisi rem iure accusantium assumenda a!
        </p>
      </div>
    </div>
  );
};
export default Section2;
