export const getUserName = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");

  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const name = lastName ? `${firstName} ${lastName}` : firstName;

  return name;
};
