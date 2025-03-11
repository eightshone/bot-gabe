function isValidURL(url: string): boolean {
  const pattern =
    /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?$/;
  return pattern.test(url);
}
