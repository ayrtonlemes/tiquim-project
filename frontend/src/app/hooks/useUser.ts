import { useQuery } from "@tanstack/react-query";
import { getEmail, getUser } from "../services/user";

export function useUser(id: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { user: data, isPending, isError };
}

export function useCheckAvailableEmail(email: string) {
  const { data } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getEmail(email),
    enabled: !!email,
  });

  return { check: data };
}
