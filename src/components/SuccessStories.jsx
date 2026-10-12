import { useEffect, useState } from "react";
import { Reveal, SectionHead } from "./ui";
import { useFeed } from "./useFeed";
import { useT } from "../i18n/lang";
import { common } from "../content/common";

function Lightbox({ visa, onClose, t }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={visa.caption || t.visaAlt} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={visa.photo} alt={visa.caption || t.visaAlt} />
        {visa.caption && <figcaption>{visa.caption}</figcaption>}
      </figure>
      <button className="lightbox-close" aria-label={t.close} onClick={onClose}>×</button>
    </div>
  );
}

// Approved visas posted to the company's Telegram channel.
export function VisaGallery({ limit = 8 }) {
  const { loading, items, url } = useFeed("visas", "visas");
  const [open, setOpen] = useState(null);
  const t = useT(common).stories;

  if (!loading && !items.length) return null;

  return (
    <div className="stories-block">
      <Reveal className="row-head">
        <div>
          <div className="eyebrow">{t.visaEyebrow}</div>
          <h3 className="h3">{t.visaTitle}</h3>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">{t.allTelegram}</a>
        )}
      </Reveal>
      <div className="visa-grid">
        {loading
          ? Array.from({ length: 4 }, (_, i) => <div className="visa-tile skeleton" key={i} />)
          : items.slice(0, limit).map((v, i) => (
              <Reveal as="button" className="visa-tile" delay={i * 50} key={v.id} onClick={() => setOpen(v)} aria-label={v.caption || t.visaAlt}>
                <img src={v.photo} alt={v.caption || t.visaAlt} loading="lazy" />
                {v.caption && <span className="visa-caption">{v.caption}</span>}
              </Reveal>
            ))}
      </div>
      {open && <Lightbox visa={open} t={t} onClose={() => setOpen(null)} />}
    </div>
  );
}

// Click-to-play YouTube: loads only a thumbnail until the visitor presses play.
function VideoCard({ v, delay, playLabel }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Reveal className="video-card" delay={delay}>
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="video-poster" onClick={() => setPlaying(true)} aria-label={`${playLabel}: ${v.title}`}>
            <img src={v.thumbnail} alt="" loading="lazy" />
            <span className="video-play" aria-hidden>▶</span>
          </button>
        )}
      </div>
      <div className="video-title">{v.title}</div>
    </Reveal>
  );
}

export function VideoTestimonials({ limit = 3 }) {
  const { loading, items, url } = useFeed("videos", "videos");
  const t = useT(common).stories;
  if (!loading && !items.length) return null;

  return (
    <div className="stories-block">
      <Reveal className="row-head">
        <div>
          <div className="eyebrow">{t.videoEyebrow}</div>
          <h3 className="h3">{t.videoTitle}</h3>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">{t.moreYoutube}</a>
        )}
      </Reveal>
      <div className={loading || items.length >= 3 ? "grid-3" : `video-grid-${items.length}`}>
        {loading
          ? Array.from({ length: 3 }, (_, i) => <div className="video-card skeleton" key={i} />)
          : items.slice(0, limit).map((v, i) => <VideoCard v={v} delay={i * 80} key={v.id} playLabel={t.play} />)}
      </div>
    </div>
  );
}

// Visa photos + client videos. Each part hides itself until its feed is set up.
export default function SuccessStories({ visaLimit, videoLimit, className = "bg-soft" }) {
  const visas = useFeed("visas", "visas");
  const videos = useFeed("videos", "videos");
  const t = useT(common).stories;
  const nothing = !visas.loading && !videos.loading && !visas.items.length && !videos.items.length;
  if (nothing) return null;

  return (
    <section id="success-stories" className={`section ${className}`}>
      <SectionHead eyebrow={t.eyebrow} title={t.title} />
      <VideoTestimonials limit={videoLimit} />
      <VisaGallery limit={visaLimit} />
    </section>
  );
}
