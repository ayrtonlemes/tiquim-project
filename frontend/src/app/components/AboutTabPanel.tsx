"use client";
import { Box, CssBaseline, Grid, Link, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Campaign } from "../types/campaign";
import { useCampaignPercentage } from "../hooks/useCampaignPercentage";
import { capitalize } from "../utils/capitalize";
import { useUser } from "../hooks/useUser";
import { getUserName } from "../utils/name";

interface TabPanelProps {
  campaign: Campaign;
  authorId: string;
  index: number;
  value: number;
}

export function AboutTabPanel(props: TabPanelProps) {
  const { campaign, authorId, value, index, ...other } = props;

  const { percentage, isPending, isError } = useCampaignPercentage(campaign.id);

  const { user } = useUser(authorId);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  let completedPercentage = 0;
  if (percentage) {
    const percentageValue = typeof percentage === "number" ? percentage : Number(percentage);
    completedPercentage = Math.min(percentageValue * 100, 100);
  }

  const getTranslatePercentage = () => {
    if (completedPercentage === 100) {
      return "translate(-130%, -50%)";
    } else if (completedPercentage <= 9) {
      return "translate(-180%, -50%)";
    } else {
      return "translate(-150%, -50%)";
    }
  };

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Grid container component="main" sx={{ minHeight: "487px", height: "auto" }}>
          <CssBaseline />
          <Grid item xs={12} sm={12} md={6} component={"div"}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 3 }}>
                {campaign.title}
              </Typography>
              <Typography sx={{ mt: 3 }}>
                Campanha originada em {capitalize(campaign.city)}/{campaign.state} por{" "}
                <Link
                  href={`/profile/${authorId}`}
                  sx={{ textDecoration: "underline", color: "#32A852", cursor: "pointer" }}
                >
                  {getUserName(user?.name ?? "")}
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mt: 3 }}>
                {campaign.description}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={"div"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <PieChart
              series={[
                {
                  data:
                    completedPercentage === 100
                      ? [{ label: "Alcançado", value: 100, color: "green" }]
                      : [
                          {
                            label: "Alcançado",
                            value: completedPercentage,
                            color: "green",
                          },
                          {
                            label: "Restante",
                            value: 100 - completedPercentage,
                            color: "#D1FFBD",
                          },
                        ],
                  innerRadius: 100,
                  outerRadius: 80,
                },
              ]}
              width={300}
              height={200}
              slotProps={{ legend: { hidden: true } }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: getTranslatePercentage(),
                pointerEvents: "none",
              }}
            >
              {Math.floor(completedPercentage)}%
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
