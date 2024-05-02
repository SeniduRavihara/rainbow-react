
const StreetViewTab = ({ location }: { location: string }) => {

  return (
    <div>
      
      <iframe
        src={location}
        className="w-full"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
export default StreetViewTab;
