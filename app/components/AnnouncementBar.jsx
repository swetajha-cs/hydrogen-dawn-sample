export function AnnouncementBar({content}) {
  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="page-width">
        <p className="announcement-bar__message h5">
          <span>{content}</span>
        </p>
      </div>
    </div>
  );
}
