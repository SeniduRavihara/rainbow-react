const Section2 = () => {
  return (
    <div className="mt-10">
      <h1 className="text-center text-3xl sm:text-4xl mb-5">
        Key <span className="text-red-500 font-semibold mb">Highlights</span>
      </h1>

      <ul className="flex gap-4 sm:gap-10 items-center justify-center px-2">
        <li>
          <img
            src="/icons/icons8-tourist-group-100.png"
            className="w-[50px]"
            alt=""
          />
        </li>
        <li>
          <img src="/icons/icons8-list-64.png" className="w-[50px]" alt="" />
        </li>
        <li>
          <img src="/icons/icons8-speaker-64.png" className="w-[50px]" alt="" />
        </li>
        <li>
          <img src="/icons/icons8-rating-64.png" className="w-[50px]" alt="" />
        </li>
        <li>
          <img src="/icons/icons8-shop-80.png" className="w-[50px]" alt="" />
        </li>
      </ul>
    </div>
  );
}
export default Section2