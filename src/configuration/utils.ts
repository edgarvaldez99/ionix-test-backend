import { existsSync } from 'fs';
import { join, resolve } from 'path';

export function getEnvPath(fileName: string): string {
  const dest = join(__dirname, '..', '..');
  const filePath = resolve(`${dest}/${fileName}`);
  if (!existsSync(filePath)) {
    throw new Error('.env file not found');
  }
  return filePath;
}
