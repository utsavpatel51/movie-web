import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";

import { decodeTMDBId, getRecommendationFromId } from "@/backend/metadata/tmdb";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { MediaList } from "@/components/media/MediaList";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { MediaItem } from "@/utils/mediaTypes";

export function RecommendationPart() {
  const params = useParams<{ media: string }>();

  const { t } = useTranslation();
  const [recommendationData, setRecommendationData] = React.useState<
    MediaItem[]
  >([]);

  const [_, recommendationsExec] = useAsyncFn(async () => {
    if (!params.media) return;
    const tmdbId = decodeTMDBId(params.media);
    if (!tmdbId) return;
    return getRecommendationFromId(tmdbId.type, tmdbId.id);
  }, [params.media]);

  useEffect(() => {
    async function run() {
      const data = await recommendationsExec();
      if (data) setRecommendationData(data);
    }
    run();
  }, [recommendationsExec, params.media]);

  return (
    <div className="mt-5">
      <SectionHeading
        title={t("home.recommendations.sectionTitle") || "Recommendations"}
      />
      <MediaList>
        {recommendationData.map((media) => (
          <div key={media.id} className="flex-1 max-w-[150px] min-w-[150px]">
            <WatchedMediaCard media={media} />
          </div>
        ))}
      </MediaList>
    </div>
  );
}
