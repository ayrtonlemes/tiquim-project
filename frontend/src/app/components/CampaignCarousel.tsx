import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { CampaignCard } from "./CampaignCard";
import { Campaign } from "../types/campaign";

interface CampaignCarouselProps {
  groupedCampaigns: Campaign[][];
  cardsPerSlide: number;
}

export function CampaignCarousel({ groupedCampaigns, cardsPerSlide }: CampaignCarouselProps) {
  return (
    <Carousel
      autoPlay={false}
      navButtonsAlwaysVisible
      cycleNavigation={false}
      indicators={false}
      navButtonsWrapperProps={{
        style: {
          transform: "translateX(-10px)",
        },
      }}
    >
      {groupedCampaigns.map((group, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            gap: 2,
            height: "30em",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          {group.map((campaign) => (
            <Box
              key={campaign.id}
              sx={{
                flex: `0 0 ${95 / cardsPerSlide}%`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CampaignCard campaign={campaign} />
            </Box>
          ))}
        </Box>
      ))}
    </Carousel>
  );
}
