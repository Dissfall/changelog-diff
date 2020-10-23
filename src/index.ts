import { diffLines } from 'diff';
import { readFile, PathLike } from 'fs';
import { promisify } from 'util';
import yargs from 'yargs';

const defaultConfig = {
  sections: ['Features', 'Bug Fixes']
};

const args = yargs(process.argv.slice(2)).command(
  'diff <oldFile> <newFile>',
  'Generate difference changelog for final version',
  (yargs) => {
    return yargs
      .positional('oldFile', {
        describe: 'Path to "old" file version',
        demandOption: true,
        type: 'string'
      })
      .positional('newFile', {
        describe: 'Path to "new" file version',
        demandOption: true,
        type: 'string'
      });
  },
  async (argv) => {
    await getChangelogDiff(argv.oldFile, argv.newFile);
  }
).argv;

async function getChangelogDiff(
  oldFilePath: PathLike,
  newFilePath: PathLike
): Promise<any> {
  const config = defaultConfig;
  const filesData: readonly string[] = await loadFiles([
    oldFilePath,
    newFilePath
  ]);

  const diff: string | undefined = getDataDiff(filesData);
  if (!diff) {
    return;
  }

  const version = getLatestVersion(diff);
  if (!version) {
    return;
  }

  const changes = pickSections(diff, config.sections);

  const result = generateChangelog(version, changes);
  console.log(result);
  return result;
}

async function loadFiles(
  paths: readonly PathLike[]
): Promise<readonly string[]> {
  return Promise.all(paths.map(async (path) => loadFile(path)));
}

async function loadFile(path: PathLike): Promise<string> {
  const fileData: string = await promisify(readFile)(path, 'utf-8');
  return fileData;
}

function getDataDiff(filesData: readonly string[]): string | undefined {
  return diffLines(filesData[0], filesData[1], {
    ignoreWhitespace: true
  }).find((change) => change.added)?.value;
}

function getLatestVersion(change: string): string | undefined {
  return change.match(/\d+\.\d+\.\d+/gm)?.slice(0, 1)[0];
}

function pickSections(
  data: string,
  sections: readonly string[]
): Record<string, string> {
  return sections.reduce(
    (result: Record<string, string>, targetSectionName: string) => {
      const toDrop = sections.filter(
        (sectionName) => sectionName !== targetSectionName
      );
      const sectionData = toDrop.reduce((data: string, sectionName: string) => {
        const pattern = new RegExp(
          `(?!.*${targetSectionName}).*${sectionName}\\n([\\*\\-].*\\n)+`,
          'gm'
        );
        return data
          .replace(pattern, '')
          .replace(new RegExp(`^.*${targetSectionName}.*\\n`, 'gm'), '');
      }, prepareFileData(data));
      return { ...result, [targetSectionName]: sectionData };
    },
    {}
  );
}

function prepareFileData(data: string): string {
  return dropEmptyLines(dropVersionLabels(data));
}

function dropEmptyLines(data: string): string {
  return data.replace(/^\n/gm, '');
}

function dropVersionLabels(data: string): string {
  return data.replace(/^.*\d+\.\d+\.\d+.*\n/gm, '');
}

function generateChangelog(
  version: string,
  changes: Record<string, string>
): string {
  const changelist = Object.keys(changes).reduce(
    (changelist: string, sectionName: string) => {
      return `${changelist}\n${sectionName}\n${changes[sectionName]}`;
    },
    ''
  );
  return `Release ${version}\n${changelist} ${getDate()}`;
}

function getDate() {
  const date = new Date();
  return `${date.toDateString()} ${date.toTimeString().split(' ')[0]}`;
}

export default getChangelogDiff;
