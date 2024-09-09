import { getAvatarUser } from "@/app/services/user";
import { getUserName } from "@/app/utils/name";
import { Avatar, Box, Card, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SupporterCardProps {
  name: string;
  avatarUrl: string;
  userId: string;
}

export function SupporterCard({ name, avatarUrl, userId }: SupporterCardProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.png");
  const router = useRouter();
  useEffect(() => {
    const fetchImage = async () => {
      if (avatarUrl && avatarUrl.length > 0) {
        const image = await getAvatarUser(avatarUrl);
        console.log(image);
        setAvatar(image);
      }
    };
    fetchImage();
  }, [avatarUrl]);

  const handleAvatarClick = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Link href={`../profile/${userId}`} legacyBehavior>
      <a style={{ textDecoration: "none" }}>
        <Card sx={{ width: { xs: "100%", sm: "200px" }, height: "72px" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
                {avatar ? (
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                      cursor: "pointer",
                    }}
                    src={avatar}
                    onClick={handleAvatarClick}
                  />
                ) : (
                  <AccountCircleIcon sx={{ height: "auto", width: "auto" }} />
                )}
              </Avatar>
            }
            title={getUserName(name)}
            titleTypographyProps={{ fontWeight: "bold" }}
          />
        </Card>
      </a>
    </Link>
  );
}
