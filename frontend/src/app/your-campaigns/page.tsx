"use client";
import React, { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import {
  Box,
  Container,
  Fab,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { YourCampaignsHeader } from "../components/YourCampaignsHeader";
import { useYourCampaigns } from "../hooks/useYourCampaigns";
import AddIcon from "@mui/icons-material/Add";
import { YourCampaignCard } from "../components/YourCampaignCard";
import useAuthContext from "../hooks/useAuthContext";
import CreateCampaignModal from "../components/create-campaign";
import EditCampaignModal from "../components/edit-campaign";
import { Campaign } from "../types/campaign";
import { useQueryClient } from "@tanstack/react-query";
import { useCities, useStates } from "../hooks/useAddress";
import { State } from "../types/address";
import { useCampaignsSupporters } from "../hooks/useCampaignsSupporters";

export default function YourCampaigns() {
  const { id } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { campaigns, isPending, isError } = useYourCampaigns(searchQuery);
  const { supporters } = useCampaignsSupporters();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [campaign, setCampaign] = useState({} as Campaign);
  const [filteredCampaigns, setFilteredCampaign] = React.useState(campaigns);
  const [sortBy, setSortBy] = React.useState<"title" | "create" | "end" | "popular">("title");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(null);
  const [anchorElFilter, setAnchorElFilter] = React.useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");


  const openSort = Boolean(anchorElSort);
  const openFilter = Boolean(anchorElFilter);

  const { states } = useStates();
  function sortStatesByName(states: State[]): State[] {
    return states.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const sortedStates = sortStatesByName(states || []);

  const { cities } = useCities(selectedState);

  const categories = [
    "Assistência Social",
    "Educação",
    "Esportes",
    "Meio Ambiente",
    "Proteção Animal",
    "Cultura",
    "Sustentabilidade",
    "Tecnologia e Inclusão",
    "Saúde",
  ];

  useEffect(() => {
    filterAndSortData(sortBy, sortDirection);
  }, [
    searchQuery,
    sortBy,
    sortDirection,
    selectedCategory,
    selectedState,
    selectedCity,
    campaigns,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortDirection] = value.split(":");
    setSortBy(newSortBy as "title" | "create" | "end" | "popular");
    setSortDirection(newSortDirection as "asc" | "desc");
    filterAndSortData(
      newSortBy as "title" | "create" | "end" | "popular",
      newSortDirection as "asc" | "desc",
    );
    setAnchorElSort(null);
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity("");
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const filterAndSortData = (
    sortBy: "title" | "create" | "end" | "popular",
    direction: "asc" | "desc",
  ) => {
    if (campaigns) {
      const filtered = campaigns
        .filter((campaign) => {
          return (
            (selectedCategory ? campaign.category === selectedCategory : true) &&
            (selectedState ? campaign.state === selectedState : true) &&
            (selectedCity ? campaign.city === selectedCity : true)
          );
        })
        .sort((a, b) => {
          let comparison = 0;
          if (sortBy === "title") {
            comparison = a.title.localeCompare(b.title);
          } else if (sortBy === "create") {
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          } else if (sortBy === "end") {
            comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          } else if (sortBy === "popular") {
            const supportersMap = new Map(supporters?.map((item) => [item.campaignId, item.count]));
            const countA = supportersMap?.get(a.id) || 0;
            const countB = supportersMap?.get(b.id) || 0;
            return countB - countA;
          }
          return direction === "asc" ? comparison : -comparison;
        });
      setFilteredCampaign(filtered);
    }
  };

  const showCampaigns = () => {
    if (isPending) {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Carregando...
        </Typography>
      );
    } else if (id === "") {
      return (
        <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }}>
          Realize o login para visualizar suas campanhas.
        </Typography>
      );
    } else if (isError) {
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
    } else {
      return filteredCampaigns?.map((campaign) => (
        <YourCampaignCard key={campaign.id} campaign={campaign} handleOpen={handleOpenEdit} />
      ));
    }
  };
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => {
    setOpenCreate(false);
    queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
  };

  const handleOpenEdit = (campaign: Campaign) => {
    setCampaign(campaign);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    queryClient.invalidateQueries({ queryKey: ["yourCampaigns"] });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
        }}
      >
        <YourCampaignsHeader />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: 1,
              borderColor: "rgba(150, 150, 150, 1)",
              borderRadius: 3,
              marginRight: 2,
            }}
          >
            <SearchIcon sx={{ padding: 0.5, color: "rgba(150, 150, 150, 1)" }} />
            <InputBase
              placeholder="Pesquisar…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                color: "inherit",
                paddingLeft: 1,
                "& .MuiInputBase-input": {
                  padding: 1,
                },
              }}
            />
          </Box>

          <IconButton
            onClick={(event) => setAnchorElSort(event.currentTarget)}
            sx={{ height: "100%" }}
          >
            <SortIcon />
          </IconButton>
          <Menu anchorEl={anchorElSort} open={openSort} onClose={() => setAnchorElSort(null)}>
            <MenuItem onClick={() => handleSortChange("title:asc")}>Nome (A-Z)</MenuItem>
            <MenuItem onClick={() => handleSortChange("title:desc")}>Nome (Z-A)</MenuItem>
            <MenuItem onClick={() => handleSortChange("popular:asc")}>Mais populares</MenuItem>
            <MenuItem onClick={() => handleSortChange("create:asc")}>Mais antigos</MenuItem>
            <MenuItem onClick={() => handleSortChange("create:desc")}>Mais recentes</MenuItem>
            <MenuItem onClick={() => handleSortChange("end:asc")}>Prazos mais próximos</MenuItem>
            <MenuItem onClick={() => handleSortChange("end:desc")}>Prazos mais distantes</MenuItem>
          </Menu>
          <IconButton
            onClick={(event) => setAnchorElFilter(event.currentTarget)}
            sx={{ height: "100%" }}
          >
            <FilterAltIcon />
          </IconButton>
          <Popover
            anchorEl={anchorElFilter}
            open={Boolean(anchorElFilter)}
            onClose={() => setAnchorElFilter(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12} sm={9}>
                <InputLabel id="categoryLabel" sx={{ color: "black" }}>
                  Categoria
                </InputLabel>
                <Select
                  labelId="categoryLabel"
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  fullWidth
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="">Nenhum</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={9}>
                <InputLabel id="stateLabel" sx={{ color: "black" }}>
                  Estado
                </InputLabel>
                <Select
                  labelId="stateLabel"
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="">Nenhum</MenuItem>
                  {sortedStates.map((state) => (
                    <MenuItem key={state.sigla} value={state.sigla}>
                      {state.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={9}>
                <InputLabel id="cityLabel" sx={{ color: "black" }}>
                  Cidade
                </InputLabel>
                <Select
                  labelId="cityLabel"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                  }}
                  disabled={!selectedState}
                >
                  <MenuItem value="">Nenhum</MenuItem>
                  {cities?.map((city) => (
                    <MenuItem key={city.nome} value={city.nome}>
                      {city.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Popover>
        </Box>
      </Box>

      <Box
        height="auto"
        width="100%"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        my={4}
        gap={4}
        sx={{ p: { xs: 0, sm: 2 } }}
      >
        {showCampaigns()}
      </Box>
      <Fab
        color="success"
        aria-label="add"
        onClick={handleOpenCreate}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 80,
        }}
      >
        <AddIcon />
      </Fab>
      <CreateCampaignModal open={openCreate} handleClose={handleCloseCreate} />
      <EditCampaignModal campaign={campaign} open={openEdit} handleClose={handleCloseEdit} />
    </Container>
  );
}
