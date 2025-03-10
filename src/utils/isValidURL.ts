function isValidURL(url: string): boolean {
  const pattern = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
  return pattern.test(url);
}
