const Videos = ({ youtubeVideos }: { youtubeVideos: string[] }) => {
  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
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