export function filterFiles(files: File[], maxFileSize: number): File[] {
  return files.filter((file) => file.size <= maxFileSize);
}
