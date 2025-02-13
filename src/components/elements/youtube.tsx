"use client";

import { cn } from "@/lib/utils";
import getVideoId from "get-video-id";
import YouTubePlayer, { LiteYouTubeProps } from "react-lite-youtube-embed";
import { NoVideoPlaceHolder } from "../misc/placeholder";
import { Fragment } from "react";
import { PlayIcon } from "../icons/play";

export function YouTube(
  props: Omit<LiteYouTubeProps, "aspectWidth" | "aspectHeight"> & {
    aspectRatio?: number;
  },
) {
  const { service, id } = getVideoId(props.id);

  const isValid = Boolean(service === "youtube" && id);

  const aspectRatio = props.aspectRatio ?? false;

  return (
    <div
      className="relative"
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}/1` : undefined,
      }}
    >
      {isValid ? (
        <Fragment>
          <YouTubePlayer
            {...props}
            id={id!}
            wrapperClass={cn(
              "relative bg-cover bg-center bg-no-repeat rounded group peer",
              aspectRatio ? "w-full h-full" : "aspect-video",
            )}
            iframeClass="w-full h-full absolute inset-0 object-contain object-center rounded-lg"
            playerClass="absolute inset-0"
            playlist={false}
            params="rel=0"
            poster="maxresdefault"
            muted={process.env.NODE_ENV === "development"}
            webp
          />
          <div className="pointer-events-none absolute inset-0 grid place-items-center peer-[.lyt-activated]:hidden">
            <PlayIcon />
          </div>
        </Fragment>
      ) : (
        <NoVideoPlaceHolder />
      )}
    </div>
  );
}
