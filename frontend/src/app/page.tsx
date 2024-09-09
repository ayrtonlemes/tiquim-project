"use client";
import React, { useMemo } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useCampaigns } from "./hooks/useCampaigns";
import { RecentCampaignsHeader } from "./components/RecentCampaignsHeader";
import { PopularCampaignsHeader } from "./components/PopularCampaignsHeader";
import { CampaignCarousel } from "./components/CampaignCarousel";
import { Campaign } from "./types/campaign";
import { useCampaignsSupporters } from "./hooks/useCampaignsSupporters";
import { RegionalCampaignsHeader } from "./components/RegionalCampaignsHeader";
import useAuthContext from "./hooks/useAuthContext";
import { useUser } from "./hooks/useUser";

export default function Campaigns() {
  const { id } = useAuthContext();
  const { user } = useUser(id);
  const { campaigns, isPending: campaignsPending, isError: campaignsError } = useCampaigns("");
  const {
    supporters,
    isPending: supportersPending,
    isError: supportersError,
  } = useCampaignsSupporters();

  const regionalCampaigns = useMemo(() => {
    if (!user || !campaigns) return [];

    const cityCampaigns = campaigns.filter((campaign) => campaign.city === user.city);

    const stateCampaigns = campaigns.filter(
      (campaign) => campaign.state === user.state && campaign.city !== user.city,
    );

    return [...cityCampaigns, ...stateCampaigns];
  }, [user, campaigns]);

  const isSmallScreen = useMediaQuery("(max-width:790px)");
  const isMediumScreen = useMediaQuery("(max-width:1155px)");

  let cardsPerSlide = 1;
  if (isSmallScreen) {
    cardsPerSlide = 1;
  } else if (isMediumScreen) {
    cardsPerSlide = 2;
  } else {
    cardsPerSlide = 3;
  }

  const showRecentCampaigns = () => {
    if (campaignsPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (campaignsError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      );
    } else if (campaigns) {
      const groupedNewCampaigns: Array<Campaign[]> = [];
      const newCampaigns = campaigns.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      for (let i = 0; i < Math.min(newCampaigns.length, 12); i += cardsPerSlide) {
        groupedNewCampaigns.push(newCampaigns.slice(i, i + cardsPerSlide));
      }
      return (
        <CampaignCarousel groupedCampaigns={groupedNewCampaigns} cardsPerSlide={cardsPerSlide} />
      );
    }
  };

  const showPopularCampaigns = () => {
    if (supportersPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (supportersError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (campaigns?.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas disponíveis no momento.
        </Typography>
      );
    } else if (supporters && campaigns) {
      const supportersMap = new Map(supporters.map((item) => [item.campaignId, item.count]));
      const groupedPopularCampaigns: Array<Campaign[]> = [];
      const popularCampaigns = campaigns.sort((a, b) => {
        const countA = supportersMap.get(a.id) || 0;
        const countB = supportersMap.get(b.id) || 0;
        let comparison = countB - countA;
        if (comparison === 0) {
          comparison = a.title.localeCompare(b.title);
        }
        return comparison;
      });
      for (let i = 0; i < Math.min(popularCampaigns.length, 12); i += cardsPerSlide) {
        groupedPopularCampaigns.push(popularCampaigns.slice(i, i + cardsPerSlide));
      }
      return (
        <CampaignCarousel
          groupedCampaigns={groupedPopularCampaigns}
          cardsPerSlide={cardsPerSlide}
        />
      );
    }
  };

  const showRegionalCampaigns = () => {
    if (!id) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          É necessário está logado para carregar campanhas regionais.
        </Typography>
      );
    }
    if (campaignsPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (campaignsError) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Ocorreu um erro ao carregar as campanhas.
        </Typography>
      );
    } else if (!regionalCampaigns || regionalCampaigns.length === 0) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Não há campanhas na sua região no momento.
        </Typography>
      );
    } else {
      const groupedRegionalCampaigns: Array<Campaign[]> = [];
      for (let i = 0; i < Math.min(regionalCampaigns.length, 12); i += cardsPerSlide) {
        groupedRegionalCampaigns.push(regionalCampaigns.slice(i, i + cardsPerSlide));
      }
      return (
        <CampaignCarousel
          groupedCampaigns={groupedRegionalCampaigns}
          cardsPerSlide={cardsPerSlide}
        />
      );
    }
  };

  return (
    <Container>
      <PopularCampaignsHeader />
      {showPopularCampaigns()}
      <Box sx={{ mt: 5 }} />
      <RegionalCampaignsHeader />
      {showRegionalCampaigns()}
      <Box sx={{ mt: 5 }} />
      <RecentCampaignsHeader />
      {showRecentCampaigns()}
      <Box sx={{ mb: 5 }} />
    </Container>
  );
}
