
const Videos = ({ youtubeVideos }: { youtubeVideos: string[] }) => {
 

  return (
    <div className="w-full flex items-center justify-center">
      <ul className="flex flex-wrap gap-3">
        {youtubeVideos.map((video, index) => (
          <li key={index}>
            <iframe
              src={video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Videos