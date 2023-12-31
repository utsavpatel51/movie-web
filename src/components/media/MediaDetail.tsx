import { TMDBMediaDetail } from "@/backend/metadata/types/tmdb";
import { Icon, Icons } from "@/components/Icon";
import { convertMinuteToReadableTime } from "@/utils/formatSeconds";
import { formatDate } from "@/utils/timestamp";

interface MediaDetailProps {
  media: TMDBMediaDetail | null | undefined;
}

export function MediaDetail(props: MediaDetailProps) {
  const media = props.media;

  const metaData = {
    Type: media?.object_type,
    Status: media?.status,
    Genre: media?.genres.join(", "),
    Release: media?.release_date ? formatDate(media?.release_date) : null,
    Seasons: media?.number_of_seasons || null,
    "Total Episodes": media?.number_of_episodes || null,
    "First Air Date": media?.first_air_date
      ? formatDate(media?.first_air_date)
      : null,
    "Last Air Date": media?.last_air_date
      ? formatDate(media?.last_air_date)
      : null,
    "Next Episode To Air On": media?.next_episode_to_air
      ? formatDate(media?.next_episode_to_air)
      : null,
  };

  if (!media) return null;

  return (
    <div className="mt-10 p-2 bg-themePreview-secondary/15 flex flex-col">
      <div className="mb-3">
        <h1 className="text-xl text-white">
          {media?.title} ({media?.original_release_year})
        </h1>
        <p>{media?.tagline}</p>
      </div>
      <div className="flex flex-col items-center md:flex-row gap-3">
        <div>
          <img
            src={media?.poster}
            alt="Movie Poster"
            className="h-[250px] max-w-[200px]"
          />
        </div>
        <div>
          <p className="text-white/80 mb-2">{media?.overview}</p>

          <div className="my-1 border inline-flex flex-row items-center gap-2 rounded-full px-3 py-1 border-gray-500/50 text-xs">
            <p className="flex items-center gap-1 text-white/80">
              <Icon
                icon={Icons.RISING_STAR}
                className="text-dropdown-highlight"
              />
              {media?.vote_average ? media.vote_average.toFixed(1) : null}
            </p>
            {media?.runtime ? (
              <>
                <p className="text-white/50"> | </p>
                <p className="text-white/80">
                  {convertMinuteToReadableTime(media?.runtime)}
                </p>
              </>
            ) : null}
          </div>
          {Object.entries(metaData).map(([key, value]) =>
            value ? (
              <div
                className="flex flex-row items-center text-themePreview-primary text-sm leading-5"
                key={key}
              >
                <p className="w-48">{key}</p>
                <span className="capitalize text-white/80">{value}</span>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
