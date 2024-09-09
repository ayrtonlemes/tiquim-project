"use client";
import { AboutTabPanel } from "@/app/components/AboutTabPanel";
import { CommentsTabPanel } from "@/app/components/comments/CommentsTabPanel";
import { PostsTabPanel } from "@/app/components/posts/PostsTabPanel";
import { SupportersTabPanel } from "@/app/components/supporters/SupportersTabPanel";
import { useCampaignDetails } from "@/app/hooks/useCampaignDetails";
import { useCampaignPercentage } from "@/app/hooks/useCampaignPercentage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportIcon from "@mui/icons-material/Report";
import useSnackbar from "@/app/hooks/useSnackbar";
import AlertDialog from "@/app/components/DialogConfirmationDelete";
import { getImageCampaign, getSupporters } from "@/app/services/campaign";
import { createReportCampaign } from "@/app/services/report";
import {
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import useAuthContext from "@/app/hooks/useAuthContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { formatDate } from "@/app/utils/datetime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Campanha() {
  const router = useRouter();

  const params = useParams();

  const [tabValue, setTabValue] = useState(0);
  const idCampaign = params.campaign as string;
  const { id } = useAuthContext();
  const [supporters, setSupporters] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.png");

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [reason, setReason] = React.useState<string>("");
  const [openReasonModal, setOpenReasonModal] = React.useState(false);

  const { campaign, isPending, isError } = useCampaignDetails(idCampaign);
  const { percentage } = useCampaignPercentage(idCampaign);

  const { setSnackbar } = useSnackbar();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    if (!id) {
      setSnackbar("É preciso está logado para denunciar", "error");
      setConfirmOpen(false);
      setAnchorEl(null);
      return;
    }
    setOpenReasonModal(true);
  };

  const handleConfirmReport = async () => {
    try {
      await createReportCampaign({ reason, campaignId: campaign?.id! });
      setSnackbar("Denúncia feita");
    } catch (error: any) {
      if (error.message === "Request failed with status code 400") {
        setSnackbar("Você já denunciou esta campanha anteriormente", "error");
      } else {
        console.log(error.message);
        setSnackbar("Ocorreu um erro. Tente novamente mais tarde", "error");
      }
    } finally {
      handleCancelReport();
    }
  };

  const handleCancelReport = async () => {
    setReason("");
    handleMenuClose();
    setConfirmOpen(false);
    setOpenReasonModal(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (campaign?.imageUrl && campaign.imageUrl.length > 0) {
        const image = await getImageCampaign(campaign.imageUrl);
        setImageUrl(image);
      }
    };
    fetchImage();
  }, [campaign]);

  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const result = await getSupporters(idCampaign);
        setSupporters(result);
      } catch (error) {
        console.error("Erro ao buscar o número de apoiadores:", error);
      }
    };

    fetchSupporters();
  }, [idCampaign]);

  if (isPending) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Carregando...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Ocorreu um erro ao carregar as informações da campanha.
      </Typography>
    );
  }

  if (!campaign) {
    return (
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}>
        Não há detalhes disponíveis para esta campanha no momento.
      </Typography>
    );
  }

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyLink = () => {
    const clipboardInfo = `
A campanha "${campaign.title}" precisa da sua ajuda!

Acesse o link ${window.location.href} para saber mais e doar um Tiquim.

Lembre-se: um Tiquim de ajuda pode mudar a realidade de alguém!`;

    navigator.clipboard.writeText(clipboardInfo);
    setSnackbar("Link da campanha copiado para a área de transferência!");
  };

  const handleDonateToCampaign = (e: React.SyntheticEvent, idCampaign: string) => {
    e.stopPropagation();
    if (id === "") {
      setSnackbar("Para doar você precisa estar logado, por favor faça o login!", "error");
      router.push("/login");
      return null;
    }
    router.push(`/contribution/${idCampaign}`);
  };

  const deadline = formatDate(campaign.deadline).toString();

  const isCampaignOver = (deadline: string): boolean => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    deadlineDate.setHours(23, 59, 59, 999);

    return currentDate > deadlineDate;
  };

  return (
    <Container sx={{ width: "80%", m: "auto" }}>
      <Grid container component="main" sx={{ height: "487px" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          margin={0}
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={6} component={"div"}>
          <Box
            sx={{
              my: 8,
              mx: { xs: 0, md: 4 },
              mt: { xs: 0 },
              ml: { xs: 0, sm: 6, md: 10 },
              mb: { xs: 2 },
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                mb: 3,
              }}
            >
              <Chip label={campaign.category} sx={{ backgroundColor: "#32A852", color: "white" }} />

              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleCopyLink} sx={{ paddingX: 2 }}>
                <ContentCopyIcon sx={{ mr: 1 }} />
                <Typography>Copiar link</Typography>
              </MenuItem>

              <MenuItem onClick={() => setConfirmOpen(true)} sx={{ paddingX: 2 }}>
                <ReportIcon sx={{ mr: 1, color: "red" }} />
                <Typography sx={{ color: "red" }}>Denunciar</Typography>
              </MenuItem>
            </Menu>
            <AlertDialog
              open={confirmOpen}
              onConfirm={handleReport}
              onCancel={handleCancelReport}
              message={"Tem certeza que deseja denunciar essa campanha?"}
              title="Denúncia de Campanha"
            />
            <Dialog open={openReasonModal} onClose={handleCancelReport} scroll="body" maxWidth="md">
              <DialogTitle>Informe a razão da denúncia</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Por favor, explique por que você está denunciando esta campanha.
                </DialogContentText>
                <TextField
                  required
                  autoFocus
                  id="reason"
                  label="Razão"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  sx={{
                    wordBreak: "break-word",
                  }}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelReport} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleConfirmReport} color="primary">
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {campaign.title}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#828282" }}>
                    Arrecadado:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#32A852" }}>
                    R$
                    {typeof percentage === "number" || percentage instanceof Number
                      ? (Number(percentage) * campaign.goal).toFixed(2).replace(".", ",")
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#828282" }}>
                    Prazo:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#828282" }}>
                    {deadline}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#828282" }}>
                    Meta:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#828282" }}>
                    R${Number(campaign.goal).toFixed(2).replace(".", ",")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#828282" }}>
                    Apoiadores:
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#828282" }}>
                    {supporters}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "100%", md: "100%" },
                mt: 5,
                mb: { xs: 4 },
                backgroundColor: "#32a852",
                "&:hover": { backgroundColor: "#008000" },
                textTransform: "none",
              }}
              disabled={isCampaignOver(campaign.deadline.toString())}
              onClick={(e) => handleDonateToCampaign(e, campaign.id)}
              href={`../contribution/${campaign.id}`}
            >
              {isCampaignOver(campaign.deadline.toString()) ? "Campanha finalizada" : "Doar"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", mt: { xs: 5, md: 7, sm: 10 }, mb: { xs: 2 } }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: { xs: 2 } }}>
          <Tabs
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleTabChange}
          >
            <Tab label="Sobre" />
            <Tab label="Atualizações" />
            <Tab label="Comentários" />
            <Tab label="Apoiadores" />
          </Tabs>
        </Box>
        <AboutTabPanel campaign={campaign} authorId={campaign.userId} value={tabValue} index={0} />
        <PostsTabPanel
          idCampaign={idCampaign}
          idOwner={campaign.userId}
          value={tabValue}
          index={1}
        ></PostsTabPanel>
        <CommentsTabPanel
          idCampaign={idCampaign}
          idOwner={campaign.userId}
          value={tabValue}
          index={2}
        />
        <SupportersTabPanel idCampaign={idCampaign} value={tabValue} index={3} />
      </Box>
    </Container>
  );
}
