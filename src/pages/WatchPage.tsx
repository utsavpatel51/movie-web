import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";

import { getDetailsFromId } from "@/backend/metadata/getmeta";
import { decodeTMDBId } from "@/backend/metadata/tmdb";
import { WideContainer } from "@/components/layout/WideContainer";
import { MediaDetail } from "@/components/media/MediaDetail";
import { SubPageLayout } from "@/pages/layouts/SubPageLayout";
import { RecommendationPart } from "@/pages/parts/home/RecommendationPart";
import { SearchLoadingPart } from "@/pages/parts/search/SearchLoadingPart";
import PlayerView from "@/pages/PlayerView";

export function WatchPage() {
  const params = useParams<{ media: string }>();

  const [detailState, detailExec] = useAsyncFn(async () => {
    if (!params.media) return;

    const tmdbId = decodeTMDBId(params.media);
    if (!tmdbId) return;

    return getDetailsFromId(tmdbId.type, tmdbId.id);
  }, [params.media]);

  useEffect(() => {
    async function run() {
      await detailExec();
    }
    run();
  }, [detailExec, params.media]);

  if (detailState.loading) return <SearchLoadingPart />;
  return (
    <SubPageLayout>
      <WideContainer ultraWide classNames="overflow-visible">
        <PlayerView />
        <MediaDetail media={detailState.value} />

        <RecommendationPart />
      </WideContainer>
    </SubPageLayout>
  );
}
