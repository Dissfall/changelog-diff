/// <reference types="node" />
import { PathLike } from 'fs';
declare function getChangelogDiff(oldFilePath: PathLike, newFilePath: PathLike): Promise<any>;
export default getChangelogDiff;
