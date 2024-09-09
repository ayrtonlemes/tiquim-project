import { Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { capitalize } from "../utils/capitalize";
import { getUserName } from "../utils/name";

interface CardHearderProps {
  title: string;
  author: string;
  authorId: string;
  createdAt: string;
  completedPercentage: number;
  state: string;
  city: string;
}

export function CardHeader({
  title,
  author,
  authorId,
  createdAt,
  completedPercentage,
  state,
  city,
}: CardHearderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box sx={{ width: "calc(100% - 60px)" }}>
        <Tooltip title={title} placement="top" arrow>
          <Typography
            variant="body1"
            component={"h1"}
            sx={{
              fontWeight: "bold",
              fontSize: "17px",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </Typography>
        </Tooltip>

        <Typography
          variant="caption"
          color="text.secondary"
          component="h2"
          sx={{ mb: 0, fontSize: 12 }}
        >
          <Link
            href={`/profile/${authorId}`}
            sx={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            {getUserName(author)}
          </Link>{" "}
          • Criado em {createdAt.toString()}
        </Typography>
        <Typography
          variant="caption"
          component="h2"
          sx={{ mb: 1.5, textDecoration: "underline", fontStyle: "italic", fontSize: 11 }}
        >
          {capitalize(city)}/{state}
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 1.5,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          minWidth: 60,
        }}
      >
        <PieChart
          series={[
            {
              data:
                completedPercentage === 100
                  ? [{ value: 100, color: "green" }]
                  : [
                      { value: completedPercentage, color: "green" },
                      { value: 100 - completedPercentage, color: "#D1FFBD" },
                    ],
              innerRadius: 18,
              outerRadius: 25,
              cx: 20,
            },
          ]}
          width={50}
          height={50}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "52%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {Math.floor(completedPercentage)}%
        </Typography>
      </Box>
    </Stack>
  );
}
