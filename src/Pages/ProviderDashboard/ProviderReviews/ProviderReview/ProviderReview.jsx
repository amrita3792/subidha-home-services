const ProviderReview = ({ review }) => {
    const {
      servicePhotoURL,
      service,
      userName,
      userPhoto,
      rating,
      date,
      comment,
      selectedFileURL,
    } = review;
    const commentTime = new Date(date);
    const currentTime = new Date();
  
    const diffInMilliseconds = currentTime - commentTime;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    let timeStr;
  
    const ratings = [];
  
    // Logic to determine the appropriate format based on time difference
    if (diffInMinutes < 1) {
      timeStr = "just now";
    } else if (diffInMinutes < 60) {
      timeStr = diffInMinutes + " minutes ago";
    } else if (diffInMinutes < 24 * 60) {
      timeStr = Math.floor(diffInMinutes / 60) + " hours ago";
    } else if (diffInMinutes < 7 * 24 * 60) {
      timeStr = Math.floor(diffInMinutes / (24 * 60)) + " days ago";
    } else if (diffInMinutes < 30 * 24 * 60) {
      timeStr = Math.floor(diffInMinutes / (7 * 24 * 60)) + " weeks ago";
    } else if (diffInMinutes < 365 * 24 * 60) {
      timeStr = Math.floor(diffInMinutes / (30 * 24 * 60)) + " months ago";
    } else {
      timeStr = Math.floor(diffInMinutes / (365 * 24 * 60)) + " years ago";
    }
  
    for (let i = 1; i <= rating; i++) {
      ratings.push(
        <svg key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      );
    }
    return (
      <div className="mb-16">
        <div className="flex items-start gap-7 border-b">
          <img className="w-28 " src={servicePhotoURL} alt="" />
          <div>
            <h2 className="text-lg font-semibold">{service}</h2>
            <div className="flex items-start gap-3 mt-3">
              <img className="w-16 h-16 rounded-full" src={userPhoto} alt="" />
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="flex gap-4 items-center">
                  <span className="flex">{ratings}</span>{" "}
                  <span className="font-semibold">{timeStr}</span>
                </p>
                <p className="my-5">{comment}</p>
                <img className="w-52" src={selectedFileURL} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProviderReview;
  