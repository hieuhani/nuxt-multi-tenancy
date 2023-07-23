export const extractRootHost = (host: string) => {
  const firstHostDotIndex = host.indexOf(".");
  return host.substring(firstHostDotIndex + 1);
};
